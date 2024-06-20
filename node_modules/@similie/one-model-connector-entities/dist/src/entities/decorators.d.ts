import { IModelEntity } from "./base-entity";
export interface IQueryFetch<T extends IModelEntity> {
    fetch: () => Promise<T>;
}
export interface IQueryPopulates<T extends IModelEntity> {
    populate: (value: string) => IQueryFetch<T>;
    populateAll: () => IQueryFetch<T>;
    fetch: () => Promise<T>;
}
export interface IQueryDecorators<T extends IModelEntity> {
    sort: (sort: string | object[] | object) => IQueryDecorators<T>;
    skip: (value: number) => IQueryDecorators<T>;
    limit: (value: number) => IQueryDecorators<T>;
    populateAll: () => IQueryDecorators<T>;
    populate: (value: string) => IQueryDecorators<T>;
    fetch: () => Promise<T[]>;
    fetchOne: () => Promise<T>;
}
