// Define um conjunto de rotas do tRPC

import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../init'

// Cria uma rota chamada hello que espera uma string como input e retorna um greeting.
// Tipagem automática com Zod + tRPC
export const appRouter = createTRPCRouter({
    hello: protectedProcedure.input(
        z.object({
            text: z.string(),
        }),
    ).query((opts) => {
        console.log({ dbUser: opts.ctx.user })

        return {
            greeting: `Hello ${opts.input.text}`,
        }
    })
})

// Exporta o tipo do roteador para o cliente poder saber quais rotas estão disponíveis com tipos corretos
export type AppRouter = typeof appRouter