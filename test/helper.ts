import 'module-alias/register'

import build from '@/app'

const getJWtToken = async (userId: string, password: string): Promise<string> => {
    const server = build({})
    const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
            userId,
            password,
        },
    })
    server.close()

    if (response.statusCode !== 200) {
        console.error('unexpected status code')
        return ''
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jwtCookie = response.cookies.find((cookie: any) => cookie.name === 'jwt')

    if (!jwtCookie) {
        console.error('jwt cookie not found')
        return ''
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (jwtCookie as any).value
}

export { getJWtToken }
