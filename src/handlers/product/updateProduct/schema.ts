import { Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'

import { updateProductRequest } from './request'
import { updateProductResponse } from './response'

const description = `
# Update product
You can use some markdown syntaxs like header, lists and text formattings.
It would be nice to describe your api overivew here.
`

export const updateProductSchema: FastifySchema = {
    operationId: 'updateProduct',
    summary: `update a product`,
    tags: ['Product'],
    description: description,
    body: Type.Ref(updateProductRequest),
    response: {
        201: Type.Ref(updateProductResponse),
    },
}
