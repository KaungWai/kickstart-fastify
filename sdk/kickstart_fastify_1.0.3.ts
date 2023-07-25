/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginRequest {
    /**
     * @minLength 12
     * @maxLength 12
     */
    userId: string
    password: string
}

export type LoginResult = object

export type LogoutResult = object

export type ResponseMessage = object

export interface CreateProductRequest {
    /**
     * @minLength 1
     * @maxLength 100
     */
    productName: string
    /**
     * @minLength 1
     * @maxLength 500
     */
    productDescription: string
    /** @min 1 */
    productPrice: number
}

export interface CreateProductResult {
    /**
     * @minLength 12
     * @maxLength 12
     */
    productId: string
    /**
     * @minLength 1
     * @maxLength 100
     */
    productName: string
    /**
     * @minLength 1
     * @maxLength 500
     */
    productDescription: string
    /** @min 1 */
    productPrice: number
}

export interface DeleteProductByIdParams {
    /**
     * @minLength 12
     * @maxLength 12
     */
    productId: string
}

export type DeleteProductByIdResult = object

export interface GetProductByIdParams {
    /**
     * @minLength 12
     * @maxLength 12
     */
    productId: string
}

export interface GetProductByIdResult {
    /**
     * @minLength 12
     * @maxLength 12
     */
    productId: string
    /**
     * @minLength 1
     * @maxLength 100
     */
    productName: string
    /**
     * @minLength 1
     * @maxLength 500
     */
    productDescription: string
    /** @min 1 */
    productPrice: number
}

export interface GetProductsQuery {
    /**
     * @minLength 12
     * @maxLength 12
     */
    productId?: string
    /**
     * @minLength 1
     * @maxLength 100
     */
    productName?: string
    /**
     * @minLength 1
     * @maxLength 500
     */
    productDescription?: string
    /** @min 1 */
    productPriceFrom?: number
    /** @min 1 */
    productPriceTo?: number
}

export type GetProductsResult = {
    /**
     * @minLength 12
     * @maxLength 12
     */
    productId: string
    /**
     * @minLength 1
     * @maxLength 100
     */
    productName: string
    /**
     * @minLength 1
     * @maxLength 500
     */
    productDescription: string
    /** @min 1 */
    productPrice: number
}[]

export interface UpdateProductRequest {
    /**
     * @minLength 12
     * @maxLength 12
     */
    productId: string
    /**
     * @minLength 1
     * @maxLength 100
     */
    productName: string
    /**
     * @minLength 1
     * @maxLength 500
     */
    productDescription: string
    /** @min 1 */
    productPrice: number
}

export interface UpdateProductResult {
    /**
     * @minLength 12
     * @maxLength 12
     */
    productId: string
    /**
     * @minLength 1
     * @maxLength 100
     */
    productName: string
    /**
     * @minLength 1
     * @maxLength 500
     */
    productDescription: string
    /** @min 1 */
    productPrice: number
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean
    /** request path */
    path: string
    /** content type of request body */
    type?: ContentType
    /** query params */
    query?: QueryParamsType
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat
    /** request body */
    body?: unknown
    /** base url */
    baseUrl?: string
    /** request cancellation token */
    cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string
    baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
    customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D
    error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = 'http://localhost:3333'
    private securityData: SecurityDataType | null = null
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
    private abortControllers = new Map<CancelToken, AbortController>()
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

    private baseApiParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig)
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data
    }

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key)
        return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key])
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key]
        return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {}
        const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
        return keys.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join('&')
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery)
        return queryString ? `?${queryString}` : ''
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) => (input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input),
        [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key]
                formData.append(key, property instanceof Blob ? property : typeof property === 'object' && property !== null ? JSON.stringify(property) : `${property}`)
                return formData
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    }

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        }
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken)
            if (abortController) {
                return abortController.signal
            }
            return void 0
        }

        const abortController = new AbortController()
        this.abortControllers.set(cancelToken, abortController)
        return abortController.signal
    }

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken)

        if (abortController) {
            abortController.abort()
            this.abortControllers.delete(cancelToken)
        }
    }

    public request = async <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams = ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {}
        const requestParams = this.mergeRequestParams(params, secureParams)
        const queryString = query && this.toQueryString(query)
        const payloadFormatter = this.contentFormatters[type || ContentType.Json]
        const responseFormat = format || requestParams.format

        return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
            },
            signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
            body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
        }).then(async (response) => {
            const r = response as HttpResponse<T, E>
            r.data = null as unknown as T
            r.error = null as unknown as E

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then((data) => {
                          if (r.ok) {
                              r.data = data
                          } else {
                              r.error = data
                          }
                          return r
                      })
                      .catch((e) => {
                          r.error = e
                          return r
                      })

            if (cancelToken) {
                this.abortControllers.delete(cancelToken)
            }

            if (!response.ok) throw data
            return data
        })
    }
}

/**
 * @title Kickstart Fastify
 * @version 1.0.3
 * @baseUrl http://localhost:3333
 * @externalDocs https://swagger.io
 *
 * Swagger API documentation
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    auth = {
        /**
         * @description # Login You can use some markdown syntaxs like header, lists and text formattings. It would be nice to describe your api overivew here.
         *
         * @tags Auth
         * @name LoginCreate
         * @summary Login
         * @request POST:/auth/login
         */
        loginCreate: (data: LoginRequest, params: RequestParams = {}) =>
            this.request<
                {
                    result: LoginResult
                    message: ResponseMessage
                },
                any
            >({
                path: `/auth/login`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * @description # Logout You can use some markdown syntaxs like header, lists and text formattings. It would be nice to describe your api overivew here.
         *
         * @tags Auth
         * @name LogoutCreate
         * @summary Logout
         * @request POST:/auth/logout
         */
        logoutCreate: (params: RequestParams = {}) =>
            this.request<
                {
                    result: LogoutResult
                    message: ResponseMessage
                },
                any
            >({
                path: `/auth/logout`,
                method: 'POST',
                format: 'json',
                ...params,
            }),
    }
    product = {
        /**
         * @description # Create product You can use some markdown syntaxs like header, lists and text formattings. It would be nice to describe your api overivew here.
         *
         * @tags Product
         * @name ProductCreate
         * @summary create a new product
         * @request POST:/product
         */
        productCreate: (
            data: {
                /**
                 * @minLength 1
                 * @maxLength 100
                 */
                productName: string
                /**
                 * @minLength 1
                 * @maxLength 500
                 */
                productDescription: string
                /** @min 1 */
                productPrice: number
            },
            params: RequestParams = {},
        ) =>
            this.request<
                {
                    result: CreateProductResult
                    message: ResponseMessage
                },
                any
            >({
                path: `/product`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * @description # Get procucts You can use some markdown syntaxs like header, lists and text formattings. It would be nice to describe your api overivew here.
         *
         * @tags Product
         * @name ProductList
         * @summary get products by filter
         * @request GET:/product
         */
        productList: (
            query?: {
                /**
                 * @minLength 12
                 * @maxLength 12
                 */
                productId?: string
                /**
                 * @minLength 1
                 * @maxLength 100
                 */
                productName?: string
                /**
                 * @minLength 1
                 * @maxLength 500
                 */
                productDescription?: string
                /** @min 1 */
                productPriceFrom?: number
                /** @min 1 */
                productPriceTo?: number
            },
            params: RequestParams = {},
        ) =>
            this.request<
                {
                    result: GetProductsResult
                    message: ResponseMessage
                },
                any
            >({
                path: `/product`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description # Update product You can use some markdown syntaxs like header, lists and text formattings. It would be nice to describe your api overivew here.
         *
         * @tags Product
         * @name ProductUpdate
         * @summary update a product
         * @request PUT:/product
         */
        productUpdate: (
            data: {
                /**
                 * @minLength 12
                 * @maxLength 12
                 */
                productId: string
                /**
                 * @minLength 1
                 * @maxLength 100
                 */
                productName: string
                /**
                 * @minLength 1
                 * @maxLength 500
                 */
                productDescription: string
                /** @min 1 */
                productPrice: number
            },
            params: RequestParams = {},
        ) =>
            this.request<
                {
                    result: UpdateProductResult
                    message: ResponseMessage
                },
                any
            >({
                path: `/product`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * @description # Get product by productId You can use some markdown syntaxs like header, lists and text formattings. It would be nice to describe your api overivew here.
         *
         * @tags Product
         * @name ProductDetail
         * @summary get a product by productId
         * @request GET:/product/{productId}
         */
        productDetail: (productId: string, params: RequestParams = {}) =>
            this.request<
                {
                    result: GetProductByIdResult
                    message: ResponseMessage
                },
                any
            >({
                path: `/product/${productId}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description # Delete product by productId You can use some markdown syntaxs like header, lists and text formattings. It would be nice to describe your api overivew here.
         *
         * @tags Product
         * @name ProductDelete
         * @summary delete product by productId
         * @request DELETE:/product/{productId}
         */
        productDelete: (productId: string, params: RequestParams = {}) =>
            this.request<
                {
                    result: DeleteProductByIdResult
                    message: ResponseMessage
                },
                any
            >({
                path: `/product/${productId}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),
    }
}
