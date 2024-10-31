import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RoomList } from '../components/room/RoomList';

export function Home() {
  const navigate = useNavigate();
  const [buyIn, setBuyIn] = useState(1000);

  const handleCreateRoom = () => {
    // In a real app, this would create a room on the server
    const roomId = Math.random().toString(36).substring(7);
    navigate(`/game/${roomId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Texas Hold'em Poker</h1>
        <p className="text-gray-400">Play poker with friends in real-time</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Create New Room
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Buy-in Amount
              </label>
              <div className="relative">
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={buyIn}
                  onChange={(e) => setBuyIn(Number(e.target.value))}
                  min="100"
                  step="100"
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <Button onClick={handleCreateRoom} className="w-full">
              Create Room
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Active Rooms</h2>
          <RoomList />
        </div>
      </div>
    </div>
  );
}