import { useQuery } from '@tanstack/react-query'

import client from '../../../client'

import type { QueryKey, UseQueryResult, UseQueryOptions, QueryOptions } from '@tanstack/react-query'
import type { GetUserByNameResponse, GetUserByNamePathParams, GetUserByName400, GetUserByName404 } from '../../models/ts/userController/GetUserByName'

export const getUserByNameQueryKey = (username: GetUserByNamePathParams['username']) => [`/user/${username}`] as const

export function getUserByNameQueryOptions<TData = GetUserByNameResponse>(username: GetUserByNamePathParams['username']): QueryOptions<TData> {
  const queryKey = getUserByNameQueryKey(username)

  return {
    queryKey,
    queryFn: () => {
      return client<TData>({
        method: 'get',
        url: `/user/${username}`,
      })
    },
  }
}

/**
 * @summary Get user by user name
 * @link /user/:username
 */
export function useGetUserByName<TData = GetUserByNameResponse, TError = GetUserByName400 & GetUserByName404>(
  username: GetUserByNamePathParams['username'],
  options?: { query?: UseQueryOptions<TData> }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUserByNameQueryKey(username)

  const query = useQuery<TData, TError>({
    ...getUserByNameQueryOptions<TData>(username),
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryKey as QueryKey

  return query
}
