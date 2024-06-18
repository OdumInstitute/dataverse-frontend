import { useFieldArray, useFormContext } from 'react-hook-form'
import { type MetadataField } from '../../../../../../../../metadata-block-info/domain/models/MetadataBlockInfo'
import { MetadataFormField, type CommonFieldProps } from '..'
import { Col, Form, Row } from '@iqss/dataverse-design-system'
import { DynamicFieldsButtons } from '../../dynamic-fields-buttons/DynamicFieldsButtons'
import cn from 'classnames'
import styles from '../index.module.scss'

interface ComposedFieldMultipleProps extends CommonFieldProps {
  metadataBlockName: string
  childMetadataFields: Record<string, MetadataField>
  compoundParentName?: string
  fieldsArrayIndex?: number
}

export const ComposedFieldMultiple = ({
  metadataBlockName,
  title,
  name,
  description,
  childMetadataFields,
  rulesToApply
}: ComposedFieldMultipleProps) => {
  const { control } = useFormContext()

  const {
    fields: fieldsArray,
    insert,
    remove
  } = useFieldArray({
    name: `${metadataBlockName}.${name}`,
    control: control
  })

  const handleOnAddField = (index: number) => {
    const firstChildFieldName = Object.values(childMetadataFields)[0].name

    const newField = Object.entries(childMetadataFields).reduce((acc, [_, metadataField]) => {
      acc[metadataField.name] = ''
      return acc
    }, {} as Record<string, string>)

    insert(index + 1, newField, {
      shouldFocus: true,
      focusName: `${metadataBlockName}.${name}.${index + 1}.${firstChildFieldName}`
    })
  }

  const handleOnRemoveField = (index: number) => remove(index)

  return (
    <Form.GroupWithMultipleFields
      title={title}
      message={description}
      required={Boolean(rulesToApply?.required)}>
      {fieldsArray.map((field, index) => {
        return (
          <Row key={field.id} className={styles['composed-fields-multiple-row']}>
            <Col sm={9} className={styles['composed-fields-grid']}>
              {Object.entries(childMetadataFields).map(
                ([childMetadataFieldKey, childMetadataFieldInfo]) => {
                  return (
                    <MetadataFormField
                      key={childMetadataFieldKey}
                      metadataFieldInfo={childMetadataFieldInfo}
                      metadataBlockName={metadataBlockName}
                      fieldsArrayIndex={index}
                      withinMultipleFieldsGroup={true}
                      compoundParentName={name}
                      compoundParentIsRequired={Boolean(rulesToApply?.required)}
                    />
                  )
                }
              )}
            </Col>
            <Col
              sm={3}
              className={cn(
                styles['dynamic-fields-button-container'],
                styles['on-composed-multiple']
              )}>
              <DynamicFieldsButtons
                fieldName={title}
                onAddButtonClick={() => handleOnAddField(index)}
                onRemoveButtonClick={() => handleOnRemoveField(index)}
                originalField={index === 0}
              />
            </Col>
          </Row>
        )
      })}
    </Form.GroupWithMultipleFields>
  )
}
