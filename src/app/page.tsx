import { getSession } from "@/lib/auth/session";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="">
      <h1>aaa</h1>

      {/* Reads the session cookie, so it must sit inside a Suspense boundary. */}
      <Suspense fallback={null}>
        <AuthStatus />
      </Suspense>
    </div>
  );
}

async function AuthStatus() {
  const { isAuthenticated } = await getSession();

  return isAuthenticated ? (
    <div>You are logged in.</div>
  ) : (
    <div>You are logged out.</div>
  );
}
