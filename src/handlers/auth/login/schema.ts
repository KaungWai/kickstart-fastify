import { Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'

import { loginRequest } from './request'
import { loginResponse } from './response'

const description = `
# Login
You can use some markdown syntaxs like header, lists and text formattings.
It would be nice to describe your api overivew here.
`

export const loginSchema: FastifySchema = {
    summary: `Login`,
    tags: ['Auth'],
    description: description,
    body: Type.Ref(loginRequest),
    response: {
        200: loginResponse,
    },
}
