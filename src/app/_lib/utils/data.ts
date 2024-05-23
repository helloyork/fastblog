import * as dotenv from 'dotenv';


export function readFromEnv(file?: string): any {
    dotenv.config({ path: file });
    return process.env;
}

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * @param a user input
 * @param b default value
 */
export function assignConfig<T extends Record<string, any>>(a: DeepPartial<T>, b: T): T {
    let o: Record<string, any> = { ...b };
    Object.keys(a).forEach((key: string) => {
        if (typeof a[key] === "object" && a[key] !== null && !Array.isArray(a[key])) {
            o[key] = assignConfig(a[key] as Partial<Record<string, any>>, b[key] as Record<string, any>);
        } else {
            o[key] = a[key];
        }
    });
    return o as T;
}

