import { IEntity } from '../entities';
import { IQueryOrPartial, ISingleQueryObject } from './queries';
import { ISharedDataConnects } from './shared';
/**
 * @interface ModelApi
 * @implements Connector
 *
 * @description Expands the Connector class with the model class. Allowing for property
 * differentiation for models
 */
export interface IModelConnect<T extends IEntity> extends ISharedDataConnects<T> {
    getId: (query: number | T | undefined | null) => number | undefined;
    find: (query: IQueryOrPartial<T>) => IQueryDecorators<T>;
    initWithId: (id: number) => IQueryPopulates<T>;
    stream: (query: any) => IQueryStreamDecorators<T>;
    toJson: (model: T) => Promise<any>;
}
/**
 * @inteface
 * @name IQueryLimiters
 * @description Used to pass query context to the connector
 */
export interface IQueryLimiters {
    sort?: any;
    skip?: number;
    limit?: number;
    batchNumber?: number;
    populate?: Record<string, ISingleQueryObject<any> | undefined>;
}
/**
 * @interface
 * @name IQueryFetch<IEntity>
 * @description when we want just the fetch details from
 *   the model query
 */
export interface IQueryFetch<T extends IEntity> {
    fetch: () => Promise<T>;
}
/**
 * @interface
 * @name IQueryPopulates<IEntity>
 * @description used when a populate event occurs for single initWithId()
 *   queries will perform.
 */
export interface IQueryPopulates<T extends IEntity> {
    populate: (value: string, criteria?: ISingleQueryObject<any>) => IQueryFetch<T>;
    populateAll: () => IQueryFetch<T>;
    fetch: () => Promise<T>;
}
/**
 * @interface
 * @name IQueryDecorator<IEntity>
 * @description provides the structure for how a find() query might perform
 */
export interface IQueryDecorators<T extends IEntity> {
    sort: (sort: string | object[] | object) => IQueryDecorators<T>;
    skip: (value: number) => IQueryDecorators<T>;
    limit: (value: number) => IQueryDecorators<T>;
    populateAll: () => IQueryDecorators<T>;
    populate: (value: string, criteria?: ISingleQueryObject<any>) => IQueryDecorators<T>;
    fetch: () => Promise<T[]>;
    fetchOne: () => Promise<T>;
}
/**
 * @interface IQueryStreamDecorators<IEntity>
 * @extends IQueryDecorators<IEntity>
 * @description offers us similar functionality to the IQueryDecorators
 *   but addes the functionality for streaming data.
 */
export interface IQueryStreamDecorators<T extends IEntity> extends IQueryDecorators<T> {
    eachRecord: (cb: (model: T) => Promise<any> | any) => IQueryStreamDecorators<T>;
    eachBatch: (batchNumber: number, cb: (model: T[]) => Promise<any> | any) => IQueryStreamDecorators<T>;
}
