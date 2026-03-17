import React, { useState } from "react";
import { useSaveUserProfile } from "../hooks/useQueries";

export function UserProfileSetup() {
  const [name, setName] = useState("");
  const saveProfileMutation = useSaveUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      saveProfileMutation.mutate({ name: name.trim() });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome to Furget Me Not!
        </h2>
        <p className="text-white/90 mb-6 text-center">
          What should we call you?
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
            maxLength={50}
            required
          />
          <button
            type="submit"
            disabled={!name.trim() || saveProfileMutation.isPending}
            className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveProfileMutation.isPending ? "Saving..." : "Start Playing!"}
          </button>
        </form>
      </div>
    </div>
  );
}
