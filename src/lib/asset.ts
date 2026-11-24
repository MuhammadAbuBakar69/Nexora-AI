// Prefixes root-absolute asset paths with the deployment base path so the same
// build works at the domain root and under a subpath such as /Nexora-AI.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
