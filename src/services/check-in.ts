import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { GymsRepository } from '@/repositories/gyms-repository'
import type { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface CheckInServiceRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

type CheckInServiceResponse = {
	checkIn: CheckIn
}

export class CheckInService {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository,
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
		const gym = await this.gymsRepository.findById(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		const distanceInKilometers = getDistanceBetweenCoordinates(
			{
				latitude: userLatitude,
				longitude: userLongitude,
			},
			{
				latitude: Number(gym.latitude),
				longitude: Number(gym.longitude),
			},
		)

		const MAXIMUM_ALLOWED_DISTANCE_IN_METERS = 0.1

		if (distanceInKilometers > MAXIMUM_ALLOWED_DISTANCE_IN_METERS) {
			throw new Error()
		}

		if (checkInOnSameDate) {
			throw new Error()
		}

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
		})

		return { checkIn }
	}
}
