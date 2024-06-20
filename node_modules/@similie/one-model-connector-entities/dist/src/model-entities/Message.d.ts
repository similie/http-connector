import { IMessage } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Message extends Model<IMessage> {
    constructor(connector?: LiveConnectionConstruct);
}
