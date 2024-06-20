import { ITutorial } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Tutorial extends Model<ITutorial> {
    constructor(connector?: LiveConnectionConstruct);
}
