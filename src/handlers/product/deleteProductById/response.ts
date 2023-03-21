import { Static, Type } from '@sinclair/typebox'
import { DefaultResponse } from '@/handlers/base/defaultResponse'

const deleteProductByIdResult = Type.Unsafe()
export const deleteProductByIdResponse: DefaultResponse<typeof deleteProductByIdResult> = {
    result: deleteProductByIdResult,
}

export type DeleteProductByIdResult = Static<typeof deleteProductByIdResult>
export type DeleteProductByIdResponse = DefaultResponse<DeleteProductByIdResult>
