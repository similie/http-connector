/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEntity,
  IModelCollection,
  IQueryLimiters,
  LiveConnectionConstruct,
  IModelConfigurationDetails,
  IQueryOrPartial,
  IEntityPartial,
  IValuesToEscape,
} from '../entities';

import { GlobalConnection } from '../global-connect';
import { getId } from '../utils';

export class LiveConnectConfig implements IModelConfigurationDetails {
  private _name: string;
  public constructor() {
    this._name = '';
  }
  public get modelname(): string {
    return this._name;
  }

  public set modelname(modelname) {
    this._name = modelname;
  }
}

/**
 * @class
 * @name LiveConnection
 *
 * @description The purpose of live connect is so that a single class
 * can manage the start instance. Also, the child classes can safely
 * choose to NOT implement certain functions such as init or teardown
 * if they are not required. Additionally, for future functionality
 * we can use this class to implement parent logic that all the child classes
 * can extend without changing the structure of the child class. Finally,
 * to create a new connector, you simply copy this class and populate the
 * public functions with the desired logic
 */
export abstract class LiveConnection implements LiveConnectionConstruct {
  public constructor(global?: boolean) {
    if (global === GlobalConnection.SET_GLOBAL) {
      GlobalConnection.startInstance(this);
    }
  }

  public getId(query: number | any | undefined | null) {
    return getId(query);
  }

  public async init() {
    return null;
  }

  public get modelConfig() {
    return new LiveConnectConfig();
  }

  public raw(config?: IModelConfigurationDetails) {
    !!config;
    throw new Error('NOT IMPLEMENTED');
  }

  public find(
    query: any,
    limiters: IQueryLimiters,
    config?: IModelConfigurationDetails
  ) {
    !{ query, limiters, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public findOne(
    query: any,
    limiters: IQueryLimiters,
    config?: IModelConfigurationDetails
  ) {
    !{ query, limiters, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async save(values: any, config?: IModelConfigurationDetails) {
    !{ values, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async update(
    query: any,
    update: any,
    config?: IModelConfigurationDetails
  ) {
    !{ query, update, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async count(query: any, config?: IModelConfigurationDetails) {
    !{ query, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async destroy(query: any, config?: IModelConfigurationDetails) {
    !{ query, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async create(query: any, config?: IModelConfigurationDetails) {
    !{ query, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async createMany(query: any[], config?: IModelConfigurationDetails) {
    !{ query, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async destroyAll(query: any, config?: IModelConfigurationDetails) {
    !{ query, config };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async addToCollection(
    value: any,
    collection: IModelCollection<IEntity>
  ): Promise<void> {
    !{ value, collection };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public async removeFromCollection(
    value: any,
    collection: IModelCollection<IEntity>
  ): Promise<void> {
    !{ value, collection };
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public attr(config?: IModelConfigurationDetails) {
    !!config;
    throw new Error('NOT IMPLEMENTED');
    return null as any;
  }

  public keys(config?: IModelConfigurationDetails) {
    !config;
    throw new Error('NOT IMPLEMENTED');
    return new Array<string>();
  }

  public async sum(
    numericAttrName: keyof IEntity,
    criteria?: IQueryOrPartial<IEntity>,
    config?: IModelConfigurationDetails
  ) {
    throw new Error('NOT IMPLEMENTED');
    return { numericAttrName, criteria, config } as any;
  }

  public async avg(
    numericAttrName: keyof IEntity,
    criteria?: IQueryOrPartial<IEntity>,
    config?: IModelConfigurationDetails
  ) {
    throw new Error('NOT IMPLEMENTED');
    return { numericAttrName, criteria, config } as any;
  }

  public async findOrCreate(
    criteria: IQueryOrPartial<IEntity>,
    initialsValues: IEntityPartial<IEntity>,
    config?: IModelConfigurationDetails
  ) {
    throw new Error('NOT IMPLEMENTED');
    return { initialsValues, criteria, config } as any;
  }

  public async streamEach(
    query: IQueryOrPartial<IEntity>,
    limiters: IQueryLimiters,
    config: IModelConfigurationDetails,
    cb: (model: IEntity) => Promise<void> | void
  ) {
    throw new Error('NOT IMPLEMENTED');
    return { query, limiters, config, cb } as any;
  }

  public async streamBatch(
    query: IQueryOrPartial<IEntity>,
    limiters: IQueryLimiters,
    config: IModelConfigurationDetails,
    cb: (model: IEntity[]) => Promise<void> | void
  ) {
    throw new Error('NOT IMPLEMENTED');
    return { query, limiters, config, cb } as any;
  }

  public async tearDown() {
    throw new Error('NOT IMPLEMENTED');
  }

  public async query(
    query: string,
    valuesToEscape?: IValuesToEscape,
    config?: IModelConfigurationDetails
  ) {
    throw new Error('NOT IMPLEMENTED');
    return { query, valuesToEscape, config } as any;
  }
}
