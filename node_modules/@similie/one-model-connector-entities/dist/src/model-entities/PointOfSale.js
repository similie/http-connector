"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointOfSale = void 0;
const model_structures_1 = require("../model-structures");
class PointOfSale extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'pointofsales';
    }
}
exports.PointOfSale = PointOfSale;
