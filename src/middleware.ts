import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 60;

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_HITS;
}

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ');

function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('Content-Security-Policy', CSP);
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.headers.delete('x-powered-by');
  return res;
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Muitas requisições. Aguarde um momento.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
