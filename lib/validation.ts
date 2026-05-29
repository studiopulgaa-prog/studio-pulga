import { z } from 'zod';

const phoneSchema = z
  .string()
  .min(8).max(20)
  .transform((v) => v.replace(/\D/g, ''))
  .refine((v) => v.length >= 10 && v.length <= 13, { message: 'Telefone inválido' });

const instagramSchema = z
  .string()
  .min(1).max(31)
  .transform((v) => v.trim().replace(/^@/, ''))
  .refine((v) => /^[a-zA-Z0-9._]+$/.test(v), { message: 'Instagram inválido' });

const nomeSchema = z
  .string()
  .min(2).max(80)
  .transform((v) => v.trim().replace(/\s+/g, ' '))
  .refine((v) => !/[\x00-\x1F\x7F]/.test(v), { message: 'Nome inválido' });

export const NICHOS_VALIDOS = [
  'estetica', 'odontologia', 'fitness', 'moda', 'gastronomia', 'outro',
] as const;

export const REGIOES_VALIDAS = [
  'norte', 'nordeste', 'centro-oeste', 'sudeste', 'sul',
] as const;

export const leadSchema = z.object({
  nome: nomeSchema,
  telefone: phoneSchema,
  instagram: instagramSchema,
  nicho: z.enum(NICHOS_VALIDOS),
  regiao: z.enum(REGIOES_VALIDAS),
  mensagem: z.string().max(500).optional().transform((v) => (v ? v.trim() : '')),
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function sanitizeForWhatsApp(text: string): string {
  return text.replace(/[\x00-\x1F\x7F]/g, '').slice(0, 1000);
}
