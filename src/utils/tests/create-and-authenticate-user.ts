import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
	app: FastifyInstance,
	isAdmin = false,
) {
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456789', 6),
			role: isAdmin ? 'ADMIN' : 'MEMBER',
		},
	})

	const authResponse = await request(app.server).post('/sessions').send({
		email: 'johndoe@example.com',
		password: '123456789',
	})

	const { token } = authResponse.body

	return { token }
}
