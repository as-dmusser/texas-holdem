import { useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { Card } from './Card';
import { PlayerSpot } from './PlayerSpot';

interface PokerTableProps {
  roomId: string;
}

export function PokerTable({ roomId }: PokerTableProps) {
  const { connectToRoom, communityCards, pot } = useGameStore();

  useEffect(() => {
    connectToRoom(roomId);
  }, [roomId]);

  return (
    <div className="relative w-full aspect-[16/9] bg-[var(--poker-felt)] rounded-[100px] shadow-xl">
      <div className="absolute inset-8 bg-[var(--poker-felt-dark)] rounded-[80px] shadow-inner">
        {/* Community Cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {communityCards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>

        {/* Pot */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
          <div className="bg-black/50 px-4 py-2 rounded-full">
            <span className="text-yellow-400 font-bold">Pot: ${pot}</span>
          </div>
        </div>

        {/* Player Spots */}
        <div className="absolute inset-0">
          {Array.from({ length: 9 }).map((_, index) => (
            <PlayerSpot key={index} position={index} />
          ))}
        </div>
      </div>
    </div>
  );
}