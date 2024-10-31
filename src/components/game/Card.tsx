interface CardProps {
  card: string;
  faceDown?: boolean;
}

export function Card({ card, faceDown = false }: CardProps) {
  if (faceDown) {
    return (
      <div className="w-16 h-24 rounded-lg bg-blue-600 shadow-lg border-2 border-white/20" />
    );
  }

  const [value, suit] = card.split('');
  const suitSymbol = {
    'H': '♥',
    'D': '♦',
    'C': '♣',
    'S': '♠'
  }[suit] || suit;

  const isRed = suit === 'H' || suit === 'D';

  return (
    <div className="w-16 h-24 rounded-lg bg-white shadow-lg flex items-center justify-center">
      <div className={`text-2xl font-bold ${isRed ? 'text-red-600' : 'text-black'}`}>
        {value}
        {suitSymbol}
      </div>
    </div>
  );
}