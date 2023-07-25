import { Static, Type } from '@sinclair/typebox'

import { createDefaultResponseSchema } from '@/handlers/base/defaultResponse'
import { field } from '@/schemas/fields'

export const getProductByIdResult = Type.Object(
    {
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    },
    { $id: 'getProductByIdResult' },
)

export const getProductByIdResponse = createDefaultResponseSchema(getProductByIdResult, 'getProductByIdResponse')

export type GetProductByIdResult = Static<typeof getProductByIdResult>

export type GetProductByIdResponse = Static<typeof getProductByIdResponse>
