"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsVerification = void 0;
const model_structures_1 = require("../model-structures");
class CredentialsVerification extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'credentialsverifications';
    }
}
exports.CredentialsVerification = CredentialsVerification;
