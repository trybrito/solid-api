import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('Please provide DATABASE_URL environment variable.')
	}

	const url = new URL(process.env.DATABASE_URL)

	url.searchParams.set('schema', schema)

	return url.toString()
}

export default {
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const schema = randomUUID()
		const databaseUrl = generateDatabaseUrl(schema)

		process.env.DATABASE_URL = databaseUrl

		execSync('pnpm prisma migrate deploy')

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
				)
				await prisma.$disconnect()
			},
		}
	},
} as Environment
