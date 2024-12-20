import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './http/users/routes'

const app = fastify()

app.register(usersRoutes)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is running 🚀')
  })
