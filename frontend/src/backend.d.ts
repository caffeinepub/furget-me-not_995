import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface HighScore {
    moves: bigint;
    timestamp: bigint;
}
export interface backendInterface {
    getLeaderboard(): Promise<Array<[Principal, HighScore]>>;
    getMyHighScore(): Promise<HighScore | null>;
    getUserProfile(): Promise<UserProfile | null>;
    initializeAuth(): Promise<void>;
    isCurrentUserAdmin(): Promise<boolean>;
    saveHighScore(moves: bigint): Promise<void>;
    saveUserProfile(profile: UserProfile): Promise<void>;
}
