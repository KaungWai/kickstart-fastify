import { Static, Type } from '@sinclair/typebox'

import { field } from '@/schemas/fields'

export const loginRequest = Type.Object(
    {
        userId: field.userId,
        password: Type.String(),
    },
    { $id: 'loginRequest' },
)

export type LoginRequest = Static<typeof loginRequest>
