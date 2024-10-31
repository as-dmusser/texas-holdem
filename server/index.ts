import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { gameRouter } from './routes/game';
import { userRouter } from './routes/user';
import { setupWebSocket } from './websocket';

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// Register plugins
await fastify.register(cors, {
  origin: true,
});
await fastify.register(websocket);

// Setup Socket.IO
const io = new Server(fastify.server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Register routes
fastify.register(gameRouter);
fastify.register(userRouter);

// Setup WebSocket handlers
setupWebSocket(io, prisma);

// Start server
try {
  await fastify.listen({ port: 3000 });
  console.log('Server running at http://localhost:3000');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}