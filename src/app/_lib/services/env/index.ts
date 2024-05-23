import { LocalEnvProvider } from "./providers/local";
import { EnvProviderType } from "./types";
import type { EnvService } from "./types";

let instance: null | EnvService.Provider = null;
export function launchService(
    name: string,
    config: any
): EnvService.Provider {
    if (instance) {
        return instance;
    }
    const providers: Record<string, new (...args: any[]) => EnvService.Provider> = {
        [EnvProviderType.Local]: LocalEnvProvider,
    };
    instance = new providers[name](config);
    return new providers[name](config);
}
