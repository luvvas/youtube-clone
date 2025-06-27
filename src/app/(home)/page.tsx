'use client'

import { trpc } from "@/trpc/client"

export default function Home() {
    const { data } = trpc.hello.useQuery({
        text: 'Lucas'
    })

    return (
        <div>
            Cliente component says: {data?.greeting}
        </div>
    )
}