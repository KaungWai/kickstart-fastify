import { Static, Type } from '@sinclair/typebox'

import { DefaultResponse } from '@/handlers/base/defaultResponse'

const loginResult = Type.Null()

export const loginResponse: DefaultResponse<typeof loginResult> = {
    result: loginResult,
}

export type LoginResult = Static<typeof loginResult>

export type LoginResponse = DefaultResponse<LoginResult>
