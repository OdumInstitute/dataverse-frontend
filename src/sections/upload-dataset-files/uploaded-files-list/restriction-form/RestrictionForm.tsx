import {
  Button,
  Col,
  Form
} from '@iqss/dataverse-design-system'
import styles from './RestrictionForm.module.scss'
import { FormEvent, useState } from 'react'

interface RestrictionFormProps {
  requestAccess: boolean
  updateRequestAccess: (checked: boolean) => void
  terms: string
  updateTerms: (newTerms: string) => void
}

export function RestrictionForm({
  requestAccess,
  updateRequestAccess,
  terms,
  updateTerms
}: RestrictionFormProps) {

  return (
    <div className={styles.restriction_form}>
        <div className={styles.restriction_info}>
          <p>Restricting limits access to published files. People who want to use the restricted files can request access by default. If you disable request access, you must add information about access to the Terms of Access field.</p>
          <p>Learn about restricting files and dataset access in the User Guide.</p>
        </div>
        <Form>
          <Form.Group>
            <Form.Group.Label column sm={3}>
              Request Access
            </Form.Group.Label>
            <Col sm={9}>
              <Form.Group.Checkbox
                label="Enable access request"
                id={'requestAccessCB'}
                checked={requestAccess}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  updateRequestAccess(event.currentTarget.checked)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Group.Label column sm={3}>
              Terms of Access for Restricted Files
            </Form.Group.Label>
            <Col sm={9}>
              <Form.Group.TextArea
                defaultValue={terms}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  updateTerms(event.currentTarget.value)
                }
              />
            </Col>
          </Form.Group>
        </Form>
    </div>
  )
}
