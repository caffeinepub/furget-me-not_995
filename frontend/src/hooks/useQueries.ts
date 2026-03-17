import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { UserProfile, HighScore } from "../backend";

export function useGetUserProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useGetMyHighScore() {
  const { actor, isFetching } = useActor();

  return useQuery<HighScore | null>({
    queryKey: ["myHighScore"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyHighScore();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveHighScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moves: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveHighScore(moves);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myHighScore"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function useGetLeaderboard() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[import("@dfinity/principal").Principal, HighScore]>>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}
