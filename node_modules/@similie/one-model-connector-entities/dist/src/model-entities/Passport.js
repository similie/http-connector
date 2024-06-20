"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passport = void 0;
const model_structures_1 = require("../model-structures");
class Passport extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'passports';
    }
}
exports.Passport = Passport;
