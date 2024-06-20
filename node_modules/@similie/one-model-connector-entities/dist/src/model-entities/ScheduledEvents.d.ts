import { IScheduledevents } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class ScheduledEvents extends Model<IScheduledevents> {
    constructor(connector?: LiveConnectionConstruct);
}
