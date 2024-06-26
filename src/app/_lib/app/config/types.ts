
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
type FastBlogElement<T extends {}> = {
    settings: T;
}
type FastBlogConfig<
    T extends FastBlogConfigType = FastBlogConfigType,
> = {
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
            cookieStoreName: string;
            canRegister: boolean;
        }
    };
    metadata: Metadata;
}
type FastBlogRuntime = {
    services: {
        database: DatabaseService.Provider;
        env: EnvService.Provider;
        auth: AuthService.AuthProvider<AuthProviderType>;
    }
}

type FastBlogThemeColor = {
    primary: string;
    secondary: string;
    background: string;
    text: string;
};
type FastBlogClientConfig = {
    styles: {};
    elements: {
        NavBar: FastBlogElement<{
            items: {
                title: string;
                href: string;
            }[];
        }>;
    };
}

type UserFastBlogConfig<
    T extends Partial<FastBlogConfigType> = FastBlogConfigType,
    _T extends FastBlogConfigType = FastBlogConfigType & T,
> = DeepPartial<FastBlogConfig<_T>>;
type UserClientConfig = DeepPartial<FastBlogClientConfig>;

export type {
    FastBlogConfig,
    UserFastBlogConfig,
    FastBlogRuntime,
    FastBlogClientConfig,
    FastBlogThemeColor,
    UserClientConfig,
};
