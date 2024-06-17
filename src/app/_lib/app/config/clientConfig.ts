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
    app: {
        metadata: {
            title: "FastBlog",
            description: "Fast and simple blog",
        },
    },
}

export const ClientConfig = (function (defaultConfig, userConfig) {
    return assignConfig(userConfig, defaultConfig);
})(DefaultClientConfig, UserClientConfig);
