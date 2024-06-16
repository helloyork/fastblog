"use client";

import clsx from "clsx";
import {useTheme} from "@lib/ui/providers/theme-mode";
import {Header} from "@lib/ui/components/elements/Header";

export default function Main({
                                 children
                             }: {
    children: React.ReactNode
}) {
    const {theme} = useTheme();
    return (
        <>
            <Header/>
            <main className={clsx("h-full min-h-screen text-foreground bg-background", theme)}>
                {children}
            </main>
        </>
    )
};


