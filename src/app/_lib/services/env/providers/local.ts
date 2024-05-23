import { BaseEnvProvider } from "../base";
import * as dotenv from "dotenv";

export class LocalEnvProvider extends BaseEnvProvider {
    map: Record<string, string>;
    constructor(options: {
        file?: string,
        dotenvOptions?: dotenv.DotenvConfigOptions,
        skipLoad?: boolean,
        map: Record<string, string>
    }) {
        super();
        if (options.skipLoad === false) {
            const configOptions = {
                path: options.file,
                override: true,
                ...options.dotenvOptions
            };
            dotenv.config(configOptions);
        }
        this.map = options.map;
    }
    get<T>(key: string): T | undefined {
        return process.env[key] as any;
    }
    set<T>(key: string, value: T): void {
        process.env[key] = value as any;
    }
    entries(): [string, unknown][] {
        let o: Record<string, unknown> = {};
        let fields = Object.keys(this.map);
        Object.entries(process.env)
            .filter(([key]) => fields.includes(key))
            .forEach(([key, value]) => o[this.map[key]] = value);
        return Object.entries(o);
    }
    keys(): string[] {
        return Object.keys(this.map);
    }
    values(): unknown[] {
        return this.keys().map(key => this.get(key));
    }
}



