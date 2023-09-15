import { Static, Type } from '@sinclair/typebox'

import { handlerUtils } from '@/utils/handler'

export const logoutResult = Type.Object({}, { $id: 'logoutResult' })

export const logoutResponse = handlerUtils.buildResponseSchema(logoutResult, 'logoutResponse')

export type LogoutResult = Static<typeof logoutResult>

export type LogoutResponse = Static<typeof logoutResponse>
