import { useEffect, useState } from 'react'
import { DatasetRepository } from '../../dataset/domain/repositories/DatasetRepository'
import { Dataset } from '../../dataset/domain/models/Dataset'
import { getDatasetById } from '../../dataset/domain/useCases/getDatasetById'
import { useLoading } from '../loading/LoadingContext'
import { getDatasetByPrivateUrlToken } from '../../dataset/domain/useCases/getDatasetByPrivateUrlToken'

export function useDataset(
  repository: DatasetRepository,
  searchParams: {
    id?: string
    privateUrlToken?: string | null
  }
) {
  const [dataset, setDataset] = useState<Dataset>()
  const { setIsLoading } = useLoading()
  const getDataset = () => {
    if (searchParams.id) {
      return getDatasetById(repository, searchParams.id)
    }
    if (searchParams.privateUrlToken) {
      return getDatasetByPrivateUrlToken(repository, searchParams.privateUrlToken)
    }
    return Promise.resolve(undefined)
  }

  useEffect(() => {
    setIsLoading(true)

    getDataset()
      .then((dataset: Dataset | undefined) => {
        setDataset(dataset)
        setIsLoading(false)
      })
      .catch((error) => console.error('There was an error getting the dataset', error))
  }, [repository, searchParams])

  return { dataset }
}
