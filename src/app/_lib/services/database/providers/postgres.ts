import { FindOptions, ModelAttributeColumnOptions, ModelStatic, Sequelize, WhereOptions } from "sequelize";
import { Model } from "sequelize"
import { BaseDatabaseProvider, BaseTable } from "../base";
import { DatabaseService, DatabaseProviderType } from "../types";
import pg from "pg";

type SequelizeModelStructure = DatabaseService.TableStructure;

class PostgresTable<T extends {}> extends BaseTable<T> {
    provider: PostgresDatabaseProvider;
    model: ModelStatic<Model<T>>;
    constructor(provider: PostgresDatabaseProvider, name: string, model: SequelizeModelStructure) {
        super(provider, name);
        this.provider = provider;
        this.model = this.createModel(this.toStructure(model));
    }
    find(query: DatabaseService.Query<T>): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T[]>>> {
        return this.rejectIfError(async () => {
            return (await this.model.findAll(this.toFindOptions(query)))
                .map(m => m.get());
        });
    }
    findOne(query: DatabaseService.Query<T>): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T>>> {
        return this.rejectIfError(async () => {
            return await this.model.findOne(this.toFindOptions(query));
        });
    }
    has(query: DatabaseService.Query<T>): Promise<DatabaseService.QueryResponse<boolean>> {
        return this.rejectIfError(async () => {
            return !!(await this.model.findOne(this.toFindOptions(query)));
        });
    }
    insert(data: T): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T>>> {
        return this.rejectIfError(async () => {
            let res = await this.model.create(data as any);
            return res
        });
    }
    set(query: DatabaseService.Query<T>, data: T): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T>>> {
        return this.rejectIfError(async () => {
            let models = await this.model.findAll(this.toFindOptions(query));
            return await Promise.all(models.map(async (model) => {
                await model.update(data as any);
                return model;
            }));
        });
    }
    update(query: DatabaseService.Query<T>, handler: (data: T) => T | Promise<T>): Promise<DatabaseService.QueryResponse<DatabaseService.AliveData<T>>> {
        return this.rejectIfError(async () => {
            let models = await this.model.findAll(this.toFindOptions(query));
            return await Promise.all(models.map(async (model) => {
                let data = await handler(model.get() as any);
                await model.update(data as any);
                return model;
            }));
        });
    }
    delete(query: DatabaseService.Query<T>): Promise<DatabaseService.QueryResponse<null>> {
        return this.rejectIfError(async () => {
            let models = await this.model.findAll(this.toFindOptions(query));
            return await Promise.all(models.map(async (model) => {
                await model.destroy();
                return null;
            }));
        });
    }
    reject(error: Error | string): DatabaseService.QueryResponse<never, "error"> {
        return {
            status: "error",
            error: error instanceof Error ? error : new Error(error),
            data: undefined,
        }
    }
    resolve<T>(data: T): DatabaseService.QueryResponse<T, "success"> {
        return {
            status: "success",
            data,
            error: undefined,
        }
    }
    async rejectIfError<T>(cb: () => Promise<any>): Promise<DatabaseService.QueryResponse<T>> {
        try {
            let res = await cb();
            return this.resolve(res);
        } catch (e) {
            console.log(e)
            return this.reject(e instanceof Error ? e : new Error(
                typeof e === "string" ? e : String(e)
            ));
        }
    }
    toFindOptions(query: DatabaseService.Query<T>): FindOptions<T> {
        return {
            where: {
                ...(query.byFields || {}),
                ...(query.byJSON || {}),
            },
            limit: query.limit,
            offset: query.offset,
        }
    }
    toStructure(
        data: SequelizeModelStructure
    ): Record<string, ModelAttributeColumnOptions<Model<any, any>>> {
        const outputForPostgres: Record<string, ModelAttributeColumnOptions> = {};
        for (const key in data) {
            const value = data[key];
            outputForPostgres[key] = {
                type: value.type,
                unique: value.unique,
                primaryKey: value.primaryKey,
                allowNull: !value.required,
                defaultValue: value.defaultValue,
                autoIncrement: value.autoIncrement,
                validate: {
                    isValid(_value: unknown): boolean {
                        if (typeof value.validate !== "object" || value.validate === null || typeof (value.validate.validator) !== "function") return true;
                        if (value.validate.validator(_value) === false) throw new Error("Validation failed")
                        return true;
                    }
                }
            };
        }
        return outputForPostgres;
    }
    createModel(structure: Record<string, ModelAttributeColumnOptions>): ModelStatic<Model<T>> {
        return this.provider.sequelize!.define(this.name, structure, {
            tableName: this.name,
        });
    }
}

export class PostgresDatabaseProvider extends BaseDatabaseProvider {
    providerName: DatabaseProviderType = DatabaseProviderType.Postgres;
    sequelize: Sequelize | null = null;
    config: DatabaseService.DatabaseConfig[DatabaseProviderType.Postgres];
    tables: Record<string, PostgresTable<any>> = {};
    constructor(config: DatabaseService.DatabaseConfig[DatabaseProviderType.Postgres]) {
        super(config);
        this.config = config;
    }
    async connect(): Promise<DatabaseService.ServiceResponse<void>> {
        return await this.rejectIfError<void>(async () => {
            if (this.sequelize !== null) return this.resolve(void 0);
            if (this.config.url) {
                this.sequelize = new Sequelize(this.config.url);
            } else {
                this.sequelize = new Sequelize(this.config.database,
                    this.config.username,
                    this.config.password,
                    {
                        host: this.config.host,
                        port: Number(this.config.port),
                        dialect: "postgres",
                        dialectModule: pg,
                    });
            }
            return this.resolve(void 0);
        });
    }
    async close(): Promise<void> {
        if (this.sequelize) {
            await this.sequelize.close();
        }
    }
    async getTable<T extends {}>(name: string, model: SequelizeModelStructure): Promise<DatabaseService.Table<T>> {
        if (!this.sequelize) await this.connect();
        if (this.tables[name]) return this.tables[name];
        let m = new PostgresTable<T>(this, name, model);
        await this.sequelize!.sync({
            alter: true,
        });
        this.tables[name] = m;
        return m;
    }
    hello(): Promise<DatabaseService.ServiceResponse<void>> {
        return this.rejectIfError(async () => {
            if (!this.sequelize) await this.connect();
            if (!this.sequelize) throw new Error("Sequelize not initialized[0]: " + this.sequelize);
            return this.resolve(await this.sequelize.authenticate());
        });
    }
    resolve<T>(data: T): DatabaseService.ServiceResponse<T> {
        return {
            status: "success",
            data,
        }
    }
    reject(error: Error | string): DatabaseService.ServiceResponse<never> {
        return {
            status: "error",
            error: error instanceof Error ? error : new Error(error),
        }
    }
    async rejectIfError<T>(cb: () => Promise<DatabaseService.ServiceResponse<T>>): Promise<DatabaseService.ServiceResponse<T>> {
        try {
            let res = await cb();
            return res;
        } catch (e) {
            console.error(e);
            return this.reject(e instanceof Error ? e : new Error(
                typeof e === "string" ? e : String(e)
            ));
        }
    }
}
