
enum AuthProvierType {
    Base = "base",
    Credential = "credential",
}

namespace AuthService {
    export type AuthConfig_Credential = {
        username: string;
        password: string;
    }
    export type AuthCred = {
        [AuthProvierType.Credential]: AuthConfig_Credential;
        [AuthProvierType.Base]: {};
    }
    export type AuthResponseTypes = {
        [AuthProvierType.Credential]: AuthResponse<string>;
        [AuthProvierType.Base]: AuthResponse<null>;
    }
    export type AuthServiceConfig = {
        [AuthProvierType.Credential]: {
            jwtSecret: string;
            secret: string;
            expire: number;
        };
        [AuthProvierType.Base]: {};
    }
    export type AuthResponse<T> = {
        status: "success";
        token: T;
    } | {
        status: "error";
        error: Error;
    }
    export interface AuthProvider<T extends AuthProvierType> {
        login(config: AuthCred[T]): Promise<AuthResponseTypes[T]>;
        auth(token: string): Promise<AuthResponse<null>>;
        expire(token: string): Promise<AuthResponse<null>>;
    }
}

export {
    AuthProvierType
}

export type {
    AuthService
}
