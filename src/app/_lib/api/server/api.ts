import { AppConfig } from "../../app/config/appConfig";

export function prepare<T extends {}>(launcher: (appConfig: typeof AppConfig) => T): () => Promise<T> {
    let apis: null | T = null;
    return async function () {
        if (!apis) apis = await launcher(AppConfig);
        return apis;
    }
}

