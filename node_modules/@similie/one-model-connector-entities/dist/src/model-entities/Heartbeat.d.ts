import { IHeartbeat } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Heartbeat extends Model<IHeartbeat> {
    constructor(connector?: LiveConnectionConstruct);
}
