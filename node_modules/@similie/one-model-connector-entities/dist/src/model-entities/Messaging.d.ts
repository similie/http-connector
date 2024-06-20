import { IMessaging } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Messaging extends Model<IMessaging> {
    constructor(connector?: LiveConnectionConstruct);
}
