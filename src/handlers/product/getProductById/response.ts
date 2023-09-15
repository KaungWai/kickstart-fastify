import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'
import { handlerUtils } from '@/utils/handler'

export const getProductByIdResult = Type.Object(
    {
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    },
    { $id: 'getProductByIdResult' },
)

export const getProductByIdResponse = handlerUtils.buildResponseSchema(getProductByIdResult, 'getProductByIdResponse')

export type GetProductByIdResult = Static<typeof getProductByIdResult>

export type GetProductByIdResponse = Static<typeof getProductByIdResponse>
