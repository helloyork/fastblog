import { DataTypes } from "sequelize";
import { AppConfig } from "../_lib/app/config/appConfig";

export default async function Page() {
    await AppConfig.get().runtime.services.database.connect();
    console.log(await AppConfig.get().runtime.services.database.hello());
    console.log(await AppConfig.get().runtime.services.database.getTable("test", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    }));
    return (<></>)
};

