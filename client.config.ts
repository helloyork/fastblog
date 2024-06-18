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
};

export default config;
