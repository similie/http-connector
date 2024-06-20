import { IModule } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Module extends Model<IModule> {
    constructor(connector?: LiveConnectionConstruct);
}
