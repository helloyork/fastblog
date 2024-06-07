import { AppConfig } from "@lib/app/config/appConfig";

export async function GET() {
    return new Response(JSON.stringify(await AppConfig.get().runtime.services.database.hello()));
}

