import { FileRepository } from '../../files/domain/repositories/FileRepository'
import { FilesMockData } from './FileMockData'
import { FileDownloadMode } from '../../files/domain/models/FileMetadata'
import { FilesCountInfo } from '../../files/domain/models/FilesCountInfo'
import { FilesCountInfoMother } from '../../../tests/component/files/domain/models/FilesCountInfoMother'
import { DatasetVersion, DatasetVersionNumber } from '../../dataset/domain/models/Dataset'
import { FileCriteria } from '../../files/domain/models/FileCriteria'
import { FileMetadataMother } from '../../../tests/component/files/domain/models/FileMetadataMother'
import { FilePaginationInfo } from '../../files/domain/models/FilePaginationInfo'
import { FileMother } from '../../../tests/component/files/domain/models/FileMother'
import { File } from '../../files/domain/models/File'
import { FilePreview } from '../../files/domain/models/FilePreview'
import { FakerHelper } from '../../../tests/component/shared/FakerHelper'
import { FileHolder } from '../../files/domain/repositories/File'
import { FileUploadTools } from '../../files/domain/models/FileUploadState'

export class FileMockRepository implements FileRepository {
  constructor(public readonly fileMock?: File) {}

  getAllByDatasetPersistentId(
    _datasetPersistentId: string,
    _datasetVersion: DatasetVersion,
    paginationInfo?: FilePaginationInfo
  ): Promise<FilePreview[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(FilesMockData(paginationInfo))
      }, FakerHelper.loadingTimout())
    })
  }

  getFilesCountInfoByDatasetPersistentId(
    _datasetPersistentId: string,
    _datasetVersionNumber: DatasetVersionNumber
  ): Promise<FilesCountInfo> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(FilesCountInfoMother.create({ total: 200 }))
      }, FakerHelper.loadingTimout())
    })
  }

  getFilesTotalDownloadSizeByDatasetPersistentId(
    _datasetPersistentId: string,
    _datasetVersionNumber: DatasetVersionNumber,
    _criteria?: FileCriteria
  ): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(19900)
      }, FakerHelper.loadingTimout())
    })
  }

  getById(_id: number): Promise<File | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.fileMock ?? FileMother.createRealistic())
      }, FakerHelper.loadingTimout())
    })
  }

  getMultipleFileDownloadUrl(_ids: number[], _downloadMode: FileDownloadMode): string {
    return FileMetadataMother.createDownloadUrl()
  }

  getFileDownloadUrl(_id: number, _downloadMode: FileDownloadMode): string {
    return FileMetadataMother.createDownloadUrl()
  }

  uploadFile(
    _datasetId: number | string,
    _file: FileHolder,
    progress: (now: number) => void,
    abortController: AbortController
  ): Promise<void> {
    let t: NodeJS.Timeout
    const timeout = (delay: number) => new Promise((res) => (t = setTimeout(res, delay)))
    abortController.signal.addEventListener('abort', () => clearTimeout(t))
    const res = async () => {
      let now = 0
      while (now < 100) {
        await timeout(500)
        now += 20
        progress(now)
        //console.log(FileUploadTools.key(_file.file) + ': ' + String(now))
      }
    }
    return res()
  }
}
