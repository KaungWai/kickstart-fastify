import { field } from '@/schemas/fields'
import { Static, Type } from '@sinclair/typebox'
import { DefaultResponse } from '@/handlers/base/defaultResponse'

const createProductResult = Type.Object({
    productId: field.productId,
    productName: field.productName,
    productDescription: field.productDescription,
    productPrice: field.productPrice,
})

export const createProductResponse: DefaultResponse<typeof createProductResult> = {
    result: createProductResult,
}

export type CreateProductResult = Static<typeof createProductResult>

export type CreateProductResponse = DefaultResponse<CreateProductResult>
