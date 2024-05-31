import "server-only";

import { DeepPartial, assignConfig } from "@lib/utils/data";
import { FastBlogConfig, FastBlogRuntime } from "./types";

import { default as UserConfig } from "@root/fastblog.config";
import { DatabaseProviderType } from "@lib/services/database/types";
import { EnvProviderType } from "@lib/services/env/types";

import { launchService as EnvServiceLauncher } from "@lib/services/env/index";
import { launchService as DatabaseServiceLauncher } from "@lib/services/database/index";
import { launchService as AuthServiceLauncher } from "@lib/services/auth/index";
import { AuthProviderType } from "@lib/services/services";

const DefaultConfig: FastBlogConfig<{
    database: DatabaseProviderType.Postgres;
    env: EnvProviderType.Local;
    auth: AuthProviderType.Credential;
}> = {
    app: {
        metadata: {
            title: "FastBlog",
            description: "Fast and simple blog",
        },
        styles: {},
    },
    services: {
        database: {
            type: DatabaseProviderType.Postgres,
            config: {
                username: "postgres",
                database: "fastblog",
                host: "localhost",
            },
        },
        env: {
            type: EnvProviderType.Local,
            config: {
                map: {},
            }
        },
        auth: {
            type: AuthProviderType.Credential,
            config: {
                secret: "secret",
                expire: 7 * 24 * 60 * 60 * 1000,
            },
            cookieStoreName: "auth",
        }
    },
};


export const AppConfig = (function (userConfig: DeepPartial<FastBlogConfig>, defaultConfig: FastBlogConfig) {
    let _config: FastBlogConfig = assignConfig(userConfig, defaultConfig);
    let config: FastBlogConfig & {
        runtime: FastBlogRuntime;
    } = {
        ..._config,
        runtime: {
            services: {
                database: DatabaseServiceLauncher(_config.services.database.type, _config.services.database.config),
                env: EnvServiceLauncher(_config.services.env.type, _config.services.env.config),
                auth: AuthServiceLauncher(_config.services.auth.type, _config.services.auth.config),
            }
        }
    }

    return {
        get: () => config,
        set: (key: keyof FastBlogConfig, value: any) => config[key] = value,
        freeze: () => Object.freeze(
            Object.preventExtensions(
                Object.seal(
                    Object.assign({}, config)
                )
            )
        ),
    }
})(UserConfig, DefaultConfig);


