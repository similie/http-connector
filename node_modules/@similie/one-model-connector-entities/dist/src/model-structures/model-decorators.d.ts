import { IEntity, IQueryDecorators, IQueryFetch, IQueryLimiters, IQueryPopulates, IQueryStreamDecorators, ISingleQueryObject } from '../entities';
import { Model } from '.';
/**
 * @class
 * @name QueryFetchDecorators
 * @description when an initWithId is called it can only have
 * a populates param
 * @param {QueryDecorators<T>} decorator
 */
export declare class QueryFetchDecorators<T extends IEntity> implements IQueryFetch<T> {
    private _decorator;
    constructor(decorator: QueryDecorators<T>);
    /**
     * @name fetch
     * @description
     * @returns {IEntity} - decorator fetchOne
     */
    fetch(): Promise<T>;
}
/**
 * @class
 * @name QueryPopulantDecorators
 * @description when an find is called it can only have
 * a populates param;
 * @param {QueryDecorators<T>} decorator
 */
export declare class QueryPopulantDecorators<T extends IEntity> implements IQueryPopulates<T> {
    private _decorator;
    constructor(decorator: QueryDecorators<T>);
    /**
     * @public
     * @name populate
     * @description - applies a populate value to the query
     * @param {string} value - string the association to populate
     * @param {ISingleQueryObject<any>?} criteria
     * @returns {QueryFetchDecorators<IEntity>} - it should only contain a fetch function
     */
    populate(value: string, criteria?: ISingleQueryObject<any>): QueryFetchDecorators<T>;
    /**
     * @public
     * @name populateAll
     * @description - populates all associates
     * @returns {QueryFetchDecorators<IEntity>} it should only contain a fetch function
     */
    populateAll(): QueryFetchDecorators<T>;
    /**
     * @public
     * @name fetch
     * @description pulls a fetchOne for the initWithId function
     * @returns {IEntity}
     */
    fetch(): Promise<T>;
}
/**
 * @class
 * @name QueryDecorators
 * @description allows for query chaining for the model find function
 */
export declare class QueryDecorators<T extends IEntity> implements IQueryDecorators<T> {
    private _model;
    private _query;
    private _limiter;
    constructor(model: Model<T>, query: any);
    /**
     * @public
     * @name fetch
     * @description pulls a fetch for the initWithId function
     * @returns {Promise<IEntity[]>}
     */
    fetch(): Promise<T[]>;
    /**
     * @public
     * @name fetchOne
     * @description pulls a fetchOne for the initWithId function
     * @returns {Promise<IEntity>}
     */
    fetchOne(): Promise<T>;
    /**
     * @public
     * @name populate
     * @description applies a populate value to the query
     * @param {string} value  the association to populate
     * @param {ISingleQueryObject<any>?} criteria
     * @returns {QueryFetchDecorators<IEntity>}
     */
    populate(value: string, criteria?: ISingleQueryObject<any>): this;
    /**
     * @public
     * @name populateAll
     * @description - popluations all associates
     * @returns {QueryFetchDecorators<IEntity>}
     */
    populateAll(): this;
    /**
     * @public
     * @name setLimiter
     * @param {keyofIQueryLimiters} attr
     * @param {any} value
     * @returns {QueryDecorators<IEntity>}
     */
    setLimiter(attr: keyof IQueryLimiters, value: any): this;
    /**
     * @public
     * @name sort
     * @param {string | object[] | object} sort
     * @returns {QueryDecorators<IEntity>}
     */
    sort(sort: string | object[] | object): this;
    /**
     * @public
     * @name limit
     * @param {number} value
     * @returns {QueryDecorators<IEntity>}
     */
    limit(value: number): this;
    /**
     * @public
     * @name skip
     * @param {number} value
     * @returns {QueryDecorators<IEntity>}
     */
    skip(value: number): this;
    protected get connector(): import("../entities").LiveConnectionConstruct;
    protected get modelInstance(): import("./param-structure").ModelInstance<T>;
    protected get modelConfig(): import("../entities").IModelConfigurationDetails;
    protected get limiter(): IQueryLimiters;
    protected get query(): any;
}
/**
 * @class
 * @name QueryStreamDecorator
 * @extends QueryDecorators
 * @description runs operations for stream style queries
 * @param {Model<T>} model
 * @param {any} query
 */
export declare class QueryStreamDecorators<T extends IEntity> extends QueryDecorators<T> implements IQueryStreamDecorators<T> {
    private _batch;
    private _localBatchCallback;
    private _localEachCallback;
    constructor(model: Model<T>, query: any);
    /**
     * @private
     * @name applyStreamCallback
     * @description managers the action for the fetch callback
     * @param {IEntity | IEntity[]} records
     * @returns {Promise<void> | void}
     */
    private applyStreamCallback;
    /**
     * @public
     * @name fetch
     * @description runs the query operations. It must be called to process
     *   the batch operation
     * @returns {Promise<any>}
     */
    fetch(): Promise<any>;
    /**
     * @public
     * @name fetchOne
     * @description used to override the fetchOne from QueryDecorators. It is not
     *  relevant for this operation
     * @throws Error
     * @returns {Promise<null>}
     */
    fetchOne(): Promise<any>;
    /**
     * @public
     * @name eachRecord
     * @description runs a single record operation for streaming models
     * @param {function(models: T[]):Promise<any> | any} cb
     * @returns {QueryStreamDecorators<IEntity>}
     */
    eachRecord(cb: (model: T) => any | Promise<any>): this;
    /**
     * @public
     * @name eachBatch
     * @description runs a batch operation for streaming models
     * @param  {number} batchNumber
     * @param {function(models: T[]):Promise<any> | any} cb
     * @returns {QueryStreamDecorators<IEntity>}
     */
    eachBatch(batchNumber: number, cb: (models: T[]) => Promise<any> | any): this;
}
