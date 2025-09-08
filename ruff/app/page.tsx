"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        Convex + Next.js + Clerk
        <UserButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Convex + Next.js + Clerk
        </h1>
        <Authenticated>
          <Content />
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInForm() {
  return (
    <div className="flex flex-col gap-8 w-96 mx-auto">
      <p>Log in to see the numbers</p>
      <SignInButton mode="modal">
        <button className="bg-foreground text-background px-4 py-2 rounded-md">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="bg-foreground text-background px-4 py-2 rounded-md">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}

function Content() {
  const user = useQuery(api.myFunctions.getCurrentUser);
  const ensureUser = useMutation(api.users.ensureCurrentUser);

  // Ensure user exists in database when component mounts
  useEffect(() => {
    ensureUser({}).catch((error) => {
      console.error("Failed to ensure user:", error);
    });
  }, [ensureUser]);

  if (user === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="mx-auto">
        <p>No user data found. Please try signing out and back in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        {user.imageUrl && (
          <Image
            src={user.imageUrl}
            alt="Profile"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
        )}
        <p className="text-lg">{user.name || "User"}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-xs text-gray-500 mt-2">
          Last seen: {new Date(user.lastSeen).toLocaleString()}
        </p>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <p className="text-sm">
          🎉 Your user account is successfully synced with Convex! You can now
          build features that require user authentication and data persistence.
        </p>
      </div>

      <p>
        Edit{" "}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          convex/myFunctions.ts
        </code>{" "}
        to add your own backend functions
      </p>
      <p>
        Edit{" "}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          app/page.tsx
        </code>{" "}
        to change your frontend
      </p>
      <p>
        See the{" "}
        <Link href="/server" className="underline hover:no-underline">
          /server route
        </Link>{" "}
        for an example of loading data in a server component
      </p>
      <div className="flex flex-col">
        <p className="text-lg font-bold">Useful resources:</p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Clerk docs"
              description="Learn about authentication, user management, and security best practices."
              href="https://clerk.com/docs"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks,
            and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-md h-28 overflow-auto">
      <a href={href} className="text-sm underline hover:no-underline">
        {title}
      </a>
      <p className="text-xs">{description}</p>
    </div>
  );
}
