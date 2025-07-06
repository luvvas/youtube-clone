// Inicializa o tRPC no backend.
// Define o contexto, o roteador base, e a função para criar novos procedimentos

import { db } from '@/db';
import { users } from '@/db/schema';
import { ratelimit } from '@/lib/ratelimit';
import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';
import superjson from 'superjson';

// Cria o contexto (por exemplo, dados do usuário logado) que estará disponível em todas as rotas do backend.
export const createTRPCContext = cache(async () => {
    const { userId } = await auth()

    return { clerkUserId: userId }
})

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Inicializa o tRPC com configurações opcionais (ex: superjson como transformer para serialização).
const t = initTRPC.context<Context>().create({
    transformer: superjson
})

// Cria o roteador base
export const createTRPCRouter = t.router;
// Para chamar os procedimentos programaticamente (por exemplo, em testes ou SSR)
export const createCallerFactory = t.createCallerFactory;
// Cria rotas (query, mutation, etc)
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
    const { ctx } = opts;

    if (!ctx.clerkUserId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, ctx.clerkUserId));

    if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const { success } = await ratelimit.limit(user.id)

    if (!success) {
        throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })
    }

    return opts.next({
        ctx: {
            ...ctx,
            user
        },
    });
});