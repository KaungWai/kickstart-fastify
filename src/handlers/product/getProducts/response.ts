import { Static, Type } from '@sinclair/typebox'

import { createDefaultResponseSchema } from '@/handlers/base/defaultResponse'
import { field } from '@/schemas/fields'

export const getProductsResult = Type.Array(
    Type.Object({
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    }),
    { $id: 'getProductsResult' },
)

export const getProductsResponse = createDefaultResponseSchema(getProductsResult, 'getProductsResponse')

export type GetProductsResult = Static<typeof getProductsResult>

export type GetProductsResponse = Static<typeof getProductsResponse>
