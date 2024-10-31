import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { GameService } from '../services/game';

const prisma = new PrismaClient();
const gameService = new GameService(prisma);

export const gameRouter: FastifyPluginAsync = async (fastify) => {
  // Create new game
  fastify.post('/games', async (request, reply) => {
    const schema = z.object({
      userId: z.string(),
      buyIn: z.number().min(100),
    });

    const { userId, buyIn } = schema.parse(request.body);
    const game = await gameService.createGame(userId, buyIn);
    return reply.send(game);
  });

  // Join game
  fastify.post('/games/:gameId/join', async (request, reply) => {
    const schema = z.object({
      userId: z.string(),
      buyIn: z.number().min(100),
    });

    const { gameId } = request.params as { gameId: string };
    const { userId, buyIn } = schema.parse(request.body);
    
    const game = await gameService.joinGame(gameId, userId, buyIn);
    return reply.send(game);
  });

  // Get game state
  fastify.get('/games/:gameId', async (request, reply) => {
    const { gameId } = request.params as { gameId: string };
    const game = await gameService.getGameState(gameId);
    return reply.send(game);
  });

  // Player action (bet, call, fold)
  fastify.post('/games/:gameId/action', async (request, reply) => {
    const schema = z.object({
      userId: z.string(),
      action: z.enum(['bet', 'call', 'fold']),
      amount: z.number().optional(),
    });

    const { gameId } = request.params as { gameId: string };
    const { userId, action, amount } = schema.parse(request.body);
    
    const result = await gameService.handlePlayerAction(gameId, userId, action, amount);
    return reply.send(result);
  });
};