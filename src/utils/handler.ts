import { TObject, TRef, TSchema, Type } from '@sinclair/typebox'

import { SYS_CONSTANTS } from '@/constants/systemConstants'

const messageSchema = Type.Optional(Type.String())

const buildParamSchema = <T extends TSchema = TSchema>(requestSchema: T): T => {
    if (!requestSchema.$id) {
        throw new Error('Missing schema $id property')
    }
    Reflect.defineProperty(requestSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    return requestSchema
}

const buildQuerySchema = <T extends TSchema = TSchema>(requestSchema: T): T => {
    if (!requestSchema.$id) {
        throw new Error('Missing schema $id property')
    }
    Reflect.defineProperty(requestSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    return requestSchema
}

const buildRequestSchema = <T extends TSchema = TSchema>(requestSchema: T): T => {
    if (!requestSchema.$id) {
        throw new Error('Missing schema $id property')
    }
    Reflect.defineProperty(requestSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    return requestSchema
}

type DefaultResponse<T extends TSchema = TSchema> = TObject<{
    result: TRef<T>
    message: typeof messageSchema
}>

const buildResponseSchema = <T extends TSchema = TSchema>(resultSchema: T, $id: string): DefaultResponse<T> => {
    Reflect.defineProperty(resultSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    const responseSchema = Type.Object(
        {
            result: Type.Ref(resultSchema),
            message: messageSchema,
        },
        { $id: $id },
    )
    Reflect.defineProperty(responseSchema, SYS_CONSTANTS.SCHEMA_SYMBOL, { value: true })
    return responseSchema
}

export const handlerUtils = {
    buildParamSchema,
    buildQuerySchema,
    buildRequestSchema,
    buildResponseSchema,
}
