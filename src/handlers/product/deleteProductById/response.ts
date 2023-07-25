import { Static, Type } from '@sinclair/typebox'

import { createDefaultResponseSchema } from '@/handlers/base/defaultResponse'

export const deleteProductByIdResult = Type.Object({}, { $id: 'deleteProductByIdResult' })

export const deleteProductByIdResponse = createDefaultResponseSchema(deleteProductByIdResult, 'deleteProductByIdResponse')

export type DeleteProductByIdResult = Static<typeof deleteProductByIdResult>
export type DeleteProductByIdResponse = Static<typeof deleteProductByIdResponse>
