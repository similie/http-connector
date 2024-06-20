import { ISms } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Sms extends Model<ISms> {
    constructor(connector?: LiveConnectionConstruct);
}
