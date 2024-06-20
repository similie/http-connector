"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingAdmin = void 0;
const model_structures_1 = require("../model-structures");
class MailingAdmin extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'mailingadmins';
    }
}
exports.MailingAdmin = MailingAdmin;
