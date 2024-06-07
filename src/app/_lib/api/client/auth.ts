import {
    ClientRequestMethod,
    EndpointUrls,
    Endpoints,
    requestEndpoint
} from "./endpoints";

export const login = (data: Endpoints.Auth["login"]["request"]) =>
    requestEndpoint<"login">({
        url: EndpointUrls.AUTH_LOGIN,
        method: ClientRequestMethod.POST,
    }, data);

export const auth = (data: Endpoints.Auth["auth"]["request"]) =>
    requestEndpoint<"auth">({
        url: EndpointUrls.AUTH_AUTH,
        method: ClientRequestMethod.POST,
    }, data);

export const logout = () =>
    requestEndpoint<"logout">({
        url: EndpointUrls.AUTH_LOGOUT,
        method: ClientRequestMethod.POST,
    }, void 0);
