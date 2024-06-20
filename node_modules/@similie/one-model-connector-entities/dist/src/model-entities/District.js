"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.District = void 0;
const model_structures_1 = require("../model-structures");
class District extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'districts';
    }
}
exports.District = District;
