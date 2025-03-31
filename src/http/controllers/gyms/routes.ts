import { verifyJwt } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { search } from './search-controller'
import { fetchNearby } from './fetch-nearby-controller'
import { create } from './create-controller'

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('gyms/search', search)
	app.get('gyms/nearby', fetchNearby)
	app.post('gyms', create)
}
