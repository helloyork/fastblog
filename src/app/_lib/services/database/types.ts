import { DataTypes } from "sequelize";

enum DatabaseProviderType {
    Base = "base",
    Postgres = "postgres",
}

namespace DatabaseService {
    export type FilterConfig<T = Record<string, any>> = {
        byFields?: Partial<T>;
        byJSON?: { [key: string]: any };
    }
    export type QueryConfig = {
        limit?: number;
        offset?: number;
    }
    export type Query<FilterType> = FilterConfig<FilterType> & QueryConfig;

    export type QueryStatus = "success" | "error";
    export type QueryResponse<T, Status extends QueryStatus | undefined = undefined> =
        Status extends undefined ? ({
            status: "error";
            error: Error;
        } | {
            status: "success";
            data: T;
        }) : {
            status: Status;
            data: Status extends "success" ? T : undefined;
            error: Status extends "error" ? Error : undefined;
        }
    export type AliveData<T> = T & {
    }
    export type DatabaseConfig_Postgres = {
        username: string;
        database: string;
        host: string;
        password?: string;
        port?: number | string;
        url?: string;
    }
    export type DatabaseConfig = {
        [DatabaseProviderType.Postgres]: DatabaseConfig_Postgres;
        [DatabaseProviderType.Base]: {};
    }
    export type ServiceResponse<T> = {
        status: "success";
        data: T;
    } | {
        status: "error";
        error: Error;
    }
    export interface Table<T> {
        find(query: Query<T>): Promise<QueryResponse<AliveData<T[]>>>;
        findOne(query: Query<T>): Promise<QueryResponse<AliveData<T>>>;
        has(query: Query<T>): Promise<QueryResponse<boolean>>;
        insert(data: T): Promise<QueryResponse<AliveData<T>>>;
        set(query: Query<T>, data: T): Promise<QueryResponse<AliveData<T>>>;
        update(query: Query<T>, handler: (data: T) => T | Promise<T>): Promise<QueryResponse<AliveData<T>>>;
        delete(query: Query<T>): Promise<QueryResponse<null>>;
    }

    export type TableStructure = {
        [key: string]: {
            type: DataTypes.DataType;
            primaryKey?: boolean;
            unique?: boolean;
            required?: boolean;
            defaultValue?: any;
            autoIncrement?: boolean;
            validate?: {
                validator: (value: unknown) => boolean;
            }
        }
    }
    export interface Provider {
        providerName: DatabaseProviderType;
        connect(): Promise<ServiceResponse<void>>;
        close(): Promise<void>;
        getTable<T extends {}>(name: string, structure: TableStructure): Table<T> | Promise<Table<T>>;
        hello(): Promise<ServiceResponse<void>>;
    }
}

export type {
    DatabaseService,
}

export {
    DatabaseProviderType,
}


