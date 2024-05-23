import { BaseAuthProvider } from "./base";
import { CredentialAuthProvider } from "./providers/credential";
import { AuthProvierType, AuthService } from "./types";

let instance: null | AuthService.AuthProvider<AuthProvierType> = null;
export function launchService(
    name: AuthProvierType,
    config: AuthService.AuthServiceConfig[AuthProvierType]
): AuthService.AuthProvider<AuthProvierType> {
    if (instance) {
        return instance;
    }
    const providers: Record<AuthProvierType, new (config: any) => AuthService.AuthProvider<AuthProvierType>> = {
        [AuthProvierType.Base]: BaseAuthProvider,
        [AuthProvierType.Credential]: CredentialAuthProvider,
    }
    instance = new providers[name](config);
    return new providers[name](config);
}


