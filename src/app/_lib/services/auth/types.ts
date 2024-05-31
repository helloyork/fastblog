
enum AuthProviderType {
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
        type: AuthProviderType;
        data: AuthSecretData;
    }[];
}

namespace AuthService {
    export type AuthConfig_Credential = {
        username: string;
        password: string;
    }
    export type AuthCred = {
        [AuthProviderType.Credential]: AuthConfig_Credential;
        [AuthProviderType.Base]: {};
    }

    export type AuthRegister_Credential = {
        username: string;
        password: string;
    }
    export type AuthRegister = {
        [AuthProviderType.Credential]: AuthRegister_Credential;
        [AuthProviderType.Base]: {};
    }

    export type AuthRegisterResult = {
        [AuthProviderType.Credential]: {
            user: Partial<FilteredUserData>;
        };
        [AuthProviderType.Base]: {};
    }

    export type AuthResponseTypes = {
        [AuthProviderType.Credential]: AuthResponse<string>;
        [AuthProviderType.Base]: AuthResponse<string>;
    }
    export type AuthServiceConfig = {
        [AuthProviderType.Credential]: {
            secret: string;
            expire: number;
        };
        [AuthProviderType.Base]: {
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
    export interface AuthProvider<T extends AuthProviderType> {
        login(config: AuthCred[T]): Promise<AuthResponseTypes[T]>;
        register(config: AuthCred[T]): Promise<AuthRegisterResult[T]>;
        auth(token: string): Promise<AuthResponse<Partial<FilteredUserData>>>;
        expire(token: string): Promise<AuthResponse<null>>;
    }
}

export {
    AuthProviderType
}

export type {
    AuthService,
    AuthSecretData,
    FilteredUserData
}
