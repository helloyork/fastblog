
import { AuthProviderType } from "@lib/services/auth/types";

export enum ClientRequestMethod {
    GET = "GET",
    POST = "POST",
}

export namespace Endpoints {
    export type ClientResponse<T> = {
        status: "success";
        data: T;
    } | {
        status: "error";
        error: Error;
    }
    export type Auth = {
        login: {
            url: string;
            method: ClientRequestMethod.POST;
            request: {
                type: AuthProviderType
            },
            response: ClientResponse<unknown>;
        };
    };
    export type EndpointsType = Auth;
}

export async function requestEndpoint<T extends keyof Endpoints.EndpointsType>(
    endpoint: T,
    data: Endpoints.EndpointsType[T]["request"]
): Promise<Endpoints.EndpointsType[T]["response"]> {
    return {
        status: "error",
        error: new Error("Not implemented"),
    }
}

