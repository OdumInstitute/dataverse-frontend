import { File } from '../../../../../../files/domain/models/File'
import styles from './FileInfoCell.module.scss'
import { FileThumbnail } from './file-info-data/file-thumbnail/FileThumbnail'
import { FileTitle } from './file-info-data/FileTitle'
import { FileDirectory } from './file-info-data/FileDirectory'
import { FileType } from './file-info-data/FileType'
import { FileDate } from './file-info-data/FileDate'
import { FileEmbargoDate } from './file-info-data/FileEmbargoDate'
import { FileDownloads } from './file-info-data/FileDownloads'
import { FileChecksum } from './file-info-data/FileChecksum'
import { FileTabularData } from './file-info-data/FileTabularData'
import { FileDescription } from './file-info-data/FileDescription'
import { FileLabels } from './file-info-data/FileLabels'

export function FileInfoCell({ file }: { file: File }) {
  return (
    <div className={styles.container}>
      <div className={styles['thumbnail-container']}>
        <FileThumbnail file={file} />
      </div>
      <div className={styles['body-container']}>
        <FileTitle link={file.getLink()} name={file.name} />
        <div className={styles['body-container__subtext']}>
          <FileDirectory directory={file.directory} />
          <FileType type={file.type} size={file.size} />
          <FileDate date={file.date} />
          <FileEmbargoDate embargo={file.embargo} status={file.version.status} />
          <FileDownloads downloads={file.downloads} status={file.version.status} />
          <FileChecksum checksum={file.checksum} />
          <FileTabularData tabularData={file.tabularData} />
        </div>
        <FileDescription description={file.description} />
        <FileLabels labels={file.labels} />
      </div>
    </div>
  )
}