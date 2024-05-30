import "server-only";

import { BaseDatabaseProvider } from "./base";
import { PostgresDatabaseProvider } from "./providers/postgres";
import { DatabaseService, DatabaseProviderType } from "./types";

let instance: null | DatabaseService.Provider = null;
export function launchService(
    name: DatabaseProviderType,
    config: DatabaseService.DatabaseConfig[DatabaseProviderType]
): DatabaseService.Provider {
    if (instance) {
        return instance;
    }
    const providers: Record<DatabaseProviderType, new (config: any) => DatabaseService.Provider> = {
        [DatabaseProviderType.Base]: BaseDatabaseProvider,
        [DatabaseProviderType.Postgres]: PostgresDatabaseProvider,
    }
    instance = new providers[name](config);
    return new providers[name](config);
}

