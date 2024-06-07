import { filterString } from "@lib/utils/data";
import { AppConfig } from "@lib/app/config/appConfig";
import { NextRequest } from "next/server";
import { string, z } from "zod";
import { AuthProviderType } from "@lib/services/services";

const LoginRequestSchema = z.object({
    type: z.enum(Object.values(AuthProviderType) as unknown as Readonly<[string, ...string[]]>),
    payload: z.record(z.string()),
    remember: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
    let body, payload;
    try {
        body = await request.json();
        payload = LoginRequestSchema.parse(body).payload;
    } catch (e) {
        return new Response("Invalid payload", { status: 400 });
    }

    const valid = await AppConfig.get().runtime.services.auth.login({
        ...payload,
        remember: !!body.remember,
    });
    if (valid.status === "error") {
        return new Response(valid.error.message, { status: 401 });
    }

    return new Response("Success", {
        status: 200,
        headers: {
            "Set-Cookie": `${filterString(AppConfig.get().services.auth.cookieStoreName)}=${valid.data}; HttpOnly; Secure; SameSite=Strict; Path=/`,
        }
    });
}

