import React from "react";
import { useGetLeaderboard, useGetUserProfile } from "../hooks/useQueries";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function Leaderboard() {
  const { data: leaderboard, isLoading } = useGetLeaderboard();
  const { identity } = useInternetIdentity();

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <p className="text-white text-center">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🏆 Leaderboard
          </h2>
          <p className="text-white/80 text-center">
            No scores yet. Be the first to complete a game!
          </p>
        </div>
      </div>
    );
  }

  const currentUserPrincipal = identity?.getPrincipal().toString();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          🏆 Leaderboard
        </h2>
        <div className="space-y-3">
          {leaderboard.slice(0, 10).map(([principal, score], index) => {
            const isCurrentUser = principal.toString() === currentUserPrincipal;
            const rank = index + 1;
            const emoji =
              rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "🏅";

            return (
              <div
                key={principal.toString()}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  isCurrentUser
                    ? "bg-yellow-400/20 border border-yellow-400/40"
                    : "bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <p className="text-white font-semibold">
                      {isCurrentUser ? "You" : `Player ${rank}`}
                    </p>
                    <p className="text-white/60 text-sm font-mono">
                      {principal.toString().slice(0, 8)}...
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">
                    {Number(score.moves)} moves
                  </p>
                  <p className="text-white/60 text-sm">#{rank}</p>
                </div>
              </div>
            );
          })}
        </div>

        {leaderboard.length > 10 && (
          <p className="text-white/60 text-center mt-4">
            Showing top 10 players
          </p>
        )}
      </div>
    </div>
  );
}
