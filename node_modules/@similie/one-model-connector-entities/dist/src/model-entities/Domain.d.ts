import { IDomain } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Domain extends Model<IDomain> {
    constructor(connector?: LiveConnectionConstruct);
}
