import { IEwsnotification } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EwsNotification extends Model<IEwsnotification> {
    constructor(connector?: LiveConnectionConstruct);
}
