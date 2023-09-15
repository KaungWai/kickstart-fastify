export const SYS_CONSTANTS: {
    NANOID_LENGTH: number
    DEFAULT_ENCODING: BufferEncoding
    JWT_COOKIE_KEY: string
    SALT_ROUNDS: number
    SWAGGER_ROUTE: string
    SCHEMA_SYMBOL: symbol
} = {
    NANOID_LENGTH: 12,
    DEFAULT_ENCODING: 'utf-8',
    JWT_COOKIE_KEY: 'jwt',
    SALT_ROUNDS: 10,
    SWAGGER_ROUTE: 'docs',
    SCHEMA_SYMBOL: Symbol('Schema symbol'),
}
