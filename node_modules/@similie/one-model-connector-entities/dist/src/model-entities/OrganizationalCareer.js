"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationalCareer = void 0;
const model_structures_1 = require("../model-structures");
class OrganizationalCareer extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'organizationalcareers';
    }
}
exports.OrganizationalCareer = OrganizationalCareer;
