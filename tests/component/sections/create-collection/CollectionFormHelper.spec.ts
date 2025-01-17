import { CollectionInputLevel } from '../../../../src/collection/domain/models/Collection'
import { CollectionInputLevelDTO } from '../../../../src/collection/domain/useCases/DTOs/CollectionDTO'
import {
  MetadataBlockInfo,
  MetadataBlockName,
  MetadataField
} from '../../../../src/metadata-block-info/domain/models/MetadataBlockInfo'
import {
  FormattedCollectionInputLevels,
  FormattedCollectionInputLevelsWithoutParentBlockName,
  MetadataFieldWithParentBlockInfo
} from '../../../../src/sections/create-collection/collection-form/CollectionForm'
import { CollectionFormHelper } from '../../../../src/sections/create-collection/collection-form/CollectionFormHelper'

const allMetadataBlocksInfoMock: MetadataBlockInfo[] = [
  {
    id: 4,
    name: 'astrophysics',
    displayName: 'Astronomy and Astrophysics Metadata',
    displayOnCreate: true,
    metadataFields: {
      requiredField: {
        name: 'requiredField',
        displayName: 'Spatial Resolution',
        isRequired: true,
        title: '',
        type: 'TEXT',
        typeClass: 'primitive',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        displayOnCreate: true,
        displayOrder: 0
      },
      'coverage.Spectral.Wavelength': {
        name: 'coverage.Spectral.Wavelength',
        displayName: 'Wavelength Range',
        isRequired: false,
        displayOnCreate: true,
        title: '',
        type: 'TEXT',
        typeClass: 'primitive',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        displayOrder: 0,
        childMetadataFields: {
          'coverage.Spectral.MinimumWavelength': {
            name: 'coverage.Spectral.MinimumWavelength',
            displayName: 'Wavelength Range Minimum (m)',
            isRequired: false,
            title: '',
            type: 'TEXT',
            typeClass: 'primitive',
            watermark: '',
            description: '',
            multiple: false,
            isControlledVocabulary: false,
            displayFormat: '',
            displayOrder: 0,
            displayOnCreate: true
          },
          bar: {
            name: 'bar',
            displayName: 'Bar',
            isRequired: true,
            title: '',
            type: 'TEXT',
            typeClass: 'primitive',
            watermark: '',
            description: '',
            multiple: false,
            isControlledVocabulary: false,
            displayFormat: '',
            displayOnCreate: true,
            displayOrder: 0
          }
        }
      }
    }
  }
]

const expectedBaseInputLevels: FormattedCollectionInputLevels = {
  bar: {
    include: true,
    optionalOrRequired: 'required',
    parentBlockName: 'astrophysics' as MetadataBlockName
  },
  'coverage/Spectral/MinimumWavelength': {
    include: true,
    optionalOrRequired: 'optional',
    parentBlockName: 'astrophysics' as MetadataBlockName
  },
  'coverage/Spectral/Wavelength': {
    include: true,
    optionalOrRequired: 'optional',
    parentBlockName: 'astrophysics' as MetadataBlockName
  },
  requiredField: {
    include: true,
    optionalOrRequired: 'required',
    parentBlockName: 'astrophysics' as MetadataBlockName
  }
}

describe('CollectionFormHelper', () => {
  it('defineBaseInputLevels helper', () => {
    const result = CollectionFormHelper.defineBaseInputLevels(allMetadataBlocksInfoMock)

    expect(result).to.deep.equal(expectedBaseInputLevels)
  })

  it('formatCollectiontInputLevels', () => {
    const collectionInputLevels: CollectionInputLevel[] = [
      {
        datasetFieldName: 'coverage.Spectral.Wavelength',
        include: true,
        required: false
      },
      {
        datasetFieldName: 'bar',
        include: true,
        required: true
      }
    ]

    const result = CollectionFormHelper.formatCollectiontInputLevels(collectionInputLevels)
    const undefinedResult = CollectionFormHelper.formatCollectiontInputLevels(undefined)

    expect(result).to.deep.equal({
      bar: {
        include: true,
        optionalOrRequired: 'required'
      },
      'coverage/Spectral/Wavelength': {
        include: true,
        optionalOrRequired: 'optional'
      }
    })

    expect(undefinedResult).to.deep.equal({})
  })

  it('mergeBaseAndDefaultInputLevels', () => {
    const baseInputLevels: FormattedCollectionInputLevels = {
      'coverage/Spectral/Wavelength': {
        include: true,
        optionalOrRequired: 'optional',
        parentBlockName: 'astrophysics' as MetadataBlockName
      },
      foo: {
        include: true,
        optionalOrRequired: 'optional',
        parentBlockName: 'astrophysics' as MetadataBlockName
      }
    }

    const formattedCollectionInputLevels: FormattedCollectionInputLevelsWithoutParentBlockName = {
      'coverage/Spectral/Wavelength': {
        include: true,
        optionalOrRequired: 'optional'
      },
      foo: {
        include: true,
        optionalOrRequired: 'required'
      }
    }
    const result = CollectionFormHelper.mergeBaseAndDefaultInputLevels(
      baseInputLevels,
      formattedCollectionInputLevels
    )

    expect(result).to.deep.equal({
      'coverage/Spectral/Wavelength': {
        include: true,
        optionalOrRequired: 'optional',
        parentBlockName: 'astrophysics' as MetadataBlockName
      },
      foo: {
        include: true,
        optionalOrRequired: 'required',
        parentBlockName: 'astrophysics' as MetadataBlockName
      }
    })
  })

  it('formatFormMetadataBlockNamesToMetadataBlockNamesDTO', () => {
    const formMetadataBlockNames = {
      citation: true,
      geospatial: false,
      socialscience: true,
      astrophysics: false,
      biomedical: true,
      journal: false,
      codeMeta20: false,
      computationalworkflow: false
    }

    const result =
      CollectionFormHelper.formatFormMetadataBlockNamesToMetadataBlockNamesDTO(
        formMetadataBlockNames
      )

    expect(result).to.deep.equal(['citation', 'socialscience', 'biomedical'])
  })

  it('formatFormInputLevelsToInputLevelsDTO', () => {
    const metadataBlockNamesSelected = ['citation', 'socialscience']
    const formCollectionInputLevels: FormattedCollectionInputLevels = {
      title: {
        include: true,
        optionalOrRequired: 'required',
        parentBlockName: 'citation' as MetadataBlockName
      },
      subtitle: {
        include: true,
        optionalOrRequired: 'optional',
        parentBlockName: 'citation' as MetadataBlockName
      },
      foo: {
        include: true,
        optionalOrRequired: 'required',
        parentBlockName: 'socialscience' as MetadataBlockName
      },
      bar: {
        include: true,
        optionalOrRequired: 'optional',
        parentBlockName: 'socialscience' as MetadataBlockName
      }
    }

    const expectedResult: CollectionInputLevelDTO[] = [
      {
        datasetFieldName: 'title',
        include: true,
        required: true
      },
      {
        datasetFieldName: 'subtitle',
        include: true,
        required: false
      },
      {
        datasetFieldName: 'foo',
        include: true,
        required: true
      },
      {
        datasetFieldName: 'bar',
        include: true,
        required: false
      }
    ]

    const result = CollectionFormHelper.formatFormInputLevelsToInputLevelsDTO(
      metadataBlockNamesSelected,
      formCollectionInputLevels
    )

    expect(result).to.deep.equal(expectedResult)
  })

  it('getChildFieldSiblings', () => {
    const childMetadataFields: Record<string, MetadataField> = {
      'coverage.Spectral.MinimumWavelength': {
        name: 'coverage.Spectral.MinimumWavelength',
        displayName: 'Wavelength Range Minimum (m)',
        isRequired: false,
        title: '',
        type: 'TEXT',
        typeClass: 'primitive',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        displayOnCreate: true,
        displayOrder: 0
      },
      bar: {
        name: 'bar',
        displayName: 'Bar',
        isRequired: true,
        title: '',
        type: 'TEXT',
        typeClass: 'primitive',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        displayOnCreate: true,
        displayOrder: 0
      },
      foo: {
        name: 'foo',
        displayName: 'Foo',
        isRequired: false,
        title: '',
        type: 'TEXT',
        typeClass: 'primitive',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        displayOnCreate: true,
        displayOrder: 0
      }
    }
    const targetChildFieldName = 'bar'

    const result = CollectionFormHelper.getChildFieldSiblings(
      childMetadataFields,
      targetChildFieldName
    )

    expect(result).to.deep.equal({
      'coverage.Spectral.MinimumWavelength': {
        name: 'coverage.Spectral.MinimumWavelength',
        displayName: 'Wavelength Range Minimum (m)',
        isRequired: false,
        title: '',
        type: 'TEXT',
        typeClass: 'primitive',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        displayOnCreate: true,
        displayOrder: 0
      },
      foo: {
        name: 'foo',
        displayName: 'Foo',
        isRequired: false,
        title: '',
        type: 'TEXT',
        typeClass: 'primitive',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        displayOnCreate: true,
        displayOrder: 0
      }
    })
  })

  it('assignBlockInfoToFacetableMetadataFields', () => {
    const facetableMetadataFields: MetadataField[] = [
      {
        name: 'foo',
        displayName: 'Foo',
        title: 'Foo',
        type: 'TEXT',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        isRequired: false,
        displayOrder: 1,
        typeClass: 'primitive',
        displayOnCreate: false
      },
      {
        name: 'bar',
        displayName: 'Bar',
        title: 'Bar',
        type: 'TEXT',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        isRequired: false,
        displayOrder: 2,
        typeClass: 'primitive',
        displayOnCreate: false
      },
      {
        name: 'doe',
        displayName: 'Doe',
        title: 'Doe',
        type: 'TEXT',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        isRequired: false,
        displayOrder: 3,
        typeClass: 'primitive',
        displayOnCreate: false
      }
    ]

    const allMetadataBlocksInfo: MetadataBlockInfo[] = [
      {
        id: 1,
        name: 'citation',
        displayName: 'Citation Metadata',
        displayOnCreate: true,
        metadataFields: {
          foo: {
            name: 'foo',
            displayName: 'Foo',
            title: 'Foo',
            type: 'TEXT',
            watermark: '',
            description: '',
            multiple: false,
            isControlledVocabulary: false,
            displayFormat: '',
            isRequired: false,
            displayOrder: 1,
            typeClass: 'primitive',
            displayOnCreate: false,
            childMetadataFields: {
              bar: {
                name: 'bar',
                displayName: 'Bar',
                title: 'Bar',
                type: 'TEXT',
                watermark: '',
                description: '',
                multiple: false,
                isControlledVocabulary: false,
                displayFormat: '',
                isRequired: false,
                displayOrder: 2,
                typeClass: 'primitive',
                displayOnCreate: false
              }
            }
          }
        }
      },
      {
        id: 4,
        name: 'astrophysics',
        displayName: 'Astronomy and Astrophysics Metadata',
        displayOnCreate: false,
        metadataFields: {
          doe: {
            name: 'doe',
            displayName: 'Doe',
            title: 'Doe',
            type: 'TEXT',
            watermark: '',
            description: '',
            multiple: false,
            isControlledVocabulary: false,
            displayFormat: '',
            isRequired: false,
            displayOrder: 3,
            typeClass: 'primitive',
            displayOnCreate: false
          }
        }
      }
    ]

    const result = CollectionFormHelper.assignBlockInfoToFacetableMetadataFields(
      facetableMetadataFields,
      allMetadataBlocksInfo
    )

    const expectedResult: MetadataFieldWithParentBlockInfo[] = [
      {
        name: 'foo',
        displayName: 'Foo',
        title: 'Foo',
        type: 'TEXT',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        isRequired: false,
        displayOrder: 1,
        typeClass: 'primitive',
        displayOnCreate: false,
        parentBlockInfo: {
          id: 1,
          name: 'citation',
          displayName: 'Citation Metadata'
        }
      },
      {
        name: 'bar',
        displayName: 'Bar',
        title: 'Bar',
        type: 'TEXT',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        isRequired: false,
        displayOrder: 2,
        typeClass: 'primitive',
        displayOnCreate: false,
        parentBlockInfo: {
          id: 1,
          name: 'citation',
          displayName: 'Citation Metadata'
        }
      },
      {
        name: 'doe',
        displayName: 'Doe',
        title: 'Doe',
        type: 'TEXT',
        watermark: '',
        description: '',
        multiple: false,
        isControlledVocabulary: false,
        displayFormat: '',
        isRequired: false,
        displayOrder: 3,
        typeClass: 'primitive',
        displayOnCreate: false,
        parentBlockInfo: {
          id: 4,
          name: 'astrophysics',
          displayName: 'Astronomy and Astrophysics Metadata'
        }
      }
    ]

    expect(result).to.deep.equal(expectedResult)
  })

  it('replaces string with dots with slashes', () => {
    const result = CollectionFormHelper.replaceDotWithSlash('coverage.Spectral.MinimumWavelength')

    expect(result).to.equal('coverage/Spectral/MinimumWavelength')
  })

  it('replaces string with slashes with dots', () => {
    const result = CollectionFormHelper.replaceSlashWithDot('coverage/Spectral/MinimumWavelength')

    expect(result).to.equal('coverage.Spectral.MinimumWavelength')
  })
})
