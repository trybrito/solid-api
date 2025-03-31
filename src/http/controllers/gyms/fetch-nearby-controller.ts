import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function fetchNearby(req: FastifyRequest, res: FastifyReply) {
	const nearbyGymsQuerySchema = z.object({
		latitude: z.number().refine((value) => Math.abs(value) <= 90),
		longitude: z.number().refine((value) => Math.abs(value) <= 180),
	})

	const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.body)

	const fetchNearbyGymsService = makeFetchNearbyGymsService()

	const { gyms } = await fetchNearbyGymsService.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	})

	return res.send(gyms)
}
