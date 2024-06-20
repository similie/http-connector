import { ISite } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Site extends Model<ISite> {
    constructor(connector?: LiveConnectionConstruct);
}
