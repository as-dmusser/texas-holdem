import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Poker Room
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-gray-300">$5,000</span>
            <Link
              to="/profile"
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}