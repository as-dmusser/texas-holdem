import { useParams } from 'react-router-dom';
import { PokerTable } from '../components/game/PokerTable';
import { GameControls } from '../components/game/GameControls';
import { ChatBox } from '../components/game/ChatBox';

export function GameRoom() {
  const { roomId } = useParams();

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3 flex flex-col gap-4">
        <PokerTable roomId={roomId!} />
        <GameControls />
      </div>
      <ChatBox roomId={roomId!} />
    </div>
  );
}