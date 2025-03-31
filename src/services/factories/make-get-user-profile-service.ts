import { GetUserProfileService } from '../get-user-profile'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCheckInService() {
	const usersRepository = new PrismaUsersRepository()
	const getUserProfileService = new GetUserProfileService(usersRepository)

	return getUserProfileService
}
