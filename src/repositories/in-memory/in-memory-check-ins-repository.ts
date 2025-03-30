import type { CheckIn, Prisma } from '@prisma/client'
import type { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
	public database: CheckIn[] = []

	async findById(id: string) {
		const checkIn = this.database.find((checkIn) => checkIn.id === id)

		if (!checkIn) {
			return null
		}

		return checkIn
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date')
		const endOfTheDay = dayjs(date).endOf('date')

		const checkInOnSameDate = this.database.find((checkIn) => {
			const checkInDate = dayjs(checkIn.created_at)
			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

			return checkIn.user_id === userId && isOnSameDate
		})

		if (!checkInOnSameDate) {
			return null
		}

		return checkInOnSameDate
	}

	async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
		return this.database
			.filter((checkIn) => checkIn.user_id === userId)
			.slice((page - 1) * 20, page * 20)
	}

	async countByUserId(userId: string): Promise<number> {
		const userCheckIns = this.database.filter(
			(checkIn) => checkIn.user_id === userId,
		)

		return userCheckIns.length
	}

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
			created_at: new Date(),
		}

		this.database.push(checkIn)

		return checkIn
	}

	async save(checkIn: CheckIn) {
		const checkInIndex = this.database.findIndex(
			(item) => item.id === checkIn.id,
		)

		if (checkInIndex >= 0) {
			this.database[checkInIndex] = checkIn
		}

		return checkIn
	}
}
