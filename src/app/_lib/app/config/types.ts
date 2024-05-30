
import type { Metadata } from "next";
import { DeepPartial } from "@lib/utils/data";

import { DatabaseService, DatabaseProviderType } from "@lib/services/database/types";
import { EnvService, EnvProviderType } from "@lib/services/env/types";
import { AuthProviderType, AuthService } from "@lib/services/services";

type FastBlogConfigType = {
    database: DatabaseProviderType;
    env: EnvProviderType;
    auth: AuthProviderType;
}
type FastBlogConfig<
    T extends FastBlogConfigType = FastBlogConfigType,
> = {
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
        auth: {
            type: T["auth"];
            config: AuthService.AuthServiceConfig[T["auth"]];
        }
    };
}
type FastBlogRuntime = {
    services: {
        database: DatabaseService.Provider;
        env: EnvService.Provider;
        auth: AuthService.AuthProvider<AuthProviderType>;
    }
}

type UserFastBlogConfig<
    T extends Partial<FastBlogConfigType> = FastBlogConfigType,
    _T extends FastBlogConfigType = T & FastBlogConfigType,
> = DeepPartial<FastBlogConfig<_T>>;

export type {
    FastBlogConfig,
    UserFastBlogConfig,
    FastBlogRuntime
};
