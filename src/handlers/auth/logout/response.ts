import { Static, Type } from '@sinclair/typebox'

import { createDefaultResponseSchema } from '@/handlers/base/defaultResponse'

export const logoutResult = Type.Object({}, { $id: 'logoutResult' })

export const logoutResponse = createDefaultResponseSchema(logoutResult, 'logoutResponse')

export type LogoutResult = Static<typeof logoutResult>

export type LogoutResponse = Static<typeof logoutResponse>
