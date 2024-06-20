import { IRole } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Role extends Model<IRole> {
    constructor(connector?: LiveConnectionConstruct);
}
