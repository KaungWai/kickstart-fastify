import { TObject, TOptional, TRef, TSchema, TString, Type } from '@sinclair/typebox'

export const responseMessage = Type.Union([Type.String(), Type.Undefined()], { $id: 'responseMessage' })

type DefaultResponse<T extends TSchema = TSchema> = TObject<{
    result: TRef<T>
    message: TOptional<TString<string>>
}>

export const createDefaultResponseSchema = <T extends TSchema = TSchema>(resultSchema: T, $id: string): DefaultResponse<T> => {
    return Type.Object(
        {
            result: Type.Ref(resultSchema),
            message: Type.Optional(Type.String()),
        },
        { $id: $id },
    )
}
