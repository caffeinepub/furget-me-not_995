import React from "react";

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

interface GameCardProps {
  card: Card;
  onClick: () => void;
}

export function GameCard({ card, onClick }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={card.isFlipped || card.isMatched}
      className={`aspect-square rounded-xl transition-all duration-300 hover:scale-105 disabled:cursor-default ${
        card.isFlipped || card.isMatched
          ? "bg-white shadow-lg"
          : "bg-white/20 backdrop-blur-sm hover:bg-white/30 shadow-md"
      } ${card.isMatched ? "ring-4 ring-green-400" : ""}`}
    >
      <div className="w-full h-full flex items-center justify-center text-4xl">
        {card.isFlipped || card.isMatched ? card.emoji : "?"}
      </div>
    </button>
  );
}
