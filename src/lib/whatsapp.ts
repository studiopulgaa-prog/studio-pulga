import { sanitizeForWhatsApp } from './validation';
import type { LeadInput } from './validation';

export function buildWhatsAppUrl(lead: LeadInput): string {
  const destino = process.env.WHATSAPP_DESTINO;
  if (!destino || !/^\d{10,15}$/.test(destino)) {
    throw new Error('WHATSAPP_DESTINO ausente ou inválido');
  }

  const linhas = [
    `*Novo lead pelo site*`,
    `Nome: ${lead.nome}`,
    `Telefone: ${lead.telefone}`,
    `Instagram: @${lead.instagram}`,
    `Nicho: ${lead.nicho}`,
    `Região: ${lead.regiao}`,
  ];
  if (lead.mensagem) linhas.push(`Mensagem: ${lead.mensagem}`);

  const texto = sanitizeForWhatsApp(linhas.join('\n'));
  return `https://wa.me/${destino}?text=${encodeURIComponent(texto)}`;
}
