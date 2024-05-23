import { DataTypes } from "sequelize";
import { prepare } from "./api";

export const getUserApi = prepare(async (appConfig) => {
    let table = await appConfig.get().runtime.services.database.getTable("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    });
});

