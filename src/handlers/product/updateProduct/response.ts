import { field } from '@/schemas/fields'
import { Static, Type } from '@sinclair/typebox'
import { DefaultResponse } from '@/handlers/base/defaultResponse'

const updateProductResult = Type.Object({
    productId: field.productId,
    productName: field.productName,
    productDescription: field.productDescription,
    productPrice: field.productPrice,
})

export const updateProductResponse: DefaultResponse<typeof updateProductResult> = {
    result: updateProductResult,
}

export type UpdateProductResult = Static<typeof updateProductResult>

export type UpdateProductResponse = DefaultResponse<UpdateProductResult>
