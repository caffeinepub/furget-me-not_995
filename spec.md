# Furget Me Not - Memory Game Specification

## Overview

A modern memory game featuring a 4x4 grid of animal emojis where players match pairs by flipping cards. The game requires user authentication and tracks high scores with a global leaderboard.

## Game Mechanics

- 2D game with a 4x4 grid containing 8 pairs of animal emoji cards
- Cards start face-down and players flip two cards at a time to find matching pairs
- Game tracks the number of moves/attempts to complete all matches
- Lower number of moves results in a better score
- Game state is managed entirely in the frontend

## Authentication

- Users must authenticate using Internet Identity before playing
- Only authenticated users can save scores and appear on the leaderboard

## Backend Data Storage

- User high scores: stores the best (lowest) number of moves for each authenticated user
- User identity information linked to their best score

## Backend Operations

- Save or update a user's high score when they complete a game with fewer moves than their previous best
- Retrieve leaderboard data showing top players ranked by lowest number of moves
- Retrieve individual user's current high score

## User Interface

- Responsive design that works on different screen sizes
- Modern, sleek visual styling
- 4x4 grid layout for the game cards
- Display current move count during gameplay
- Show user's personal high score
- Display global leaderboard with player rankings

## Leaderboard Features

- Shows top players ranked by their best scores (fewest moves)
- Displays player identity and their best score
- Updates when new high scores are achieved
