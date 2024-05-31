import { AuthProviderType } from "./types";
import type { AuthService, FilteredUserData } from "./types";


export class BaseAuthProvider implements AuthService.AuthProvider<AuthProviderType.Base> {
    config: {};
    constructor(config: AuthService.AuthServiceConfig[AuthProviderType.Base]) {
        this.config = config;
    }
    login(config: {}): Promise<AuthService.AuthResponse<string>> {
        throw new Error("Method not implemented.");
    }
    auth(token: string): Promise<AuthService.AuthResponse<Partial<FilteredUserData>>> {
        throw new Error("Method not implemented.");
    }
    register(config: {}): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    expire(token: string): Promise<AuthService.AuthResponse<null>> {
        throw new Error("Method not implemented.");
    }
    resolve<T>(data: T): AuthService.AuthResponse<T> {
        return {
            status: "success",
            data: data,
        }
    }
    reject<T>(error: Error): AuthService.AuthResponse<T> {
        return {
            status: "error",
            error: error,
        }
    }
}

