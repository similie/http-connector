"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Site = void 0;
const model_structures_1 = require("../model-structures");
class Site extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'sites';
    }
}
exports.Site = Site;
