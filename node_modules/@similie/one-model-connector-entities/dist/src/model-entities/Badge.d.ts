import { IBadge } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Badge extends Model<IBadge> {
    constructor(connector?: LiveConnectionConstruct);
}
