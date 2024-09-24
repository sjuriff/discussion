'use client'
import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"

/*
There are many components in nextui that require state to function correctly.
All the state at the intersection of the application is handled by the react context.
NextUIProvider shares the state among all nextui components you use
We wrap Providers around the children in the layout.tsx file.
It becomes a kind of context for all nextui components.
Context wrapper
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