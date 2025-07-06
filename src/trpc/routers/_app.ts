import { categoriesRouter } from '@/modules/categories/server/procedures'
import { createTRPCRouter } from '../init'

// Tipagem automática com Zod + tRPC
export const appRouter = createTRPCRouter({
    categories: categoriesRouter
})

// Exporta o tipo do roteador para o cliente poder saber quais rotas estão disponíveis com tipos corretos
export type AppRouter = typeof appRouter