import { IContact } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Contact extends Model<IContact> {
    constructor(connector?: LiveConnectionConstruct);
}
