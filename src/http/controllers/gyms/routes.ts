import { verifyJwt } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { search } from './search-controller'
import { create } from './create-controller'
import { nearby } from './nearby-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
	app.get('/gyms/search', search)
	app.get('/gyms/nearby', nearby)
}
