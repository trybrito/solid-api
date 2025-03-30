import { type Gym, Prisma } from '@prisma/client'
import type { findManyNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
	public database: Gym[] = []

	async findById(id: string) {
		const gym = this.database.find((gym) => gym.id === id)

		if (!gym) {
			return null
		}

		return gym
	}

	async findManyNearby(params: findManyNearbyParams) {
		const nearbyGyms = this.database.filter((gym) => {
			const distanceInKilometers = getDistanceBetweenCoordinates(
				{ latitude: params.latitude, longitude: params.longitude },
				{ latitude: Number(gym.latitude), longitude: Number(gym.longitude) },
			)

			return distanceInKilometers <= 10
		})

		return nearbyGyms
	}

	async searchManyByTitle(query: string, page: number) {
		const gyms = this.database
			.filter((gym) => gym.title.includes(query))
			.slice((page - 1) * 20, page * 20)

		return gyms
	}

	async create(data: Prisma.GymCreateInput) {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(Number(data.latitude)),
			longitude: new Prisma.Decimal(Number(data.longitude)),
			created_at: new Date(),
		}

		this.database.push(gym)

		return gym
	}
}
