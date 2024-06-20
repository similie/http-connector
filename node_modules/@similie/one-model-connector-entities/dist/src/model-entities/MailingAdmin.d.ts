import { IMailingadmin } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class MailingAdmin extends Model<IMailingadmin> {
    constructor(connector?: LiveConnectionConstruct);
}
