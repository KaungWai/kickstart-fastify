import { TObject, TRef, TSchema, Type } from '@sinclair/typebox'

export const messageSchema = Type.Optional(Type.String())

type DefaultResponse<T extends TSchema = TSchema> = TObject<{
    result: TRef<T>
    message: typeof messageSchema
}>

export const createDefaultResponseSchema = <T extends TSchema = TSchema>(resultSchema: T, $id: string): DefaultResponse<T> => {
    return Type.Object(
        {
            result: Type.Ref(resultSchema),
            message: messageSchema,
        },
        { $id: $id },
    )
}
