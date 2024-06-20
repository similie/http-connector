import { IUserbadge } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class UserBadge extends Model<IUserbadge> {
    constructor(connector?: LiveConnectionConstruct);
}
