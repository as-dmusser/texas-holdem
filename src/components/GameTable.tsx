import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { Card } from './Card';
import { PlayerPosition } from './PlayerPosition';
import { GameControls } from './GameControls';

export function GameTable() {
  const { gameId } = useParams();
  const { 
    game,
    players,
    currentPlayer,
    pot,
    communityCards,
    joinGame,
    placeBet,
    fold 
  } = useGameStore();

  useEffect(() => {
    if (gameId) {
      joinGame(gameId);
    }
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full aspect-[16/9] bg-green-800 rounded-full shadow-xl p-8">
      {/* Poker table layout */}
      <div className="absolute inset-0 bg-green-700 rounded-full m-12 shadow-inner">
        {/* Community cards */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {communityCards.map((card, i) => (
            <Card key={i} card={card} />
          ))}
        </div>

        {/* Pot display */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black/50 px-4 py-2 rounded-full">
            <span className="text-yellow-400 font-bold">Pot: ${pot}</span>
          </div>
        </div>

        {/* Player positions */}
        {players.map((player, i) => (
          <PlayerPosition
            key={i}
            player={player}
            position={i}
            isCurrentPlayer={currentPlayer?.id === player.id}
          />
        ))}
      </div>

      {/* Game controls */}
      <GameControls
        onBet={placeBet}
        onFold={fold}
        disabled={currentPlayer?.id !== game.currentTurn}
      />
    </div>
  );
}