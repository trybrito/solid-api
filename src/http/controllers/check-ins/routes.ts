import { verifyJwt } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { create } from './create-controller'
import { metrics } from './metrics-controller'
import { history } from './history-controller'
import { validate } from './validate-controller'
export async function checkInsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/check-ins/history', history)
	app.get('/check-ins/metrics', metrics)

	app.post('/gyms/:gymId/check-ins', create)
	app.patch('/check-ins/:checkInId/validate', validate)
}
