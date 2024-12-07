"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethod = void 0;
/**
 * The HTTP method for a given request
 */
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["ALL"] = "*";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
