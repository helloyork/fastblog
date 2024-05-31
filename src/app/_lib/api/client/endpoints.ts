
import { AuthProviderType, FilteredUserData } from "@lib/services/auth/types";

export enum ClientRequestMethod {
    GET = "GET",
    POST = "POST",
}

export enum EndpointUrls {
    AUTH_LOGIN = "/api/auth/login",
    AUTH_AUTH = "/api/auth/auth",
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
            url: EndpointUrls.AUTH_LOGIN;
            method: ClientRequestMethod.POST;
            request: {
                type: AuthProviderType,
                payload: Record<string, string>,
            },
            response: ClientResponse<string>;
        };
        auth: {
            url: EndpointUrls.AUTH_AUTH;
            method: ClientRequestMethod.POST;
            request: {},
            response: ClientResponse<Partial<FilteredUserData>>;
        };
    };
    export type EndpointsType = Auth;
}

export async function requestEndpoint<T extends keyof Endpoints.EndpointsType>(
    endpoint: { url: string, method: ClientRequestMethod },
    data: Endpoints.EndpointsType[T]["request"],
    headers?: Record<string, string>
): Promise<Endpoints.EndpointsType[T]["response"]> {
    if (!window) {
        throw new Error("window is not defined");
    }
    return fetch(endpoint.url, {
        method: endpoint.method,
        headers: {
            "Content-Type": "application/json",
            "credentials": "include",
            ...(headers || {})
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return {
                status: "success",
                data: await response.json(),
            };
        } else {
            return {
                status: "error",
                error: new Error(response.statusText),
            };
        }
    })
}

