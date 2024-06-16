"use client";

import { default as UserClientConfig } from "@root/client.config";
import {FastBlogClientConfig} from "@lib/app/config/types";
import {assignConfig} from "@lib/utils/data";

const DefaultClientConfig: FastBlogClientConfig = {
    styles: {},
    colors: {
        light: {
            primary: "#3d5abb",
            secondary: "#4b79a1",
            background: "#fff",
            text: "#000"
        },
        dark: {
            primary: "#3d5abb",
            secondary: "#4b79a1",
            background: "#000",
            text: "#fff"
        }
    },
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
    let _config = assignConfig(userConfig, defaultConfig);
    return _config;
})(DefaultClientConfig, UserClientConfig);
