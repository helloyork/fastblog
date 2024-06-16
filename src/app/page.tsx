"use client";

import {useTheme} from "@lib/ui/providers/theme-mode";
import clsx from "clsx";
import {applyColor, Color} from "@lib/utils/style";
import {ClientConfig} from "@lib/app/config/clientConfig";

export default function Home() {
    const {theme, setTheme} = useTheme();

    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <>
            <p className={clsx(applyColor(Color.APPLY_TYPE.TEXT, Color.COLOR_TYPE.PRIMARY))}>Hello World!</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <pre>{JSON.stringify(ClientConfig, null, 2)}</pre>
        </>
    );
}
