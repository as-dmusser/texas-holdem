import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { Button } from '../ui/Button';

export function GameControls() {
  const [betAmount, setBetAmount] = useState(100);
  const { placeBet, fold, currentPlayer, minimumBet } = useGameStore();

  const handleBet = () => {
    placeBet(betAmount);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
      <div className="flex-1">
        <input
          type="range"
          min={minimumBet}
          max={currentPlayer?.chips || 1000}
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>${minimumBet}</span>
          <span>${betAmount}</span>
          <span>${currentPlayer?.chips || 1000}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleBet} variant="primary">
          Bet ${betAmount}
        </Button>
        <Button onClick={fold} variant="danger">
          Fold
        </Button>
      </div>
    </div>
  );
}