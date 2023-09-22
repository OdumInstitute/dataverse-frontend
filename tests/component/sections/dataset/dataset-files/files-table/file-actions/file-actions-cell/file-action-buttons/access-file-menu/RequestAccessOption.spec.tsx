import { RequestAccessOption } from '../../../../../../../../../../src/sections/dataset/dataset-files/files-table/file-actions/file-actions-cell/file-action-buttons/access-file-menu/RequestAccessOption'
import { FileMother } from '../../../../../../../../files/domain/models/FileMother'
import { FileRepository } from '../../../../../../../../../../src/files/domain/repositories/FileRepository'
import { FileUserPermissionsMother } from '../../../../../../../../files/domain/models/FileUserPermissionsMother'
import { FilePermissionsProvider } from '../../../../../../../../../../src/sections/file/file-permissions/FilePermissionsProvider'

describe('RequestAccessOption', () => {
  it('renders the embargoed message when the file is embargoed', () => {
    const fileEmbargoed = FileMother.createWithEmbargo()
    cy.customMount(<RequestAccessOption file={fileEmbargoed} />)

    cy.findByRole('button', { name: 'Files are unavailable during the specified embargo.' })
      .should('exist')
      .should('have.class', 'disabled')
  })

  it('renders the embargo then restricted message when the file is embargoed and restricted', () => {
    const fileEmbargoedRestricted = FileMother.createWithEmbargoRestricted()
    cy.customMount(<RequestAccessOption file={fileEmbargoedRestricted} />)

    cy.findByRole('button', {
      name: 'Files are unavailable during the specified embargo and restricted after that.'
    })
      .should('exist')
      .should('have.class', 'disabled')
  })

  it('renders the Users may not request access to files. message when the file is restricted and access request is not allowed', () => {
    const fileRestricted = FileMother.createWithRestrictedAccess()
    cy.customMount(<RequestAccessOption file={fileRestricted} />)

    cy.findByRole('button', { name: 'Users may not request access to files.' })
      .should('exist')
      .should('have.class', 'disabled')
  })

  it('renders the request access button when the file is restricted and can be requested', () => {
    const fileRestrictedCanBeRequested = FileMother.createWithAccessRequestAllowed()
    cy.customMount(<RequestAccessOption file={fileRestrictedCanBeRequested} />)

    cy.findByRole('button', { name: 'Request Access' }).should('exist')
  })

  it('renders the access requested message when hen the file is restricted and the access has already been requested', () => {
    const fileAlreadyRequested = FileMother.createWithAccessRequestPending()

    cy.customMount(<RequestAccessOption file={fileAlreadyRequested} />)

    cy.findByRole('button', { name: 'Access Requested' })
      .should('exist')
      .should('have.class', 'disabled')
  })

  it('does not render the request access button when the file is deaccessioned', () => {
    const fileDeaccessioned = FileMother.createDeaccessioned()
    cy.customMount(<RequestAccessOption file={fileDeaccessioned} />)

    cy.findByRole('button', { name: 'Users may not request access to files.' }).should('not.exist')
    cy.findByRole('button', { name: 'Request Access' }).should('not.exist')
    cy.findByRole('button', { name: 'Access Requested' }).should('not.exist')
    cy.findByRole('button', { name: 'Files are unavailable during the specified embargo.' }).should(
      'not.exist'
    )
    cy.findByRole('button', {
      name: 'Files are unavailable during the specified embargo and restricted after that.'
    }).should('not.exist')
  })

  it('does not render the request access button when the file status is public', () => {
    const filePublic = FileMother.createWithPublicAccess()
    const fileRepository: FileRepository = {} as FileRepository
    fileRepository.getFileUserPermissionsById = cy.stub().resolves(
      FileUserPermissionsMother.create({
        fileId: filePublic.id,
        canDownloadFile: true
      })
    )

    cy.customMount(
      <FilePermissionsProvider repository={fileRepository}>
        <RequestAccessOption file={filePublic} />
      </FilePermissionsProvider>
    )

    cy.findByRole('button', { name: 'Users may not request access to files.' }).should('not.exist')
    cy.findByRole('button', { name: 'Request Access' }).should('not.exist')
    cy.findByRole('button', { name: 'Access Requested' }).should('not.exist')
    cy.findByRole('button', { name: 'Files are unavailable during the specified embargo.' }).should(
      'not.exist'
    )
    cy.findByRole('button', {
      name: 'Files are unavailable during the specified embargo and restricted after that.'
    }).should('not.exist')
  })

  it('does not render the request access button when the file status is restricted with access granted', () => {
    const fileRestrictedWithAccess = FileMother.createWithRestrictedAccessWithAccessGranted()
    const fileRepository: FileRepository = {} as FileRepository
    fileRepository.getFileUserPermissionsById = cy.stub().resolves(
      FileUserPermissionsMother.create({
        fileId: fileRestrictedWithAccess.id,
        canDownloadFile: true
      })
    )

    cy.customMount(
      <FilePermissionsProvider repository={fileRepository}>
        <RequestAccessOption file={fileRestrictedWithAccess} />
      </FilePermissionsProvider>
    )

    cy.findByRole('button', { name: 'Users may not request access to files.' }).should('not.exist')
    cy.findByRole('button', { name: 'Request Access' }).should('not.exist')
    cy.findByRole('button', { name: 'Access Requested' }).should('not.exist')
    cy.findByRole('button', { name: 'Files are unavailable during the specified embargo.' }).should(
      'not.exist'
    )
    cy.findByRole('button', {
      name: 'Files are unavailable during the specified embargo and restricted after that.'
    }).should('not.exist')
  })
})