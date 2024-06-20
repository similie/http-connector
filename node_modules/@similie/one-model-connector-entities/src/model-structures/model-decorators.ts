/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import {
  IEntity,
  IQueryDecorators,
  IQueryFetch,
  IQueryLimiters,
  IQueryPopulates,
  IQueryStreamDecorators,
  ISingleQueryObject,
} from '../entities';
import { Model } from '.';
import { ALL_POPULANTS } from '../common';

/**
 * @class
 * @name QueryFetchDecorators
 * @description when an initWithId is called it can only have
 * a populates param
 * @param {QueryDecorators<T>} decorator
 */
export class QueryFetchDecorators<T extends IEntity> implements IQueryFetch<T> {
  private _decorator: QueryDecorators<T>;
  public constructor(decorator: QueryDecorators<T>) {
    this._decorator = decorator;
  }
  /**
   * @name fetch
   * @description
   * @returns {IEntity} - decorator fetchOne
   */
  public fetch() {
    return this._decorator.fetchOne();
  }
}

/**
 * @class
 * @name QueryPopulantDecorators
 * @description when an find is called it can only have
 * a populates param;
 * @param {QueryDecorators<T>} decorator
 */
export class QueryPopulantDecorators<T extends IEntity>
  implements IQueryPopulates<T>
{
  private _decorator: QueryDecorators<T>;
  public constructor(decorator: QueryDecorators<T>) {
    this._decorator = decorator;
  }

  /**
   * @public
   * @name populate
   * @description - applies a populate value to the query
   * @param {string} value - string the association to populate
   * @param {ISingleQueryObject<any>?} criteria
   * @returns {QueryFetchDecorators<IEntity>} - it should only contain a fetch function
   */
  public populate(value: string, criteria?: ISingleQueryObject<any>) {
    this._decorator.populate(value, criteria);
    return new QueryFetchDecorators<T>(this._decorator);
  }

  /**
   * @public
   * @name populateAll
   * @description - populates all associates
   * @returns {QueryFetchDecorators<IEntity>} it should only contain a fetch function
   */
  public populateAll() {
    this._decorator.populateAll();
    return new QueryFetchDecorators<T>(this._decorator);
  }

  /**
   * @public
   * @name fetch
   * @description pulls a fetchOne for the initWithId function
   * @returns {IEntity}
   */
  public fetch() {
    return this._decorator.fetchOne();
  }
}

/**
 * @class
 * @name QueryDecorators
 * @description allows for query chaining for the model find function
 */
export class QueryDecorators<T extends IEntity> implements IQueryDecorators<T> {
  private _model: Model<T>;
  private _query: any;
  private _limiter: IQueryLimiters = {};
  public constructor(model: Model<T>, query: any) {
    this._query = query;
    this._model = model;
  }
  /**
   * @public
   * @name fetch
   * @description pulls a fetch for the initWithId function
   * @returns {Promise<IEntity[]>}
   */
  public async fetch() {
    const found: T[] = <T[]>(
      await this.connector?.find(this._query, this._limiter, this.modelConfig)
    );
    return this.modelInstance.applyMany(found) as Promise<T[]>;
  }
  /**
   * @public
   * @name fetchOne
   * @description pulls a fetchOne for the initWithId function
   * @returns {Promise<IEntity>}
   */
  public async fetchOne() {
    const found = <T>(
      await this.connector?.findOne(
        this._query,
        this._limiter,
        this.modelConfig
      )
    );
    return this.modelInstance.applyOne(found) as Promise<T>;
  }
  /**
   * @public
   * @name populate
   * @description applies a populate value to the query
   * @param {string} value  the association to populate
   * @param {ISingleQueryObject<any>?} criteria
   * @returns {QueryFetchDecorators<IEntity>}
   */
  public populate(value: string, criteria?: ISingleQueryObject<any>) {
    const populate = this._limiter.populate || {};
    populate[value] = criteria;
    this.setLimiter('populate', populate);
    return this;
  }

  /**
   * @public
   * @name populateAll
   * @description - popluations all associates
   * @returns {QueryFetchDecorators<IEntity>}
   */
  public populateAll() {
    this.setLimiter('populate', ALL_POPULANTS);
    return this;
  }

  /**
   * @public
   * @name setLimiter
   * @param {keyofIQueryLimiters} attr
   * @param {any} value
   * @returns {QueryDecorators<IEntity>}
   */
  public setLimiter(attr: keyof IQueryLimiters, value: any) {
    this._limiter[attr] = value;
    return this;
  }

  /**
   * @public
   * @name sort
   * @param {string | object[] | object} sort
   * @returns {QueryDecorators<IEntity>}
   */
  public sort(sort: string | object[] | object) {
    this.setLimiter('sort', sort);
    return this;
  }

  /**
   * @public
   * @name limit
   * @param {number} value
   * @returns {QueryDecorators<IEntity>}
   */
  public limit(value: number) {
    this.setLimiter('limit', value);
    return this;
  }

  /**
   * @public
   * @name skip
   * @param {number} value
   * @returns {QueryDecorators<IEntity>}
   */
  public skip(value: number) {
    this.setLimiter('skip', value);
    return this;
  }
  // getters
  protected get connector() {
    return this._model.connector;
  }

  protected get modelInstance() {
    return this._model.modelInstance;
  }

  protected get modelConfig() {
    return this._model.modelConfig;
  }

  protected get limiter() {
    return this._limiter;
  }

  protected get query() {
    return this._query;
  }
}

/**
 * @class
 * @name QueryStreamDecorator
 * @extends QueryDecorators
 * @description runs operations for stream style queries
 * @param {Model<T>} model
 * @param {any} query
 */
export class QueryStreamDecorators<T extends IEntity>
  extends QueryDecorators<T>
  implements IQueryStreamDecorators<T>
{
  private _batch: boolean = false;
  private _localBatchCallback: undefined | ((model: T[]) => any | Promise<any>);
  private _localEachCallback: undefined | ((model: T) => any | Promise<any>);
  public constructor(model: Model<T>, query: any) {
    super(model, query);
  }

  /**
   * @private
   * @name applyStreamCallback
   * @description managers the action for the fetch callback
   * @param {IEntity | IEntity[]} records
   * @returns {Promise<void> | void}
   */
  private async applyStreamCallback(records: IEntity | IEntity[]) {
    const isArray = Array.isArray(records);
    if (isArray && this._batch) {
      const boundFunction = this._localBatchCallback!.bind(this);
      const applied = (await this.modelInstance.applyMany(
        records as T[]
      )) as T[];
      return boundFunction(applied);
    } else if (!isArray && !this._batch) {
      const boundFunction = this._localEachCallback!.bind(this);
      const applied = (await this.modelInstance.applyOne(records as T)) as T;
      return boundFunction(applied);
    }
    throw new Error('There was an error processing the streamed query');
  }

  /**
   * @public
   * @name fetch
   * @description runs the query operations. It must be called to process
   *   the batch operation
   * @returns {Promise<any>}
   */
  public override async fetch() {
    if (!this._localBatchCallback && !this._localEachCallback) {
      throw new Error('A local callback must be defined');
    }
    const fnName = this._batch ? 'streamBatch' : 'streamEach';
    await this.connector[fnName](
      this.query,
      this.limiter,
      this.modelConfig,
      // [AS] we want to manipulate the data before it leaves the model
      // and send the details through our model instance object
      this.applyStreamCallback.bind(this)
    );
    return null as any;
  }

  /**
   * @public
   * @name fetchOne
   * @description used to override the fetchOne from QueryDecorators. It is not
   *  relevant for this operation
   * @throws Error
   * @returns {Promise<null>}
   */
  public override async fetchOne() {
    throw new Error(
      'This operation should not occur. Please use fetch or a find() operation with fetchOne'
    );
    return null as any;
  }

  /**
   * @public
   * @name eachRecord
   * @description runs a single record operation for streaming models
   * @param {function(models: T[]):Promise<any> | any} cb
   * @returns {QueryStreamDecorators<IEntity>}
   */
  public eachRecord(cb: (model: T) => any | Promise<any>) {
    this._localEachCallback = cb;
    return this;
  }

  /**
   * @public
   * @name eachBatch
   * @description runs a batch operation for streaming models
   * @param  {number} batchNumber
   * @param {function(models: T[]):Promise<any> | any} cb
   * @returns {QueryStreamDecorators<IEntity>}
   */
  public eachBatch(
    batchNumber: number,
    cb: (models: T[]) => Promise<any> | any
  ) {
    this._localBatchCallback = cb;
    this.limiter.batchNumber = batchNumber;
    this._batch = true;
    return this;
  }
}
