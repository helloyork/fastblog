import "server-only";

import { DataTypes } from "sequelize";
import { ServerApiResponse, prepare } from "./api";
import { AuthProviderType, DatabaseService } from "@lib/services/services";

type AuthTableTypes = {
    id?: string;
    ownerid: number;
    type: AuthProviderType;
    token: Record<string, any>;
    stamp: Date;
    expireAt: number;
}
export const getAuthApi = prepare<{
    getByToken: (token: AuthTableTypes["token"]) => Promise<ServerApiResponse<AuthTableTypes>>;
    getByPath: (path: string, value: any) => Promise<ServerApiResponse<AuthTableTypes>>;
    getByOwner: (ownerid: AuthTableTypes["ownerid"]) => Promise<ServerApiResponse<AuthTableTypes[]>>;
    addToken: (ownerid: AuthTableTypes["ownerid"], type: AuthTableTypes["type"], token: AuthTableTypes["token"], expireAt?: number) => Promise<ServerApiResponse<AuthTableTypes>>;
    removeToken: (path: string, token: any) => Promise<DatabaseService.QueryResponse<null>>;
}>(async (appConfig) => {
    let table = await appConfig.get().runtime.services.database.getTable<AuthTableTypes>("auths", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        ownerid: {
            type: DataTypes.INTEGER,
            required: true,
        },
        type: {
            type: DataTypes.STRING,
            required: true,
        },
        token: {
            type: DataTypes.JSONB,
        },
        stamp: {
            type: DataTypes.DATE,
        },
        expireAt: {
            type: DataTypes.INTEGER,
        },
    });
    return {
        getByToken: async (token: AuthTableTypes["token"]) => {
            let res = await table.findOne({
                byFields: {
                    token,
                }
            });
            return res;
        },
        getByOwner: async (ownerid: AuthTableTypes["ownerid"]) => {
            let res = await table.find({
                byFields: {
                    ownerid,
                }
            });
            return res;
        },
        getByPath: async (path: string, value: any) => {
            let res = await table.findOne({
                byJSON: {
                    [path]: value,
                }
            });
            return res;
        },
        addToken: async (ownerid: AuthTableTypes["ownerid"], type: AuthTableTypes["type"], token: AuthTableTypes["token"], expireAt?: number) => {
            let res = await table.insert({
                ownerid,
                type,
                token,
                stamp: new Date(),
                expireAt: expireAt || Date.now() + appConfig.get().services.auth.config.expire,
            });
            return res;
        },
        removeToken: async (path: string, token: AuthTableTypes["token"]) => {
            let res = await table.delete({
                byJSON: {
                    [path]: token,
                }
            });
            return res;
        },
    }
});

