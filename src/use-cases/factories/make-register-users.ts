import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { RegisterUsersUseCase } from '../register-users'

export function makeRegisterUsers() {
  const usersRepository = new PrismaUsersRepository()
  const registerUsersUseCase = new RegisterUsersUseCase(usersRepository)

  return registerUsersUseCase
}
