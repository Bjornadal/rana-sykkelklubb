/**
 * Prefix an internal path with the configured base URL.
 * Handles both "/" and "/rana-sykkelklubb/" style bases.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
