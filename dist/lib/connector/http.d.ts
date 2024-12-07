export declare class HttpConnection {
    readonly CorsHeader: Partial<RequestInit>;
    private _cors;
    constructor(cors?: boolean);
    /**
     * @returns {boolean}
     */
    get cors(): boolean;
    /**
     * @param {boolean} cors
     */
    set cors(cors: boolean);
    private sendResponseAsText;
    fetchStreamData(response: Response, cb: (chunk: string) => Promise<void>): Promise<{
        length: number;
        chunks: string;
    }>;
    /**
     * @public
     * @name appendCorsToConfig
     * @description allows us to append the cors header to the
     *   request config
     * @param {RequestInit} config
     * @returns{RequestInit}
     */
    appendCorsToConfig(config?: RequestInit): RequestInit;
    /**
     * @public
     * @name send
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit} init
     * @returns {Promise<Response>}
     */
    send(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    /**
     * @public
     * @name get
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit?} init
     * @returns {Promise<Response>}
     */
    get(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    /**
     * @public
     * @name delete
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit?} init
     * @returns {Promise<Response>}
     */
    delete(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    /**
     * @public
     * @name put
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit?} init
     * @returns {Promise<Response>}
     */
    put(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    /**
     * @public
     * @name post
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit?} init
     * @returns {Promise<Response>}
     */
    post(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}
export interface IRawHttpQuery {
    url: string;
    http: HttpConnection;
}
export declare const pullCookieValueInBrowser: (key: string) => string | null;
export declare const AUTHENTICATION_TOKEN_COOKIE = "authentication_token";
