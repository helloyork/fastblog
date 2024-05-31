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

    return new Response(JSON.stringify(authResult.data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

