"use server";

// Mock auth actions. TODO(backend): replace with Logto signIn/signOut
// (@logto/next/server-actions) once the Logto config is ported.

export async function handleSignIn() {
  console.info("[mock] handleSignIn called — auth is not wired up yet.");
}

export async function handleSignOut() {
  console.info("[mock] handleSignOut called — auth is not wired up yet.");
}
