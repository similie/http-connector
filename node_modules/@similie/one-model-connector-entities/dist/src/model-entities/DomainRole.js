"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainRole = void 0;
const model_structures_1 = require("../model-structures");
class DomainRole extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'domainroles';
    }
}
exports.DomainRole = DomainRole;
