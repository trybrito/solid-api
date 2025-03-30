import { type Gym, Prisma } from '@prisma/client'
import type { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
	public database: Gym[] = []

	async findById(id: string) {
		const gym = this.database.find((gym) => gym.id === id)

		if (!gym) {
			return null
		}

		return gym
	}

	async create(data: Prisma.GymCreateInput) {
		const gym = {
			id: randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(Number(data.latitude)),
			longitude: new Prisma.Decimal(Number(data.latitude)),
		}

		this.database.push(gym)

		return gym
	}
}
