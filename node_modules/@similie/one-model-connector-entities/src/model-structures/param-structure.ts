/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEntity,
  LiveConnectionConstruct,
  IModelCollection,
  IModelConfigurationDetails,
  IModelAttributes,
} from '../entities';

import { getId } from '../utils';

/**
 * @class
 * @name CollectionIdentifier
 * @description provides the configuration details
 *  required by the connector to run the collection-based
 *  functions
 * @param {string} name
 * @param {string} collection
 * @param {T | number} instance
 * @param {string} model
 */
export class CollectionIdentifier<T> {
  private _name: string; // files
  private _collection: string; // sysfiles
  private _instance: number; // parent id,
  private _model: string; // purchaseorder
  public constructor(
    name: string,
    collection: string,
    instance: T | number,
    model: string
  ) {
    this._name = name;
    this._collection = collection;
    this._instance = getId(instance) || -1;
    this._model = model;
  }
  public get model() {
    return this._model;
  }
  public get name() {
    return this._name;
  }
  public get collection() {
    return this._collection;
  }
  public get instance() {
    return this._instance;
  }
}

/**
 * @class
 * @name ModelCollection
 * @extends Array
 * @description Allows us to apply functionality to collection
 *  attributes that behave as arrays
 * @param {CollectionIdentifier<T>} identity
 * @param {LiveConnectionConstruct} connector
 */
export class ModelCollection<T extends IEntity>
  extends Array<T>
  implements IModelCollection<T>
{
  // [AS] hides properties from console.log
  #_identity: CollectionIdentifier<T>;
  #_connector: LiveConnectionConstruct;
  public constructor(
    identity: CollectionIdentifier<T>,
    connector: LiveConnectionConstruct
  ) {
    super();
    this.#_identity = identity;
    this.#_connector = connector;
  }
  public get model() {
    return this.#_identity.model;
  }
  public get name() {
    return this.#_identity.name;
  }
  public get collection() {
    return this.#_identity.collection;
  }
  public get instance() {
    return this.#_identity.instance;
  }
  /**
   * @public
   * @name addToCollection
   * @description adds and entity or id to a collection. It's function is
   *   controlled by the connector
   * @param {number | IEntity} value
   * @returns {Promise<void>}
   */
  public async addToCollection(value: number | IEntity): Promise<void> {
    return await this.#_connector.addToCollection(value, this);
  }
  /**
   * @public
   * @name removeFromCollection
   * @description removes and entity or id to a collection. It's function is
   *   controlled by the connector
   * @param {number | IEntity} value
   * @returns {Promise<void>}
   */
  public async removeFromCollection(value: number | IEntity): Promise<void> {
    return await this.#_connector.removeFromCollection(value, this);
  }
}

/**
 * @class
 * @name ModelInstance
 * @description when we get a raw model from the there is
 *  a specfic functionality we want to apply to these models.
 *  the most obvious use case is the operations on collection
 *  attributes. We can also are stringified JSON and any
 *  additional operations required by the application
 * @param {LiveConnectionConstruct} connector
 * @param {IModelConfigurationDetails} modelConfig
 */
export class ModelInstance<T extends IEntity> {
  private connector: LiveConnectionConstruct;
  private _modelConfig: IModelConfigurationDetails;
  private types = {
    collection: 'collection',
    json: 'json',
  };
  // we instantiate with the LiveConnection and
  // the configuration details
  public constructor(
    connector: LiveConnectionConstruct,
    modelConfig: IModelConfigurationDetails
  ) {
    this.connector = connector;
    this._modelConfig = modelConfig;
  }

  public get modelConfig() {
    return this._modelConfig;
  }

  /**
   * @public
   * @name attrs
   * @description retrieves the attributes for that model
   *    from the connector
   * @returns {Record<string, IModelAttributes>}
   */
  public attrs() {
    return this.connector.attr(this.modelConfig);
  }

  /**
   * @public
   * @description retrieves the list of keys for a given model
   * @returns {string[]}
   */
  public getKeys() {
    return this.connector.keys(this.modelConfig);
  }
  /**
   * @public
   * @name applyOne
   * @param {IEntity} model - the raw model
   * @returns {Promise<ModelInstanceIdentity<IEntity>>}
   */
  public applyOne(model: T): Promise<ModelInstanceIdentity<T> | null> {
    return this.applyRegistration(model);
  }
  /**
   * @public
   * @name applyMany
   * @param {IEntity[]} models - the raw models
   * @returns {Promise<ModelInstanceIdentity<IEntity[]>>}
   */
  public async applyMany(models: T[]): Promise<ModelInstanceIdentity<T[]>> {
    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      if (!model) {
        continue;
      }
      await this.applyOne(model);
    }
    return models;
  }

  /**
   * @private
   * @name isType
   * @description Checks the type param to see if we have
   *   a specific type
   * @param {IModelAttributes} attr the param getting checked
   * @param {string} type
   * @returns {boolean} true if type matches
   */
  private isType(attr: IModelAttributes = {}, type: string) {
    return attr.type === type;
  }

  /**
   * @private
   * @name containsKey
   * @description we are searching for a specific key value in the
   *   attribute
   * @param {IModelAttributes | string} attr
   * @param {string} key
   * @returns {boolean} true if it contains the second key param
   */
  private containsKey(attr: IModelAttributes | string, key: string) {
    // sometimes in waterline, 0.1x you can define an attribute as "param": 'string'
    if (typeof attr === 'string') {
      return attr === key;
    }
    // default to false
    const hasNot = false;
    const keys = Object.keys(attr);
    for (let i = 0; i < keys.length; i++) {
      const _key = keys[i];
      if (_key === key) {
        // we have a true, just return
        return true;
      }
    }
    return hasNot;
  }

  /**
   * @private
   * @name buildCollection
   * @description builds those paramters that are defined as a collection
   *   with the Model collection object
   * @param {IEntity} model
   * @param {string} key
   * @param {IModelAttributes} attr
   * @returns {void}
   */
  private buildCollection(model: T, key: string, attr: IModelAttributes) {
    const _k: keyof T = <keyof T>key;
    const value = model[_k] as unknown;
    const arr = (value as T[]) || new Array<T>();
    const clone: T[] = [...arr];
    const modelName = this.modelConfig.modelname || '';
    const identity = new CollectionIdentifier<T>(
      key,
      attr.collection || '',
      model,
      modelName
    );
    const c = new ModelCollection<T>(identity, this.connector);
    c.push(...clone);
    // set the model with the new collection
    model[_k] = c as any;
  }

  /**
   * @private
   * @name isValidJson
   * @description checks to see of a json specific model is valid JSON
   * @param {any} model
   * @returns {boolean} - if the json is valid
   */
  private isValidJson(model: any) {
    return !model || model instanceof Array || model instanceof Object;
  }

  /**
   * @private
   * @name startsAndEndsWith
   * @description we want to see if a string looks like json. It should either
   *   start and end with {} or [].
   * @param  {string} value the values to check
   * @param {string} chars comma delineated start and end characters, length 3
   * @returns {boolean} - if the string is valid
   */
  private startsAndEndsWith(value: string, chars: string) {
    const split = chars.split(',');
    return value.startsWith(split[0] || '') && value.endsWith(split[1] || '');
  }

  /**
   * @private
   * @name isStringJson
   * @description is our JSON a string?
   * @param {any} model we are trying to see if the value is a string
   * @returns {boolean} - true if it is a stringified json object
   */
  private isStringJson(model: any) {
    return (
      typeof model === 'string' &&
      (this.startsAndEndsWith(model as string, '[,]') ||
        this.startsAndEndsWith(model as string, '{,}'))
    );
  }

  /**
   * @private
   * @name parseJSONString
   * @description simply parses a JSON string
   * @param {string} json - string value but any to make
   *   the interpreter happy
   * @returns {object}
   */
  private parseJSONString(json: any) {
    return JSON.parse(json);
  }

  /**
   * @private
   * @name ensureIsValidJSON
   * @description we want to make sure our params designated as JSON
   *   or array are not stringified
   * @param {IEntity} model
   * @param {string} key the key of the parameter
   * @returns {void}
   */
  private ensureIsValidJSON(model: T, key: string) {
    const _k: keyof T = <keyof T>key;
    const value = model[_k];
    if (this.isValidJson(value)) {
      return;
    }
    if (!this.isStringJson(value)) {
      return;
    }
    model[_k] = this.parseJSONString(value);
  }

  /**
   * @private
   * @name applyRegistration
   * @description iterates through all the param values and checks to
   *   make sure they are in the correct form from the database. Additionally,
   *   we can add decorators to specific params such as collections.
   * @param {IEntity} model
   * @returns {ModelInstanceIdentity<T>}
   */
  private async applyRegistration(
    model: T | null
  ): Promise<ModelInstanceIdentity<T> | null> {
    if (!model) {
      return null;
    }

    const attrs: Record<string, IModelAttributes> = await this.attrs();
    for (const k in attrs) {
      const attr = attrs[k];
      if (!attr) {
        continue;
      }
      if (this.containsKey(attr, this.types.collection)) {
        this.buildCollection(model, k, attr);
      } else if (this.isType(attr, this.types.json)) {
        this.ensureIsValidJSON(model, k);
      }
    }
    // we simply instantiate this incase we want to
    // add functionality to the base model. For now
    // we just copy the values.
    return new ModelInstanceIdentity<T>(model);
  }
}

/**
 * @class
 * @name ModelInstanceIdentity
 * @description a class to wrap a bare model entity.
 *   for now it acts like a noop wrapper.
 */
export class ModelInstanceIdentity<T> {
  public constructor(model: T) {
    Object.assign(this, model);
  }
}
