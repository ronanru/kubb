import useSWR from 'swr'

import client from '@kubb/swagger-client/client'

import type { SWRConfiguration, SWRResponse } from 'swr'
import type { ListPetsBreedResponse, ListPetsBreedPathParams, ListPetsBreedQueryParams } from '../models/ListPetsBreed'

export function listPetsBreedQueryOptions<TData = ListPetsBreedResponse>(
  breed: ListPetsBreedPathParams['breed'],
  params?: ListPetsBreedQueryParams
): SWRConfiguration<TData> {
  return {
    fetcher: () => {
      return client<TData>({
        method: 'get',
        url: `/pets/${breed}`,
        params,
      })
    },
  }
}

/**
 * @summary List all pets with breed
 * @link /pets/:breed
 */
export function useListPetsBreed<TData = ListPetsBreedResponse, TError = unknown>(
  breed: ListPetsBreedPathParams['breed'],
  params?: ListPetsBreedQueryParams,
  options?: { query?: SWRConfiguration<TData, TError> }
): SWRResponse<TData, TError> {
  const { query: queryOptions } = options ?? {}

  const query = useSWR<TData, TError, string>(`/pets/${breed}`, {
    ...listPetsBreedQueryOptions<TData>(breed, params),
    ...queryOptions,
  })

  return query
}
