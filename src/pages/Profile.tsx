import { useState } from 'react';
import { User, Wallet, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Profile() {
  const [balance, setBalance] = useState(5000);

  const handleAddFunds = () => {
    setBalance(prev => prev + 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-800" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Player Name</h1>
              <p className="text-gray-200">Joined February 2024</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-5 h-5 text-green-400" />
                <h2 className="font-semibold">Balance</h2>
              </div>
              <p className="text-2xl font-bold">${balance}</p>
              <Button onClick={handleAddFunds} className="mt-2 w-full">
                Add Funds
              </Button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h2 className="font-semibold">Statistics</h2>
              </div>
              <div className="space-y-1">
                <p>Games Played: 42</p>
                <p>Wins: 15</p>
                <p>Win Rate: 35.7%</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="font-semibold mb-4">Recent Games</h2>
            <div className="space-y-2">
              {[1, 2, 3].map((game) => (
                <div key={game} className="flex justify-between items-center p-2 bg-gray-600 rounded">
                  <span>Game #{game}</span>
                  <span className="text-green-400">+$250</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}