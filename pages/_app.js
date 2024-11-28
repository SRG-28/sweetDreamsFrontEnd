"use client"; // Asegura que este archivo sea un Client Component

import { SessionProvider } from "next-auth/react";

export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
