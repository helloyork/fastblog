import type { EnvService } from "./types";

export class BaseEnvProvider implements EnvService.Provider {
    get<T>(key: string): T | undefined {
        throw new Error("Method not implemented.");
    }
    set<T>(key: string, value: T): void {
        throw new Error("Method not implemented.");
    }
    entries(): [string, unknown][] {
        throw new Error("Method not implemented.");
    }
    keys(): string[] {
        throw new Error("Method not implemented.");
    }
    values(): unknown[] {
        throw new Error("Method not implemented.");
    }
}

