import { AuthProviderType, DatabaseProviderType, EnvProviderType } from "@lib/services/services";
import type { UserFastBlogConfig } from "@lib/app/config/types";

const config: UserFastBlogConfig<{
    database: DatabaseProviderType.Postgres;
    auth: AuthProviderType.Credential;
}> = {
    services: {
        database: {
            type: DatabaseProviderType.Postgres,
            config: {
                username: process.env.DATABASE_USERNAME,
                database: process.env.DATABASE_DBNAME,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                password: process.env.DATABASE_PWD
            }
        }
    },
    app: {
        metadata: {
            title: {
                default: "FastBlog",
                template: "FastBlog | %s"
            },
            description: "Fast and simple blog"
        }
    },
};
export default config;