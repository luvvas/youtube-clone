// Inicializa o tRPC no backend.
// Define o contexto, o roteador base, e a função para criar novos procedimentos

import { initTRPC } from '@trpc/server';
import { cache } from 'react';

// Cria o contexto (por exemplo, dados do usuário logado) que estará disponível em todas as rotas do backend.
export const createTRPCContext = cache(() => {
    return { userId: 'user_123' };
})

// Inicializa o tRPC com configurações opcionais (ex: superjson como transformer para serialização).
const t = initTRPC.create({
    // transformer: superjson
})

// Cria o roteador base
export const createTRPCRouter = t.router;
// Para chamar os procedimentos programaticamente (por exemplo, em testes ou SSR)
export const createCallerFactory = t.createCallerFactory;
// Cria rotas (query, mutation, etc)
export const baseProcedure = t.procedure;