import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function validate(req: FastifyRequest, res: FastifyReply) {
	const validateCheckInsParamsSchema = z.object({
		checkInId: z.string().uuid(),
	})

	const { checkInId } = validateCheckInsParamsSchema.parse(req.params)

	const validateCheckInsService = makeValidateCheckInService()

	const { checkIn } = await validateCheckInsService.execute({
		checkInId,
	})

	return res.status(204).send({ checkIn })
}
