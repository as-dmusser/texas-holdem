import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

export function RoomList() {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from your backend
  const rooms = [
    { id: '1', name: 'High Stakes', players: 5, maxPlayers: 9, buyIn: 5000 },
    { id: '2', name: 'Casual Table', players: 3, maxPlayers: 9, buyIn: 1000 },
    { id: '3', name: 'Beginners', players: 7, maxPlayers: 9, buyIn: 500 },
  ];

  return (
    <div className="space-y-2">
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => navigate(`/game/${room.id}`)}
          className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{room.name}</span>
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                {room.players}/{room.maxPlayers}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Buy-in: ${room.buyIn}
          </div>
        </div>
      ))}
    </div>
  );
}