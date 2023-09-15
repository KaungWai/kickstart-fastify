import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'
import { handlerUtils } from '@/utils/handler'

export const loginRequest = handlerUtils.buildRequestSchema(
    Type.Object(
        {
            userId: field.userId,
            password: Type.String(),
        },
        { $id: 'loginRequest' },
    ),
)

export type LoginRequest = Static<typeof loginRequest>
