import React from "react";

interface GameStatsProps {
  moves: number;
  isComplete: boolean;
  myHighScore: number | null;
  onRestart: () => void;
}

export function GameStats({
  moves,
  isComplete,
  myHighScore,
  onRestart,
}: GameStatsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
      <div className="flex justify-between items-center">
        <div className="text-white">
          <h3 className="text-lg font-semibold mb-2">Game Stats</h3>
          <div className="space-y-1">
            <p>
              Moves: <span className="font-bold text-xl">{moves}</span>
            </p>
            {myHighScore !== null && (
              <p>
                Personal Best:{" "}
                <span className="font-bold text-yellow-300">{myHighScore}</span>
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
        >
          New Game
        </button>
      </div>

      {!isComplete && (
        <div className="mt-4 text-white/80 text-sm">
          <p>💡 Tip: Try to remember where you've seen each animal!</p>
        </div>
      )}
    </div>
  );
}
