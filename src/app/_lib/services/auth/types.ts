
enum AuthProvierType {
    Base = "base",
    Credential = "credential",
}

type AuthSecretData = {
    password?: string;
} & Record<string, any>;

type FilteredUserData = {
    userId: number;
    username: string;
    profile: {
        name: string;
    };
    auth: {
        type: AuthProvierType;
        data: AuthSecretData;
    }[];
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

    export type AuthRegister_Credential = {
        username: string;
        password: string;
    }
    export type AuthRegister = {
        [AuthProvierType.Credential]: AuthRegister_Credential;
        [AuthProvierType.Base]: {};
    }

    export type AuthRegisterResult = {
        [AuthProvierType.Credential]: {
            user: Partial<FilteredUserData>;
        };
        [AuthProvierType.Base]: {};
    }

    export type AuthResponseTypes = {
        [AuthProvierType.Credential]: AuthResponse<string>;
        [AuthProvierType.Base]: AuthResponse<string>;
    }
    export type AuthServiceConfig = {
        [AuthProvierType.Credential]: {
            secret: string;
            expire: number;
        };
        [AuthProvierType.Base]: {
            expire: number;
        };
    }
    export type AuthResponse<T> = {
        status: "success";
        data: T;
    } | {
        status: "error";
        error: Error;
    }
    export interface AuthProvider<T extends AuthProvierType> {
        login(config: AuthCred[T]): Promise<AuthResponseTypes[T]>;
        register(config: AuthCred[T]): Promise<AuthRegisterResult[T]>;
        auth(token: string): Promise<AuthResponse<null>>;
        expire(token: string): Promise<AuthResponse<null>>;
    }
}

export {
    AuthProvierType
}

export type {
    AuthService,
    AuthSecretData
}
