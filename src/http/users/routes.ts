import type { FastifyInstance } from 'fastify'

import { registerUsersController } from './register-users'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUsersController)
}
