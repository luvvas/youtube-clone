"use client"

import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react"
import Link from "next/link"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"

const items = [
    {
        title: "History",
        url: "/playlist/history",
        icon: HistoryIcon,
        auth: true
    },
    {
        title: "Liked video",
        url: "/playlist/liked",
        icon: ThumbsUpIcon,
        auth: true
    },
    {
        title: "All playlists",
        url: "/playlist",
        icon: ListVideoIcon,
    }
]

export const PersonalSection = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={false} // TODO: Change to look at current pathname
                                onClick={() => { }} // TODO: Do something on click
                            >
                                <Link href={item.url}>
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}