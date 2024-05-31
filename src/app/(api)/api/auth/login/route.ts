import { filterString } from "@lib/utils/data";
import { AppConfig } from "@lib/app/config/appConfig";
import { NextRequest } from "next/server";
import { z } from "zod";

const LoginPayloadSchema_Credential = z.object({
    username: z.string(),
    password: z.string(),
});
const LoginPayloadSchema_Base = z.object({
    username: z.string(),
});

const LoginPayloadSchema = z.union([
    LoginPayloadSchema_Credential,
    LoginPayloadSchema_Base
]);

export async function POST(request: NextRequest) {
    let body, payload;
    try {
        body = await request.json();
        payload = LoginPayloadSchema.parse(body);
    } catch (e) {
        return new Response("Invalid payload", { status: 400 });
    }

    const valid = await AppConfig.get().runtime.services.auth.login(payload);
    if (valid.status === "error") {
        return new Response(valid.error.message, { status: 400 });
    }

    return new Response("Success", {
        status: 200,
        headers: {
            "Set-Cookie": `${filterString(AppConfig.get().services.auth.cookieStoreName)}=${valid.data}; HttpOnly; Secure; SameSite=Strict; Path=/`,
        }
    });
}

