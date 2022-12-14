import { field } from '@/schemas/fields'
import { Static, Type } from '@sinclair/typebox'
import { DefaultResponse } from '@/handlers/base/defaultResponse'

export const getProductsResult = Type.Array(
    Type.Object({
        productId: field.productId,
        productName: field.productName,
        productDescription: field.productDescription,
        productPrice: field.productPrice,
    })
)

export const getProductsResponse: DefaultResponse<typeof getProductsResult> = {
    result: getProductsResult,
}

export type GetProductsResult = Static<typeof getProductsResult>

export type GetProductsResponse = DefaultResponse<GetProductsResult>
