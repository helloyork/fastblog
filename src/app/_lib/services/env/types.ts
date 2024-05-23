import type * as dotenv from 'dotenv';  


enum EnvProviderType {
    Local = 'local',
}

namespace EnvService {
    export interface Provider {
        get<T>(key: string): T | undefined;
        set<T>(key: string, value: T): void;
        entries(): [string, unknown][];
        keys(): string[];
        values(): unknown[];
    }
    type EnvConfig_Local = {
        file?: string;
        dotenvOptions?: dotenv.DotenvConfigOptions;
        skipLoad?: boolean;
        map: Record<string, string>;
    }
    export type EnvConfig = {
        [EnvProviderType.Local]: EnvConfig_Local;
    };
}

export type {
    EnvService,
}
export {
    EnvProviderType,
}

