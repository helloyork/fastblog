import { AppConfig } from "@lib/app/config/appConfig";
import { filterString } from "@lib/utils/data";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response("Invalid payload", { status: 400 });
    }

    if (!AppConfig.get().services.auth.canRegister) {
        return new Response("Unable to register", { status: 400 });
    }

    const result = await AppConfig.get().runtime.services.auth.register(body);
    if (result.status === "error") {
        return new Response(result.error.message, { status: (result.error.cause as undefined | number) || 400 });
    }

    return new Response(JSON.stringify({
        user: result.data.user,
    }), {
        headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `${filterString(AppConfig.get().services.auth.cookieStoreName)}=${result.data.token}; HttpOnly; Secure; SameSite=Strict; Path=/`,
        },
    });
}
