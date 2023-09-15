import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'
import { handlerUtils } from '@/utils/handler'

export const getProductsResult = Type.Array(
    Type.Object({
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    }),
    { $id: 'getProductsResult' },
)

export const getProductsResponse = handlerUtils.buildResponseSchema(getProductsResult, 'getProductsResponse')

export type GetProductsResult = Static<typeof getProductsResult>

export type GetProductsResponse = Static<typeof getProductsResponse>
