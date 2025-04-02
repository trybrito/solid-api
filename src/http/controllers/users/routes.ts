import type { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { authenticate } from './authenticate-controller'
import { profile } from './profile-controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh-controller'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', register)
	app.post('/sessions', authenticate) // "Creating" a user session

	app.patch('/token/refresh', refresh)

	/* Access when authenticated */
	app.get('/me', { onRequest: [verifyJwt] }, profile)
}
