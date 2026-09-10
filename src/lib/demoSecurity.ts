export function isAllowedDemoUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;

  try {
    const parsed = new URL(url);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }

    const allowedDomains = (process.env.NEXT_PUBLIC_ALLOWED_DEMO_DOMAINS ?? "localhost,127.0.0.1")
      .split(",")
      .map((domain) => domain.trim().toLowerCase().replace(/^www\./, ""))
      .filter(Boolean);

    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, "");

    return allowedDomains.some((domain) => {
      return hostname === domain || hostname.endsWith(`.${domain}`);
    });
  } catch {
    return false;
  }
}
