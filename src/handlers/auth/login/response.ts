import { Static, Type } from '@sinclair/typebox'

import { createDefaultResponseSchema } from '@/handlers/base/defaultResponse'

export const loginResult = Type.Object({}, { $id: 'loginResult' })

export const loginResponse = createDefaultResponseSchema(loginResult, 'loginResponse')

export type LoginResult = Static<typeof loginResult>

export type LoginResponse = Static<typeof loginResponse>
