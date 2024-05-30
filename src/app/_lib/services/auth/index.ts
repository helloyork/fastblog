import "server-only";

import { BaseAuthProvider } from "./base";
import { CredentialAuthProvider } from "./providers/credential";
import { AuthProviderType, AuthService } from "./types";

let instance: null | AuthService.AuthProvider<AuthProviderType> = null;
export function launchService(
    name: AuthProviderType,
    config: AuthService.AuthServiceConfig[AuthProviderType]
): AuthService.AuthProvider<AuthProviderType> {
    if (instance) {
        return instance;
    }
    const providers: Record<AuthProviderType, new (config: any) => AuthService.AuthProvider<AuthProviderType>> = {
        [AuthProviderType.Base]: BaseAuthProvider,
        [AuthProviderType.Credential]: CredentialAuthProvider,
    }
    instance = new providers[name](config);
    return new providers[name](config);
}


