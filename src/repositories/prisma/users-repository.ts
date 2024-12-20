import type { Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return user
  }
}
