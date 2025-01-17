import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from '@iqss/dataverse-design-system'
import { type DatasetRepository } from '../../dataset/domain/repositories/DatasetRepository'
import { type MetadataBlockInfoRepository } from '../../metadata-block-info/domain/repositories/MetadataBlockInfoRepository'
import { SeparationLine } from '../shared/layout/SeparationLine/SeparationLine'
import { HostCollectionForm } from './HostCollectionForm/HostCollectionForm'
import { NotImplementedModal } from '../not-implemented/NotImplementedModal'
import { useNotImplementedModal } from '../not-implemented/NotImplementedModalContext'
import { DatasetMetadataForm } from '../shared/form/DatasetMetadataForm'
import { useGetCollectionUserPermissions } from '../../shared/hooks/useGetCollectionUserPermissions'
import { CollectionRepository } from '../../collection/domain/repositories/CollectionRepository'
import { useLoading } from '../loading/LoadingContext'
import { ROOT_COLLECTION_ALIAS } from '../../collection/domain/models/Collection'

import { BreadcrumbsGenerator } from '../shared/hierarchy/BreadcrumbsGenerator'
import { useCollection } from '../collection/useCollection'
import { PageNotFound } from '../page-not-found/PageNotFound'
import { CreateDatasetSkeleton } from './CreateDatasetSkeleton'

interface CreateDatasetProps {
  datasetRepository: DatasetRepository
  metadataBlockInfoRepository: MetadataBlockInfoRepository
  collectionRepository: CollectionRepository
  collectionId?: string
}

export function CreateDataset({
  datasetRepository,
  metadataBlockInfoRepository,
  collectionRepository,
  collectionId = ROOT_COLLECTION_ALIAS
}: CreateDatasetProps) {
  const { t } = useTranslation('createDataset')
  const { isModalOpen, hideModal } = useNotImplementedModal()
  const { setIsLoading } = useLoading()

  const { collection, isLoading: isLoadingCollection } = useCollection(
    collectionRepository,
    collectionId
  )

  const { collectionUserPermissions, isLoading: isLoadingCollectionUserPermissions } =
    useGetCollectionUserPermissions({
      collectionIdOrAlias: collectionId,
      collectionRepository: collectionRepository
    })

  const canUserAddDataset = Boolean(collectionUserPermissions?.canAddDataset)
  const isLoadingData = isLoadingCollectionUserPermissions || isLoadingCollection

  useEffect(() => {
    setIsLoading(isLoadingData)
  }, [isLoadingData, setIsLoading])

  if (!isLoadingCollection && !collection) {
    return <PageNotFound />
  }

  if (isLoadingCollection || !collection) {
    return <CreateDatasetSkeleton />
  }

  if (collectionUserPermissions && !canUserAddDataset) {
    return (
      <div className="pt-4" data-testid="not-allowed-to-create-dataset-alert">
        <Alert variant="danger" dismissible={false}>
          {t('notAllowedToCreateDataset')}
        </Alert>
      </div>
    )
  }

  return (
    <>
      <NotImplementedModal show={isModalOpen} handleClose={hideModal} />
      <article>
        <BreadcrumbsGenerator
          hierarchy={collection?.hierarchy}
          withActionItem
          actionItemText={t('pageTitle')}
        />
        <header>
          <h1>{t('pageTitle')}</h1>
        </header>
        <SeparationLine />
        <HostCollectionForm collectionId={collectionId} />

        <DatasetMetadataForm
          mode="create"
          collectionId={collectionId}
          datasetRepository={datasetRepository}
          metadataBlockInfoRepository={metadataBlockInfoRepository}
        />
      </article>
    </>
  )
}
