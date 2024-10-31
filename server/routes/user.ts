import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { UserService } from '../services/user';

const prisma = new PrismaClient();
const userService = new UserService(prisma);

export const userRouter: FastifyPluginAsync = async (fastify) => {
  // Create user
  fastify.post('/users', async (request, reply) => {
    const schema = z.object({
      username: z.string().min(3).max(20),
      displayName: z.string().min(3).max(30),
    });

    const userData = schema.parse(request.body);
    const user = await userService.createUser(userData);
    return reply.send(user);
  });

  // Get user profile
  fastify.get('/users/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const user = await userService.getUser(userId);
    return reply.send(user);
  });

  // Deposit funds
  fastify.post('/users/:userId/deposit', async (request, reply) => {
    const schema = z.object({
      amount: z.number().positive(),
    });

    const { userId } = request.params as { userId: string };
    const { amount } = schema.parse(request.body);
    
    const user = await userService.deposit(userId, amount);
    return reply.send(user);
  });
};