import type { Gym } from '@prisma/client'
import type { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
	public database: Gym[] = []

	async findById(id: string) {
		const gym = this.database.find((gym) => gym.id === id)

		if (!gym) {
			return null
		}

		return gym
	}
}
