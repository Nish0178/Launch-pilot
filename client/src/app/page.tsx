import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Launch Pilot AI 🚀
      </h1>

      <Show when="signed-out">
        <div className="flex gap-4">
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-black text-white rounded">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </Show>

      <Show when="signed-in">
        <div className="flex flex-col items-center gap-4">
          <Link href="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded font-medium">
            Go to Dashboard
          </Link>
          <UserButton />
        </div>
      </Show>
    </main>
  );
}