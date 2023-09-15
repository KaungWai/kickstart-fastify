import { Static, Type } from '@sinclair/typebox'

import { handlerUtils } from '@/utils/handler'

export const loginResult = Type.Object({}, { $id: 'loginResult' })

export const loginResponse = handlerUtils.buildResponseSchema(loginResult, 'loginResponse')

export type LoginResult = Static<typeof loginResult>

export type LoginResponse = Static<typeof loginResponse>
