import { Static, Type } from '@sinclair/typebox'

import { handlerUtils } from '@/utils/handler'

export const deleteProductByIdResult = Type.Object({}, { $id: 'deleteProductByIdResult' })

export const deleteProductByIdResponse = handlerUtils.buildResponseSchema(deleteProductByIdResult, 'deleteProductByIdResponse')

export type DeleteProductByIdResult = Static<typeof deleteProductByIdResult>
export type DeleteProductByIdResponse = Static<typeof deleteProductByIdResponse>
