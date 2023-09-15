import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'
import { handlerUtils } from '@/utils/handler'

export const updateProductResult = Type.Object(
    {
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    },
    { $id: 'updateProductResult' },
)

export const updateProductResponse = handlerUtils.buildResponseSchema(updateProductResult, 'updateProductResponse')

export type UpdateProductResult = Static<typeof updateProductResult>

export type UpdateProductResponse = Static<typeof updateProductResponse>
