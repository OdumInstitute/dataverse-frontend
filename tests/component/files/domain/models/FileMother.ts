import { faker } from '@faker-js/faker'
import {
  File,
  FileDateType,
  FileEmbargo,
  FileLabel,
  FileLabelType,
  FileSize,
  FileSizeUnit,
  FileStatus,
  FileType,
  FileVersion
} from '../../../../../src/files/domain/models/File'

const valueOrUndefined: <T>(value: T) => T | undefined = (value) => {
  const shouldShowValue = faker.datatype.boolean()
  return shouldShowValue ? value : undefined
}

const createFakeFileLabel = (): FileLabel => ({
  type: faker.helpers.arrayElement(Object.values(FileLabelType)),
  value: faker.lorem.word()
})

export class FileMother {
  static create(props?: Partial<File>): File {
    const thumbnail = valueOrUndefined<string>(faker.image.imageUrl())
    const fileType = faker.helpers.arrayElement(['tabular data', faker.system.fileType()])
    const checksum = valueOrUndefined<string>(faker.datatype.uuid())
    const fileMockedData = {
      id: faker.datatype.uuid(),
      name: faker.system.fileName(),
      access: {
        restricted: faker.datatype.boolean(),
        canBeRequested: faker.datatype.boolean(),
        requested: faker.datatype.boolean()
      },
      permissions: {
        canDownload: faker.datatype.boolean()
      },
      version: {
        majorNumber: faker.datatype.number(),
        minorNumber: faker.datatype.number(),
        status: faker.helpers.arrayElement(Object.values(FileStatus))
      },
      type: new FileType(thumbnail ? 'image' : fileType),
      size: {
        value: faker.datatype.number({ max: 1024, precision: 2 }),
        unit: faker.helpers.arrayElement(Object.values(FileSizeUnit))
      },
      date: {
        type: faker.helpers.arrayElement(Object.values(FileDateType)),
        date: faker.date.recent().toDateString()
      },
      downloads: faker.datatype.number(40),
      labels: faker.datatype.boolean()
        ? faker.helpers.arrayElements<FileLabel>([
            createFakeFileLabel(),
            createFakeFileLabel(),
            createFakeFileLabel(),
            createFakeFileLabel()
          ])
        : [],
      checksum: checksum,
      thumbnail: thumbnail,
      directory: valueOrUndefined<string>(faker.system.directoryPath()),
      embargo: valueOrUndefined<FileEmbargo>({
        active: faker.datatype.boolean(),
        date: faker.date.recent().toDateString()
      }),
      tabularData:
        fileType === 'tabular data' && !checksum
          ? {
              variablesCount: faker.datatype.number(100),
              observationsCount: faker.datatype.number(100),
              unf: `UNF:${faker.datatype.uuid()}==`
            }
          : undefined,
      description: valueOrUndefined<string>(faker.lorem.paragraph()),
      isDeleted: faker.datatype.boolean(),
      ...props
    }

    return new File(
      fileMockedData.id,
      new FileVersion(
        fileMockedData.version.majorNumber,
        fileMockedData.version.minorNumber,
        fileMockedData.version.status
      ),
      fileMockedData.name,
      fileMockedData.access,
      fileMockedData.permissions,
      fileMockedData.type,
      new FileSize(fileMockedData.size.value, fileMockedData.size.unit),
      fileMockedData.date,
      fileMockedData.downloads,
      fileMockedData.labels,
      fileMockedData.isDeleted,
      fileMockedData.thumbnail,
      fileMockedData.checksum,
      fileMockedData.embargo,
      fileMockedData.directory,
      fileMockedData.description,
      fileMockedData.tabularData
    )
  }

  static createMany(quantity: number): File[] {
    return Array.from({ length: quantity }).map(() => this.create())
  }

  static createDefault(props?: Partial<File>): File {
    const defaultFile = {
      type: new FileType('file'),
      version: {
        majorNumber: 1,
        minorNumber: 0,
        status: FileStatus.RELEASED
      },
      access: { restricted: false, canBeRequested: false, requested: false },
      permissions: { canDownload: true },
      labels: [],
      checksum: undefined,
      thumbnail: undefined,
      directory: undefined,
      embargo: undefined,
      tabularData: undefined,
      description: undefined,
      isDeleted: false,
      ...props
    }
    return this.create(defaultFile)
  }

  static createWithLabels(): File {
    return this.createDefault({
      labels: faker.helpers.arrayElements<FileLabel>([
        createFakeFileLabel(),
        createFakeFileLabel(),
        createFakeFileLabel(),
        createFakeFileLabel()
      ])
    })
  }

  static createWithDirectory(): File {
    return this.createDefault({ directory: faker.system.directoryPath() })
  }

  static createWithEmbargo(): File {
    return this.createDefault({
      embargo: {
        active: true,
        date: faker.date.future().toDateString()
      }
    })
  }

  static createWithEmbargoRestricted(): File {
    return this.createDefault({
      access: {
        restricted: true,
        canBeRequested: false,
        requested: false
      },
      permissions: {
        canDownload: false
      },
      embargo: {
        active: true,
        date: faker.date.future().toDateString()
      }
    })
  }

  static createWithTabularData(): File {
    return this.createDefault({
      type: new FileType('tabular data'),
      tabularData: {
        variablesCount: faker.datatype.number(100),
        observationsCount: faker.datatype.number(100),
        unf: `UNF:${faker.datatype.uuid()}==`
      }
    })
  }

  static createWithDescription(): File {
    return this.createDefault({
      description: faker.lorem.paragraph()
    })
  }

  static createWithChecksum(): File {
    return this.createDefault({
      checksum: faker.datatype.uuid()
    })
  }

  static createWithPublicAccess(): File {
    return this.createDefault({
      access: {
        restricted: false,
        canBeRequested: false,
        requested: false
      },
      permissions: {
        canDownload: true
      },
      embargo: undefined
    })
  }

  static createWithRestrictedAccess(): File {
    return this.createDefault({
      access: {
        restricted: true,
        canBeRequested: false,
        requested: false
      },
      permissions: {
        canDownload: false
      },
      embargo: undefined
    })
  }

  static createWithRestrictedAccessWithAccessGranted(): File {
    return this.createDefault({
      access: {
        restricted: true,
        canBeRequested: true,
        requested: false
      },
      permissions: {
        canDownload: true
      },
      embargo: undefined
    })
  }

  static createWithAccessRequestAllowed(): File {
    return this.createDefault({
      access: {
        restricted: true,
        canBeRequested: true,
        requested: false
      },
      permissions: {
        canDownload: false
      },
      embargo: undefined
    })
  }

  static createWithAccessRequestPending(): File {
    return this.createDefault({
      access: {
        restricted: true,
        canBeRequested: true,
        requested: true
      },
      permissions: {
        canDownload: false
      },
      embargo: undefined
    })
  }

  static createWithThumbnail(): File {
    return this.createDefault({
      thumbnail: faker.image.imageUrl()
    })
  }

  static createWithThumbnailRestrictedWithAccessGranted(): File {
    return this.createDefault({
      access: {
        restricted: true,
        canBeRequested: true,
        requested: false
      },
      permissions: {
        canDownload: true
      },
      thumbnail: faker.image.imageUrl(),
      type: new FileType('image')
    })
  }

  static createWithThumbnailRestricted(): File {
    return this.createDefault({
      access: {
        restricted: true,
        canBeRequested: false,
        requested: false
      },
      permissions: {
        canDownload: false
      },
      thumbnail: faker.image.imageUrl(),
      type: new FileType('image')
    })
  }

  static createDeleted(): File {
    return this.createDefault({
      isDeleted: true
    })
  }
}
