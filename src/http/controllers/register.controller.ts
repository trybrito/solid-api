import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { name, email, password } = registerBodySchema.parse(req.body)

	const userWithSameEmail = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (userWithSameEmail) {
		return res.status(409).send() // Conflict
	}

	const password_hash = await hash(password, 6)

	await prisma.user.create({
		data: {
			name,
			email,
			password_hash,
		},
	})

	return res.status(201).send()
}
