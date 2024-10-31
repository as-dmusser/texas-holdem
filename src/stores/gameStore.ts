import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Player {
  id: string;
  name: string;
  position: number;
  chips: number;
  cards: string[];
  currentBet: number;
  showCards: boolean;
}

interface GameState {
  socket: Socket | null;
  players: Player[];
  communityCards: string[];
  pot: number;
  currentTurn: string | null;
  minimumBet: number;
  connectToRoom: (roomId: string) => void;
  placeBet: (amount: number) => void;
  fold: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  socket: null,
  players: [],
  communityCards: [],
  pot: 0,
  currentTurn: null,
  minimumBet: 100,

  connectToRoom: (roomId: string) => {
    const socket = io('http://localhost:3000', {
      query: { roomId }
    });

    socket.on('gameState', (state) => {
      set({
        players: state.players,
        communityCards: state.communityCards,
        pot: state.pot,
        currentTurn: state.currentTurn,
        minimumBet: state.minimumBet
      });
    });

    set({ socket });
  },

  placeBet: (amount: number) => {
    const { socket } = get();
    if (socket) {
      socket.emit('action', { type: 'bet', amount });
    }
  },

  fold: () => {
    const { socket } = get();
    if (socket) {
      socket.emit('action', { type: 'fold' });
    }
  }
}));