import { filterString } from "@lib/utils/data";
import { AppConfig } from "@lib/app/config/appConfig";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const token = request.cookies.get(AppConfig.get().services.auth.cookieStoreName)?.value;

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }
    const authResult = await AppConfig.get().runtime.services.auth.auth(token);
    if (!authResult || authResult.status === "error") {
        return new Response("Unauthorized", { status: 401 });
    }

    await AppConfig.get().runtime.services.auth.expire(token);

    return new Response("Success", {
        status: 200,
        headers: {
            "Set-Cookie": `${filterString(AppConfig.get().services.auth.cookieStoreName)}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
        }
    });
}

