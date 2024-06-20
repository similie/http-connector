import { IEventregistration } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EventRegistration extends Model<IEventregistration> {
    constructor(connector?: LiveConnectionConstruct);
}
