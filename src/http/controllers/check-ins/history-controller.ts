import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function history(req: FastifyRequest, res: FastifyReply) {
	const userCheckInsQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	})

	const userId = req.user.sub
	const { page } = userCheckInsQuerySchema.parse(req.query)

	const userCheckInsHistoryService = makeFetchUserCheckInsHistoryService()

	const { checkIns } = await userCheckInsHistoryService.execute({
		userId,
		page,
	})

	return res.send({ checkIns })
}
