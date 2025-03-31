import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {
	const searchGymsQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1),
	})

	const { q, page } = searchGymsQuerySchema.parse(req.body)

	const searchGymService = makeSearchGymsService()

	const { gyms } = await searchGymService.execute({
		query: q,
		page,
	})

	return res.send(gyms)
}
