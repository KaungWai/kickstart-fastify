import { Static, Type } from '@sinclair/typebox'

import { createDefaultResponseSchema } from '@/handlers/base/defaultResponse'
import { field } from '@/schemas/fields'

export const updateProductResult = Type.Object(
    {
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    },
    { $id: 'updateProductResult' },
)

export const updateProductResponse = createDefaultResponseSchema(updateProductResult, 'updateProductResponse')

export type UpdateProductResult = Static<typeof updateProductResult>

export type UpdateProductResponse = Static<typeof updateProductResponse>
