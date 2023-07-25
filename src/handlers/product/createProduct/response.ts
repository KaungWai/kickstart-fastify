import { Static, Type } from '@sinclair/typebox'

import { createDefaultResponseSchema } from '@/handlers/base/defaultResponse'
import { field } from '@/schemas/fields'

export const createProductResult = Type.Object(
    {
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    },
    { $id: 'createProductResult' },
)

export const createProductResponse = createDefaultResponseSchema(createProductResult, 'createProductResponse')

export type CreateProductResult = Static<typeof createProductResult>

export type CreateProductResponse = Static<typeof createProductResponse>
