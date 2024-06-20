import { IInvite } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Invite extends Model<IInvite> {
    constructor(connector?: LiveConnectionConstruct);
}
