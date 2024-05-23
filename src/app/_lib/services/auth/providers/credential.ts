import { BaseAuthProvider } from "../base";
import { AuthProvierType, AuthService } from "../types";

// @TODO: Implement CredentialAuthProvider

export class CredentialAuthProvider extends BaseAuthProvider {
    constructor(config: AuthService.AuthServiceConfig[AuthProvierType.Credential]) {
        super(config);
        this.config = config;
    }
}
