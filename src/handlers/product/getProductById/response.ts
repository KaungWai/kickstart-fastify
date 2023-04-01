import { Static, Type } from '@sinclair/typebox'

import { DefaultResponse } from '@/handlers/base/defaultResponse'
import { field } from '@/schemas/fields'

export const getProductByIdResult = Type.Object({
    productId: field.productId,
    productName: field.productName,
    productDescription: field.productDescription,
    productPrice: field.productPrice,
})

export const getProductByIdResponse: DefaultResponse<typeof getProductByIdResult> = {
    result: getProductByIdResult,
}

export type GetProductByIdResult = Static<typeof getProductByIdResult>

export type GetProductByIdResponse = DefaultResponse<GetProductByIdResult>
