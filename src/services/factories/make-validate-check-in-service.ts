import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeRegisterService() {
	const checkInsRepository = new PrismaCheckInsRepository()
	const validateCheckInService = new ValidateCheckInService(checkInsRepository)

	return validateCheckInService
}
