import type { Meta, StoryObj } from '@storybook/react'
import { WithI18next } from '../../WithI18next'
import { DatasetSummary } from '../../../sections/dataset/dataset-summary/DatasetSummary'
import { DatasetMetadataBlock, DatasetLicense } from '../../../dataset/domain/models/Dataset'
import { DatasetMother } from '../../../../tests/component/dataset/domain/models/DatasetMother'
import { MetadataBlockInfoMockRepository } from '../../shared-mock-repositories/metadata-block-info/MetadataBlockInfoMockRepository'

const meta: Meta<typeof DatasetSummary> = {
  title: 'Sections/Dataset Page/DatasetSummary',
  component: DatasetSummary,
  decorators: [WithI18next]
}

const licenseMock: DatasetLicense = DatasetMother.createRealistic().license
const summaryFieldsMock: DatasetMetadataBlock[] = DatasetMother.createRealistic().summaryFields
export default meta
type Story = StoryObj<typeof DatasetSummary>

export const Default: Story = {
  render: () => (
    <DatasetSummary
      summaryFields={summaryFieldsMock}
      license={licenseMock}
      metadataBlockInfoRepository={new MetadataBlockInfoMockRepository()}
    />
  )
}
