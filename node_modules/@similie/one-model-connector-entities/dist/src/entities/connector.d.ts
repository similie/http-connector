import { IEntity, IModelCollection, ISharedDataConnects, IQueryLimiters, IModelConfigurationDetails } from '.';
import { IModelAttributes } from './model-attr';
import { IQueryOrPartial } from './queries';
/**
 * @interface IModelConnect
 * @extends ISharedDataConnects
 * @description used only by a connector class to differentiate functionality
 * from a basic model
 */
export interface IConnectorConnect<T extends IEntity> extends ISharedDataConnects<T> {
    init: (payload?: any) => Promise<any>;
    attr: (config?: IModelConfigurationDetails) => Promise<Record<string, IModelAttributes>>;
    keys: (config?: IModelConfigurationDetails) => string[];
    tearDown: () => Promise<void>;
    addToCollection: (value: any, collection: IModelCollection<T>) => Promise<void>;
    removeFromCollection: (value: any, collection: IModelCollection<T>) => Promise<void>;
    find: (query: IQueryOrPartial<T>, limiters: IQueryLimiters, config: IModelConfigurationDetails) => Promise<T[]>;
    findOne: (query: IQueryOrPartial<T>, limiters: IQueryLimiters, config: IModelConfigurationDetails) => Promise<T>;
    streamEach: (query: IQueryOrPartial<T>, limiters: IQueryLimiters, config: IModelConfigurationDetails, cb: (model: T) => Promise<void> | void) => Promise<void>;
    streamBatch: (query: IQueryOrPartial<T>, limiters: IQueryLimiters, config: IModelConfigurationDetails, cb: (model: T[]) => Promise<void> | void) => Promise<void>;
}
