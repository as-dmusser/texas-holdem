import { PrismaClient, User } from '@prisma/client';

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: { username: string; displayName: string }): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        balance: 1000, // Starting balance
      },
    });
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async deposit(userId: string, amount: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        balance: { increment: amount },
      },
    });
  }

  async updateLastActive(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastActive: new Date() },
    });
  }
}