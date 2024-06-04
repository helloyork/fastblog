import "server-only";

import { AppConfig } from "@lib/app/config/appConfig";
import { DatabaseService } from "@lib/services/services";

export function prepare<T extends {}>(launcher: (appConfig: typeof AppConfig) => T | Promise<T>): () => Promise<T> {
    let apis: null | T = null;
    return async function () {
        if (!apis) apis = await launcher(AppConfig);
        return apis;
    }
}

export type ServerApiResponse<T> = DatabaseService.QueryResponse<DatabaseService.AliveData<T>>;

