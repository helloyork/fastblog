import { AuthProvierType } from "./types";
import type { AuthService } from "./types";


export class BaseAuthProvider implements AuthService.AuthProvider<AuthProvierType.Base> {
    config: {};
    constructor(config: AuthService.AuthServiceConfig[AuthProvierType.Base]) {
        this.config = config;
    }
    login(config: {}): Promise<AuthService.AuthResponse<string>> {
        throw new Error("Method not implemented.");
    }
    auth(token: string): Promise<AuthService.AuthResponse<null>> {
        throw new Error("Method not implemented.");
    }
    register(config: {}): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    expire(token: string): Promise<AuthService.AuthResponse<null>> {
        throw new Error("Method not implemented.");
    }
}

