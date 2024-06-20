"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const model_structures_1 = require("../model-structures");
class Contact extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'contacts';
    }
}
exports.Contact = Contact;
