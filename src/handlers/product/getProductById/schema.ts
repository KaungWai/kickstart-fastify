import { Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'

import { getProductByIdParams } from './parameter'
import { getProductByIdResponse } from './response'

const description = `
# Get product by productId
You can use some markdown syntaxs like header, lists and text formattings.
It would be nice to describe your api overivew here.
`

export const getProductByIdSchema: FastifySchema = {
    operationId: 'getProductById',
    summary: `get a product by productId`,
    tags: ['Product'],
    description: description,
    params: Type.Ref(getProductByIdParams),
    response: {
        200: Type.Ref(getProductByIdResponse),
    },
}
