
import type { Metadata } from "next";
import { DeepPartial } from "@lib/utils/data";

import { DatabaseService, DatabaseProviderType } from "@lib/services/database/types";
import { EnvService, EnvProviderType } from "@lib/services/env/types";

type FastBlogConfigType = {
    database: DatabaseProviderType;
    env: EnvProviderType;
}
type FastBlogConfig<T extends FastBlogConfigType = FastBlogConfigType> = {
    app: {
        metadata: Metadata;
        styles: {};
    };
    services: {
        database: {
            type: T["database"];
            config: DatabaseService.DatabaseConfig[T["database"]];
        },
        env: {
            type: T["env"];
            config: EnvService.EnvConfig[T["env"]];
        },
    };
}
type FastBlogRuntime = {
    services:{
        database: DatabaseService.Provider;
        env: EnvService.Provider;
    }
}

type UserFastBlogConfig<T extends FastBlogConfigType = FastBlogConfigType> = DeepPartial<FastBlogConfig<T>>;

export type {
    FastBlogConfig,
    UserFastBlogConfig,
    FastBlogRuntime
};
