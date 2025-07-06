// Responsável por configurar e expor o cliente tRPC para o frontend.

'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import superjson from 'superjson';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';

// Cria uma instância de cliente tRPC com os tipos do backend (AppRouter).
// Permite você usar trpc.hello.useQuery(...), por exemplo, no frontend com inferência de tipos automática.
export const trpc = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient;

// Garante que no SSR (Server-Side Rendering) um novo QueryClient é criado para cada requisição.
// No navegador, mantém um único QueryClient em memória com padrão Singleton (melhora desempenho e evita duplicação de cache).
function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always make a new query client
        return makeQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= makeQueryClient());
}

// Define a URL base da API do tRPC
function getUrl() {
    const base = (() => {
        if (typeof window !== 'undefined') return '';
        if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
        return 'http://localhost:3000';
    })();
    return `${base}/api/trpc`;
}

// Fornece contexto do tRPC + React Query para o app.
// Deve ser usado no topo da árvore React (ex: app/layout.tsx no Next.js).
// Permite que o frontend use hooks como trpc.hello.useQuery(...) com cache e SSR funcionando corretamente.
export function TRPCProvider(
    props: Readonly<{
        children: React.ReactNode;
    }>,
) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    transformer: superjson,
                    url: getUrl(),
                }),
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}