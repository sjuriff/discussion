'use client'
import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"

/*
Det er mange kompnenter i nextui som krever state for å fingere riktig.
All staten på kryss av applikasjonen blir håndtert av react context.
NextUIProvider deler staten blant alle nextui komponenter du bruker
Vi wrapper Providers rundt barna i layout.tsx filen.
Det blir en slags kontext for alle nextui komponenter.
Kontextwrapper
 */

interface ProvidersProps{
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </SessionProvider>
    )
}