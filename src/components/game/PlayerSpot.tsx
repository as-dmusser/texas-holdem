import { useGameStore } from '../../stores/gameStore';
import { Card } from './Card';

interface PlayerSpotProps {
  position: number;
}

export function PlayerSpot({ position }: PlayerSpotProps) {
  const { players, currentTurn } = useGameStore();
  const player = players.find(p => p.position === position);

  // Calculate position styles based on the spot number (0-8)
  const getPositionStyles = (pos: number) => {
    const radius = '40%';
    const angle = (pos * 40 - 90) * (Math.PI / 180);
    return {
      left: `${50 + Math.cos(angle) * 40}%`,
      top: `${50 + Math.sin(angle) * 40}%`,
      transform: 'translate(-50%, -50%)'
    };
  };

  if (!player) {
    return (
      <div
        className="absolute w-32 h-32 flex items-center justify-center"
        style={getPositionStyles(position)}
      >
        <div className="w-12 h-12 rounded-full bg-gray-700/50 border-2 border-dashed border-gray-600" />
      </div>
    );
  }

  const isCurrentTurn = currentTurn === player.id;

  return (
    <div
      className="absolute w-32 h-32"
      style={getPositionStyles(position)}
    >
      <div className={`
        relative p-2 rounded-lg
        ${isCurrentTurn ? 'bg-blue-500/20 ring-2 ring-blue-500' : 'bg-black/20'}
      `}>
        {/* Player cards */}
        <div className="flex gap-1 justify-center mb-2">
          {player.cards.map((card: string, i: number) => (
            <Card key={i} card={card} faceDown={!player.showCards} />
          ))}
        </div>

        {/* Player info */}
        <div className="text-center">
          <div className="font-semibold truncate">{player.name}</div>
          <div className="text-sm text-yellow-400">${player.chips}</div>
        </div>

        {/* Current bet */}
        {player.currentBet > 0 && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <div className="bg-black/50 px-2 py-1 rounded-full text-sm">
              ${player.currentBet}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}