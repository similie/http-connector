import { IEmail } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Email extends Model<IEmail> {
    constructor(connector?: LiveConnectionConstruct);
}
