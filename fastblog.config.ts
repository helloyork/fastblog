import { AuthProvierType, DatabaseProviderType, EnvProviderType } from "@lib/services/services";
import { readFromEnv } from "@lib/utils/data";
import type { UserFastBlogConfig } from "@lib/app/config/types";

readFromEnv();

const config: UserFastBlogConfig<{
    database: DatabaseProviderType.Postgres;
    env: EnvProviderType.Local;
    auth: AuthProvierType.Credential;
}> = {
    services: {
        database: {
            type: DatabaseProviderType.Postgres,
            config: {
                username: "postgres",
                database: "fastblog",
                host: "localhost",
                password: process.env.DATABASE_PWD
            }
        }
    }
};
export default config;