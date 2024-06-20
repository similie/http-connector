import { IPassport } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Passport extends Model<IPassport> {
    constructor(connector?: LiveConnectionConstruct);
}
