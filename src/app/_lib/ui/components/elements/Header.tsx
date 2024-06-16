"use client";

import NavBar from "@lib/ui/components/elements/NavBar";
import {Suspense} from "react";
import {usePathname} from "next/navigation";

export function Header() {
    return (
        <>
            <NavBar/>
        </>
    );
}