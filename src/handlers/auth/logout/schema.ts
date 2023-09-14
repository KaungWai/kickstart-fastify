import { FastifySchema } from 'fastify'

import { logoutResponse } from './response'

const description = `
# Logout
You can use some markdown syntaxs like header, lists and text formattings.
It would be nice to describe your api overivew here.
`

export const logoutSchema: FastifySchema = {
    operationId: 'logout',
    summary: `Logout`,
    tags: ['Auth'],
    description: description,
    response: {
        200: logoutResponse,
    },
}
