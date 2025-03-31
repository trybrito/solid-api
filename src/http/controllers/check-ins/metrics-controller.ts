import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, res: FastifyReply) {
	const userId = req.user.sub

	const userMetricsService = makeGetUserMetricsService()

	const { checkInsCount } = await userMetricsService.execute({
		userId,
	})

	return res.send({ checkInsCount })
}
