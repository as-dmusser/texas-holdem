import { PrismaClient, Game, PlayerGame } from '@prisma/client';
import { evaluateHand } from 'poker-evaluator';

export class GameService {
  constructor(private prisma: PrismaClient) {}

  private readonly TIMEOUT_DURATION = 60 * 1000; // 60 seconds
  private readonly MAX_PLAYERS = 9;
  private readonly INITIAL_DECK = [
    // ... (52 cards in format "2H", "3H", etc.)
  ];

  async createGame(userId: string, buyIn: number): Promise<Game> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.balance < buyIn) {
      throw new Error('Insufficient funds');
    }

    return this.prisma.$transaction(async (tx) => {
      const game = await tx.game.create({
        data: {
          deck: JSON.stringify(this.shuffleDeck([...this.INITIAL_DECK])),
          players: {
            create: {
              userId,
              position: 0,
              chips: buyIn,
            },
          },
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: buyIn } },
      });

      return game;
    });
  }

  async joinGame(gameId: string, userId: string, buyIn: number): Promise<Game> {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: { players: true },
    });

    if (!game || game.status !== 'WAITING' || game.players.length >= this.MAX_PLAYERS) {
      throw new Error('Cannot join game');
    }

    return this.prisma.$transaction(async (tx) => {
      const position = game.players.length;
      await tx.playerGame.create({
        data: {
          gameId,
          userId,
          position,
          chips: buyIn,
        },
      });

      if (position >= 1) { // Start game with 2 or more players
        await this.startGame(gameId);
      }

      return this.getGameState(gameId);
    });
  }

  private shuffleDeck(deck: string[]): string[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  // ... Additional methods for game logic
}