import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  WHATSAPP_DESTINO: z
    .string()
    .regex(/^\d{10,15}$/, 'WHATSAPP_DESTINO deve ter só dígitos'),
  SITE_URL: z.string().url().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente inválidas:');
  for (const issue of parsed.error.issues) {
    console.error(`   - ${issue.path.join('.')}: ${issue.message}`);
  }
  throw new Error('Configuração de ambiente inválida');
}

export const env = parsed.data;
