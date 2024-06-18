"use client";

import {default as UserClientConfig} from "@root/client.config";
import {FastBlogClientConfig} from "@lib/app/config/types";
import {assignConfig} from "@lib/utils/data";

const DefaultClientConfig: FastBlogClientConfig = {
    styles: {},
    elements: {
        NavBar: {
            settings: {
                items: [
                    {
                        title: "Home",
                        href: "/"
                    },
                    {
                        title: "About",
                        href: "/about"
                    }
                ]
            }
        }
    },
}

export const ClientConfig = (function (defaultConfig, userConfig) {
    let config = assignConfig<FastBlogClientConfig>(userConfig, defaultConfig);
    return {
        get: () => config,
        set: (key: keyof FastBlogClientConfig, value: any) => config[key] = value,
        freeze: () => Object.freeze(
            Object.preventExtensions(
                Object.seal(
                    Object.assign({}, config)
                )
            )
        ),
    }
})(DefaultClientConfig, UserClientConfig);
