import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((err, _, res) => {
	if (err instanceof ZodError) {
		return res
			.status(400)
			.send({ message: 'Validation error.', issues: err.format() })
	}

	if (env.NODE_ENV !== 'production') {
		console.error(err)
	} else {
		// TODO: here we should log to an external tool for observability (like Datadog/NewRelic/Sentry)
	}

	return res.status(500).send({ message: 'Internal server error.' })
})
