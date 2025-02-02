import z from 'zod'

import { userSchema } from './userSchema'

/**
 * @description successful operation
 */
export const updateUserErrorSchema = z.any()
export const updateUserPathParamsSchema = z.object({ username: z.string() })
export const updateUserResponseSchema = z.any()

/**
 * @description Update an existent user in the store
 */
export const updateUserRequestSchema = z.lazy(() => userSchema)
