import { getAuthApi } from "@lib/api/server/auth";
import { UserData, getUserApi } from "@lib/api/server/user";

import { BaseAuthProvider } from "../base";
import { AuthProviderType, AuthService } from "../types";
import { compareHash, generateToken } from "@lib/crypt/crypt";
import { AppConfig } from "@/app/_lib/app/config/appConfig";
import { filter } from "@/app/_lib/utils/data";

// @TODO: Implement CredentialAuthProvider

const AllowedFields: (keyof UserData)[] = ["userId", "username", "profile", "auth"];

export class CredentialAuthProvider extends BaseAuthProvider {
    constructor(config: AuthService.AuthServiceConfig[AuthProviderType.Credential]) {
        super(config);
        this.config = config;
    }
    async login(config: AuthService.AuthConfig_Credential): Promise<AuthService.AuthResponse<string>> {
        let [authApi, userApi] = await Promise.all([getAuthApi(), getUserApi()]);

        try {
            let user = await userApi.getUserByUsername(config.username);
            if (user.status === "error") throw user.error;
            if (!user.data) throw new Error("Username or password is incorrect");

            let credMethod = user.data.auth.find((a) => a.type === AuthProviderType.Credential);
            if (!credMethod) throw new Error("Username or password is incorrect");

            let compared = await compareHash(config.password, credMethod.data.password || "");
            if (!compared) throw new Error("Username or password is incorrect");

            let token = await generateToken();
            let saved = await authApi.addToken(user.data.userId!, AuthProviderType.Credential, {
                ["credential"]: token,
            });
            if (saved.status === "error") throw saved.error;
            return {
                status: "success",
                data: token,
            }
        } catch (e) {
            return {
                status: "error",
                error: e instanceof Error ? e : new Error(String(e)),
            }
        }
    }
    async auth(token: string): Promise<AuthService.AuthResponse<null>> {
        let [authApi, userApi] = await Promise.all([getAuthApi(), getUserApi()]);

        try {
            let auth = await authApi.getByPath("token.credential", token);
            if (auth.status === "error") throw auth.error;
            if (!auth.data) throw new Error("Invalid token");

            let user = await userApi.getUserById(auth.data.ownerid);
            if (user.status === "error") throw user.error;
            if (!user.data) throw new Error("Invalid token");

            if (auth.data.stamp + AppConfig.get().services.auth.config.expire > Date.now()) {
                await authApi.removeToken("token.credential", token);
                throw new Error("Token expired");
            }

            return {
                status: "success",
                data: null,
            }
        } catch (e) {
            return {
                status: "error",
                error: e instanceof Error ? e : new Error(String(e)),
            }
        }
    }
    async register(
        config: AuthService.AuthRegister_Credential
    ): Promise<AuthService.AuthResponse<AuthService.AuthRegisterResult["credential"]>> {
        let userApi = await getUserApi();

        try {
            let user = await userApi.addUser({
                username: config.username,
                profile: {
                    name: config.username,
                },
                auth: [{
                    type: AuthProviderType.Credential,
                    data: {
                        password: config.password,
                    },
                }],
            });
            if (user.status === "error") throw user.error;

            let token = await this.login({
                username: config.username,
                password: config.password,
            });
            if (token.status === "error") throw token.error;

            return {
                status: "success",
                data: {
                    user: filter(AllowedFields, user.data!),
                }
            }
        } catch (e) {
            return {
                status: "error",
                error: e instanceof Error ? e : new Error(String(e)),
            }
        }
    }
    async expire(token: string): Promise<AuthService.AuthResponse<null>> {
        let [authApi] = await Promise.all([getAuthApi()]);

        try {
            let authResult = await this.auth(token);
            if (authResult.status === "error") throw authResult.error;

            await authApi.removeToken("token.credential", token);
            return {
                status: "success",
                data: null,
            }
        } catch (e) {
            return {
                status: "error",
                error: e instanceof Error ? e : new Error(String(e)),
            }
        }
    }
}
