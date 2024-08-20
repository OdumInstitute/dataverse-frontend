import {
  MetadataBlockInfoDisplayFormat,
  MetadataBlockInfo
} from '../../../metadata-block-info/domain/models/MetadataBlockInfo'
import { MetadataBlockInfoMockRepository } from './MetadataBlockInfoMockRepository'

export class MetadataBlockInfoMockLoadingRepository implements MetadataBlockInfoMockRepository {
  getByName(_name: string): Promise<MetadataBlockInfoDisplayFormat | undefined> {
    return new Promise(() => {})
  }

  getByCollectionId(_collectionId: number | string): Promise<MetadataBlockInfo[]> {
    return new Promise(() => {})
  }

  getDisplayedOnCreateByCollectionId(_collectionId: number | string): Promise<MetadataBlockInfo[]> {
    return new Promise(() => {})
  }

  getAllTemporal(_names: string[]): Promise<MetadataBlockInfo[]> {
    return new Promise(() => {})
  }
}
