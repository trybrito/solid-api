import type { Gym, Prisma } from '@prisma/client'
import type { findManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
	async findById(id: string) {
		const gym = await prisma.gym.findUnique({
			where: {
				id,
			},
		})

		return gym
	}
	async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
		const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude)))) <= 10
    `

		return gyms
	}
	async searchManyByTitle(query: string, page: number) {
		const resultsPerPage = 20

		const gyms = await prisma.gym.findMany({
			where: {
				title: {
					contains: query,
				},
			},
			take: resultsPerPage,
			skip: (page - 1) * resultsPerPage,
		})

		return gyms
	}
	async create(data: Prisma.GymCreateInput) {
		const gym = await prisma.gym.create({
			data,
		})

		return gym
	}
}
