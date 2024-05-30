import { DataTypes } from "sequelize";
import { ServerApiResponse, prepare } from "./api";

import zod from "zod";
import { AuthProviderType, DatabaseService } from "@lib/services/services";
import { AuthSecretData } from "@lib/services/auth/types";

type UserProfile = {
    name?: string;
}
const UserProfileSchema = zod.object({
    name: zod.string().optional(),
});

type UserAuth = {
    type: AuthProviderType,
    data: AuthSecretData
}
const UserAuthSchema = zod.object({
    type: zod.string(),
    data: zod.object({
        password: zod.string().optional(),
    }),
});

export type UserData = {
    userId?: number;
    username: string;
    profile: UserProfile;
    auth: UserAuth[];
}
const UserDataSchema = zod.object({
    username: zod.string(),
    profile: UserProfileSchema,
    auth: zod.array(UserAuthSchema),
});


export const getUserApi = prepare<{
    getUserById: (userId: number) => Promise<ServerApiResponse<UserData>>;
    getUserByUsername: (username: string) => Promise<ServerApiResponse<UserData>>;
    addUser: (userData: UserData) => Promise<ServerApiResponse<UserData>>;
}>(async (appConfig) => {
    let table = await appConfig.get().runtime.services.database.getTable<UserData>("users", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
        },
        profile: {
            type: DataTypes.JSONB,
            validate: {
                validator(value) {
                    return UserProfileSchema.safeParse(value).success;  
                },
            }
        },
        auth: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            validate: {
                validator(value) {
                    return UserDataSchema.safeParse(value).success;
                },
            }
        },
    });
    return {
        async getUserById(userId: number) {
            let res = await table.findOne({
                byFields: {
                    userId,
                }
            });
            return res;
        },
        async getUserByUsername(username: string) {
            let res = await table.findOne({
                byFields: {
                    username,
                }
            });
            return res;
        },
        async addUser(userData) {
            if (!UserDataSchema.safeParse(userData).success) {
                return {
                    status: "error",
                    error: new Error("Invalid data"),
                } as ServerApiResponse<UserData>;
            }
            return table.insert(userData);
        },
    }
});

