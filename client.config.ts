import {UserClientConfig} from "@lib/app/config/types";

const config: UserClientConfig = {
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
            title: {
                default: "FastBlog",
                template: "FastBlog - %s"
            },
            description: "Fast and simple blog"
        }
    }
};

export default config;
