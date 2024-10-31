import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

export const setupWebSocket = (io: Server, prisma: PrismaClient) => {
  const gameNamespace = io.of('/game');

  gameNamespace.on('connection', (socket: Socket) => {
    let userId: string;
    let gameId: string;

    socket.on('auth', async (data: { userId: string }) => {
      userId = data.userId;
      await prisma.user.update({
        where: { id: userId },
        data: { lastActive: new Date() },
      });
    });

    socket.on('join-game', async (data: { gameId: string }) => {
      gameId = data.gameId;
      socket.join(gameId);
    });

    socket.on('leave-game', () => {
      if (gameId) {
        socket.leave(gameId);
      }
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { lastActive: new Date() },
        });
      }
    });
  });

  // Set up periodic check for inactive players
  setInterval(async () => {
    const inactiveThreshold = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes
    const inactivePlayers = await prisma.playerGame.findMany({
      where: {
        game: { status: 'ACTIVE' },
        lastAction: { lt: inactiveThreshold },
      },
      include: { game: true },
    });

    for (const player of inactivePlayers) {
      // Handle inactive player (fold their hand, remove from game, etc.)
      gameNamespace.to(player.gameId).emit('player-inactive', {
        userId: player.userId,
        gameId: player.gameId,
      });
    }
  }, 30 * 1000); // Check every 30 seconds
};