import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string().url(),
	JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.log('⚠ Invalid environment variables', _env.error.format())
	throw new Error()
}

export const env = _env.data
