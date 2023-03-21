import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'

export const updateProductRequest = Type.Object({
    productId: field.productId,
    productName: field.productName,
    productDescription: field.productDescription,
    productPrice: field.productPrice,
})

export type UpdateProductRequest = Static<typeof updateProductRequest>
