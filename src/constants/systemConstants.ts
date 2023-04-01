import { Algorithm } from 'fast-jwt/src/index'

export const SYS_CONSTANTS: {
    NANOID_LENGTH: number
    DEFAULT_ENCODING: BufferEncoding
    JWT_SIGN_ALGO: Algorithm
    JWT_COOKIE_KEY: string
    SALT_ROUNDS: number,
    SWAGGER_ROUTE: string,
} = {
    NANOID_LENGTH: 12,
    DEFAULT_ENCODING: 'utf-8',
    JWT_SIGN_ALGO: 'RS256',
    JWT_COOKIE_KEY: 'jwt',
    SALT_ROUNDS: 10,
    SWAGGER_ROUTE: 'docs',
}
