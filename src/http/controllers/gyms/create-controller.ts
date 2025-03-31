import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
	const createGymBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
		longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
	})

	const { title, description, phone, latitude, longitude } =
		createGymBodySchema.parse(req.body)

	const createGymService = makeCreateGymService()

	await createGymService.execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	})

	return res.status(201).send()
}
