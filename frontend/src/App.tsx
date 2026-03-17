import React, { useState, useEffect } from "react";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { LoginButton } from "./components/LoginButton";
import { UserProfileSetup } from "./components/UserProfileSetup";
import { GameBoard } from "./components/GameBoard";
import { Leaderboard } from "./components/Leaderboard";
import { useGetUserProfile } from "./hooks/useQueries";
import { Heart } from "lucide-react";

function App() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetUserProfile();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const isAuthenticated = !!identity;
  const needsProfile = isAuthenticated && !profileLoading && !userProfile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🐾 Furget Me Not
          </h1>
          <p className="text-xl text-white/90 mb-6">
            A memory game with adorable animal friends
          </p>
          <div className="flex justify-center items-center gap-4 mb-6">
            <LoginButton />
            {isAuthenticated && userProfile && (
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                {showLeaderboard ? "Play Game" : "Leaderboard"}
              </button>
            )}
          </div>
          {isAuthenticated && userProfile && (
            <p className="text-white/80">
              Welcome back,{" "}
              <span className="font-semibold">{userProfile.name}</span>!
            </p>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {!isAuthenticated ? (
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Ready to Test Your Memory?
                </h2>
                <p className="text-white/90 mb-6">
                  Sign in with Internet Identity to play and track your high
                  scores!
                </p>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto opacity-50">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-white/20 rounded-lg flex items-center justify-center text-2xl"
                    >
                      ?
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : needsProfile ? (
            <UserProfileSetup />
          ) : userProfile ? (
            showLeaderboard ? (
              <Leaderboard />
            ) : (
              <GameBoard />
            )
          ) : (
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <p className="text-white text-lg">Loading your profile...</p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-white/60">
          <p>
            © 2025. Built with <Heart className="inline w-4 h-4 text-red-400" />{" "}
            using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
