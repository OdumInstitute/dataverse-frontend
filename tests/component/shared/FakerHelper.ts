import { faker } from '@faker-js/faker'
import { FileSize, FileSizeUnit } from '../../../src/files/domain/models/FileMetadata'

export class FakerHelper {
  static chromaticBuild() {
    return import.meta.env.STORYBOOK_CHROMATIC_BUILD === 'true'
  }
  static fileSize(props?: Partial<FileSize>) {
    if (this.chromaticBuild()) {
      const size = {
        value: 450,
        unit: FileSizeUnit.MEGABYTES,
        ...props
      }
      return new FileSize(size.value, size.unit)
    } else {
      const size = {
        value: faker.datatype.number({ max: 1024, precision: 2 }),
        unit: faker.helpers.arrayElement(Object.values(FileSizeUnit)),
        ...props
      }
      return new FileSize(size.value, size.unit)
    }
  }
  static pastDate() {
    if (this.chromaticBuild()) {
      return faker.date.past(10, '2020-01-01T10:00:00.000Z')
    } else {
      return faker.date.past()
    }
  }
  static recentDate() {
    if (this.chromaticBuild()) {
      return faker.date.recent(1, '2024-02-01T10:00:00.000Z')
    } else {
      return faker.date.recent()
    }
  }
  static getImageUrl(width?: number, height?: number) {
    if (this.chromaticBuild()) {
      return 'https://picsum.photos/id/237/200'
    } else {
      return faker.image.imageUrl(width, height)
    }
  }
}
