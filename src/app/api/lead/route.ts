import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { rateLimit, getClientIpFromHeaders } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIpFromHeaders(req.headers);
    const rl = rateLimit('lead', ip, 5, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Muitos envios. Tente em ${rl.resetIn}s.` },
        { status: 429 }
      );
    }

    const origin = req.headers.get('origin') || req.headers.get('referer') || '';
    const siteUrl = process.env.SITE_URL;
    if (siteUrl && origin && !origin.startsWith(siteUrl)) {
      return NextResponse.json({ error: 'Origem inválida' }, { status: 403 });
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type inválido' }, { status: 415 });
    }

    const raw = await req.text();
    if (raw.length > 5_000) {
      return NextResponse.json({ error: 'Payload muito grande' }, { status: 413 });
    }

    let json: unknown;
    try { json = JSON.parse(raw); }
    catch { return NextResponse.json({ error: 'JSON inválido' }, { status: 400 }); }

    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true, url: '' });
    }

    const url = buildWhatsAppUrl(parsed.data);
    return NextResponse.json({ ok: true, url });

  } catch (err) {
    console.error('[api/lead] erro:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
}
