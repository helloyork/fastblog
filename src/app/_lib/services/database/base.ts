import { DatabaseService, DatabaseProviderType } from "./types";

export class BaseTable<T> implements DatabaseService.Table<T> {
    provider: DatabaseService.Provider;
    name: string;
    constructor(provider: DatabaseService.Provider, name: string) {
        this.provider = provider;
        this.name = name;
    }
    find(query: DatabaseService.Query): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T[]>>> {
        throw new Error("Method not implemented.");
    }
    findOne(query: DatabaseService.Query): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T>>> {
        throw new Error("Method not implemented.");
    }
    has(query: DatabaseService.Query): Promise<DatabaseService.QueryResponse<boolean>> {
        throw new Error("Method not implemented.");
    }
    insert(data: T): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T>>> {
        throw new Error("Method not implemented.");
    }
    set(query: DatabaseService.Query, data: T): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T>>> {
        throw new Error("Method not implemented.");
    }
    update(query: DatabaseService.Query, handler: (data: T) => T | Promise<T>): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T>>> {
        throw new Error("Method not implemented.");
    }
    delete(query: DatabaseService.Query): Promise<DatabaseService.QueryResponse<null>> {
        throw new Error("Method not implemented.");
    }
}

export class BaseDatabaseProvider implements DatabaseService.Provider {
    providerName: DatabaseProviderType = DatabaseProviderType.Base;
    config: DatabaseService.DatabaseConfig[DatabaseProviderType.Base];
    constructor(config: DatabaseService.DatabaseConfig[DatabaseProviderType.Base]) {
        this.config = config;
    }
    async connect(): Promise<DatabaseService.ServiceResponse<void>> {
        throw new Error("Method not implemented.");
    }
    async close(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getTable<T extends {}>(name: string, model: DatabaseService.TableStructure): Promise<DatabaseService.Table<T>> {
        throw new Error("Method not implemented.");
    }
    async hello(): Promise<DatabaseService.ServiceResponse<void>> {
        throw new Error("Method not implemented.");
    }
}

