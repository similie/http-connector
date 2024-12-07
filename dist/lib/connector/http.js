"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTHENTICATION_TOKEN_COOKIE = exports.pullCookieValueInBrowser = exports.HttpConnection = void 0;
const types_1 = require("./types");
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
class HttpConnection {
    constructor(cors = false) {
        this.CorsHeader = {
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
        this._cors = cors;
    }
    /**
     * @returns {boolean}
     */
    get cors() {
        return this._cors;
    }
    /**
     * @param {boolean} cors
     */
    set cors(cors) {
        this._cors = cors;
    }
    sendResponseAsText(response, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield response.text();
            const asArray = results.split("\n").filter((r) => !!r);
            for (const obj of asArray) {
                yield cb(obj);
            }
            return { length: results.length, chunks: results };
        });
    }
    fetchStreamData(response, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (!response.body) {
                throw new Error("ReadableStream not supported on this browser.");
            }
            if (!response.body.getReader) {
                return this.sendResponseAsText(response, cb);
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let length = 0; // keep track of how much data we've received
            let chunks = ""; // hold the data chunks
            const run = true;
            while (run) {
                const { done, value } = yield reader.read();
                if (done) {
                    console.log("Stream complete");
                    break;
                }
                length += value.length;
                const chunk = decoder.decode(value, { stream: true });
                chunks += chunk;
                yield cb(chunk);
            }
            return { chunks, length };
        });
    }
    /**
     * @public
     * @name appendCorsToConfig
     * @description allows us to append the cors header to the
     *   request config
     * @param {RequestInit} config
     * @returns{RequestInit}
     */
    appendCorsToConfig(config = {}) {
        if (!this.cors) {
            return config;
        }
        const configHeaders = config.headers || {};
        return Object.assign(Object.assign({}, config), { mode: this.CorsHeader.mode, headers: Object.assign(configHeaders, this.CorsHeader.headers) });
    }
    /**
     * @public
     * @name send
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit} init
     * @returns {Promise<Response>}
     */
    send(input, init = {}) {
        const config = this.appendCorsToConfig(init);
        return (0, isomorphic_fetch_1.default)(input, config);
    }
    /**
     * @public
     * @name get
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit?} init
     * @returns {Promise<Response>}
     */
    get(input, init = {}) {
        init.method = types_1.HttpMethod.GET;
        return this.send(input, init);
    }
    /**
     * @public
     * @name delete
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit?} init
     * @returns {Promise<Response>}
     */
    delete(input, init = {}) {
        init.method = types_1.HttpMethod.DELETE;
        return this.send(input, init);
    }
    /**
     * @public
     * @name put
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit?} init
     * @returns {Promise<Response>}
     */
    put(input, init = {}) {
        init.method = types_1.HttpMethod.PUT;
        return this.send(input, init);
    }
    /**
     * @public
     * @name post
     * @description a generic send for the an http request
     * @param {RequestInfo | URL} input
     * @param {RequestInit?} init
     * @returns {Promise<Response>}
     */
    post(input, init = {}) {
        init.method = types_1.HttpMethod.POST;
        return this.send(input, init);
    }
}
exports.HttpConnection = HttpConnection;
const pullCookieValueInBrowser = (key) => {
    if (typeof document === "undefined") {
        return null;
    }
    // Add the equals sign to match the key precisely
    const nameEQ = key + "=";
    // Split the cookie string into individual key=value pairs
    const ca = document.cookie.split(";");
    // Loop through the array to find and return the right cookie value
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        if (!c) {
            continue;
        }
        // Trim spaces that might be present around the cookie
        while (c.charAt(0) === " ")
            c = c.substring(1);
        // Check if the cookie string starts with the desired name
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length); // Extract and return the value
    }
    // If not found, return null
    return null;
};
exports.pullCookieValueInBrowser = pullCookieValueInBrowser;
exports.AUTHENTICATION_TOKEN_COOKIE = "authentication_token";
