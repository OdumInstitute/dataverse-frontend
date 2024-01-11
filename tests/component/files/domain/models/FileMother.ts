import { File } from '../../../../../src/files/domain/models/File'
import { faker } from '@faker-js/faker'
import { DatasetVersionMother } from '../../../dataset/domain/models/DatasetMother'

export class FileMother {
  static create(props?: Partial<File>): File {
    const name = props?.name ?? faker.system.fileName()
    return {
      name: faker.system.fileName(),
      datasetVersion: DatasetVersionMother.create(),
      citation: FileCitationMother.create(name),
      restricted: faker.datatype.boolean(),
      permissions: {
        canDownloadFile: faker.datatype.boolean()
      },
      ...props
    }
  }

  static createRealistic(props?: Partial<File>): File {
    return this.create({
      name: 'File Title',
      datasetVersion: DatasetVersionMother.createRealistic(),
      citation: FileCitationMother.create('File Title'),
      restricted: false,
      permissions: {
        canDownloadFile: true
      },
      ...props
    })
  }

  static createRestricted(props?: Partial<File>): File {
    return this.createRealistic({
      restricted: true,
      permissions: {
        canDownloadFile: false
      },
      ...props
    })
  }

  static createRestrictedWithAccessGranted(props?: Partial<File>): File {
    return this.createRestricted({
      permissions: {
        canDownloadFile: true
      },
      ...props
    })
  }
}

export class FileCitationMother {
  static create(fileName: string): string {
    return `Bennet, Elizabeth; Darcy, Fitzwilliam, 2023, "Dataset Title", <a href="https://doi.org/10.5072/FK2/BUDNRV" target="_blank">https://doi.org/10.5072/FK2/BUDNRV</a>, Root, V1; ${fileName} [fileName]`
  }

  static createDraft(fileName: string): string {
    return `Bennet, Elizabeth; Darcy, Fitzwilliam, 2023, "Dataset Title", <a href="https://doi.org/10.5072/FK2/BUDNRV" target="_blank">https://doi.org/10.5072/FK2/BUDNRV</a>, Root, DRAFT; ${fileName} [fileName]`
  }

  static createDeaccessioned(fileName: string): string {
    return `Bennet, Elizabeth; Darcy, Fitzwilliam, 2023, "Dataset Title", <a href="https://doi.org/10.5072/FK2/BUDNRV" target="_blank">https://doi.org/10.5072/FK2/BUDNRV</a>, Root, DEACCESSIONED; ${fileName} [fileName]`
  }
}
