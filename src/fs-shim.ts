// Minimal browser-safe shim for Node's fs/promises and fs modules.
// Provides no-op async functions to satisfy imports coming from server-side Amplify packages.
export async function readFile() {
  return "";
}

export async function writeFile() {
  return undefined;
}

export async function access() {
  return undefined;
}

export async function mkdir() {
  return undefined;
}

export async function stat() {
  return { isFile: () => false, isDirectory: () => false };
}

// Default export for default-import usage (import fs from "fs/promises").
export default {
  readFile,
  writeFile,
  access,
  mkdir,
  stat,
};

