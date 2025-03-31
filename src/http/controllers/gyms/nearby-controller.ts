import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function nearby(req: FastifyRequest, res: FastifyReply) {
	const nearbyGymsQuerySchema = z.object({
		latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
		longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
	})

	const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query)

	const fetchNearbyGymsService = makeFetchNearbyGymsService()

	const { gyms } = await fetchNearbyGymsService.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	})

	return res.send({ gyms })
}
