import { AuthProviderType, DatabaseProviderType, EnvProviderType } from "@lib/services/services";
import { readFromEnv } from "@lib/utils/data";
import type { UserFastBlogConfig } from "@lib/app/config/types";

const config: UserFastBlogConfig<{
    database: DatabaseProviderType.Postgres;
    auth: AuthProviderType.Credential;
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