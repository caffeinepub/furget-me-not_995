import React, { useState, useEffect, useCallback } from "react";
import { GameCard } from "./GameCard";
import { GameStats } from "./GameStats";
import { useSaveHighScore, useGetMyHighScore } from "../hooks/useQueries";

const ANIMALS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function GameBoard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const saveHighScoreMutation = useSaveHighScore();
  const { data: myHighScore } = useGetMyHighScore();

  const initializeGame = useCallback(() => {
    const shuffledAnimals = [...ANIMALS, ...ANIMALS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledAnimals);
    setFlippedCards([]);
    setMoves(0);
    setIsGameComplete(false);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (isProcessing || flippedCards.length >= 2) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return;

      const newFlippedCards = [...flippedCards, cardId];
      setFlippedCards(newFlippedCards);

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)),
      );

      if (newFlippedCards.length === 2) {
        setIsProcessing(true);
        setMoves((prev) => prev + 1);

        const [firstId, secondId] = newFlippedCards;
        const firstCard = cards.find((c) => c.id === firstId);
        const secondCard = cards.find((c) => c.id === secondId);

        if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
          // Match found
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isMatched: true }
                  : c,
              ),
            );
            setFlippedCards([]);
            setIsProcessing(false);
          }, 1000);
        } else {
          // No match
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isFlipped: false }
                  : c,
              ),
            );
            setFlippedCards([]);
            setIsProcessing(false);
          }, 1500);
        }
      }
    },
    [cards, flippedCards, isProcessing],
  );

  useEffect(() => {
    const allMatched =
      cards.length > 0 && cards.every((card) => card.isMatched);
    if (allMatched && !isGameComplete) {
      setIsGameComplete(true);

      // Save high score if it's better than current
      if (!myHighScore || moves < Number(myHighScore.moves)) {
        saveHighScoreMutation.mutate(BigInt(moves));
      }
    }
  }, [cards, isGameComplete, moves, myHighScore, saveHighScoreMutation]);

  return (
    <div className="max-w-2xl mx-auto">
      <GameStats
        moves={moves}
        isComplete={isGameComplete}
        myHighScore={myHighScore ? Number(myHighScore.moves) : null}
        onRestart={initializeGame}
      />

      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <GameCard
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {isGameComplete && (
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-white/90 mb-4">
              You completed the game in {moves} moves!
            </p>
            {(!myHighScore || moves < Number(myHighScore.moves)) && (
              <p className="text-yellow-300 font-semibold mb-4">
                🏆 New Personal Best!
              </p>
            )}
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
