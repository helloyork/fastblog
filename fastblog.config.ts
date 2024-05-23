import { DatabaseProviderType, EnvProviderType } from "@/app/_lib/services/services";
import { readFromEnv } from "@/app/_lib/utils/data";
import type { UserFastBlogConfig } from "@lib/app/config/types";

readFromEnv();

const config: UserFastBlogConfig<{
    database: DatabaseProviderType.Postgres;
    env: EnvProviderType.Local;
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