"use client";

import { Button } from '@/components/ui/button';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { UserCircleIcon } from 'lucide-react';

export const AuthButton = () => {
    // TODO: Add different auth states

    return (
        <>
            <SignedIn>
                <UserButton />
                {/* TODO: Add menu items for Studio and User Profile */}
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button
                        variant="outline"
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/2 rounded-full shadow-none"
                    >
                        <UserCircleIcon />
                        Sign in
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    );
}