import { Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'

import { createProductRequest } from './request'
import { createProductResponse } from './response'

const description = `
# Create product
You can use some markdown syntaxs like header, lists and text formattings.
It would be nice to describe your api overivew here.
`

export const createProductSchema: FastifySchema = {
    operationId: 'createProduct',
    summary: `create a new product`,
    tags: ['Product'],
    description: description,
    body: Type.Ref(createProductRequest),
    response: {
        201: Type.Ref(createProductResponse),
    },
}
