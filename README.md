# Stuck in Space 🚀

A retro text adventure game where you wake up on an alien spaceship and must escape before they probe you! Built with Next.js 16, React 19, and Firebase.

![Stuck in Space](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## 🎮 Play the Game

[Play Stuck in Space](https://stuck-in-space-app.web.app)

## Features

- **Classic text adventure gameplay** - Navigate through rooms using typed commands
- **5 unique rooms** - Cell, Laboratory, Hallway, Airlock, and the Blue Origin Space Cruise
- **22 interactive items** - Inspect, take, attack, talk, and use items to solve puzzles
- **Multiple endings** - Die in creative ways or escape to victory
- **Leaderboard** - Compete for the highest score (powered by Firebase)
- **Retro CRT aesthetic** - Authentic terminal experience with scanlines and glow effects

## Commands

| Command | Description |
|---------|-------------|
| `INSPECT [item]` | Get a detailed description of an object |
| `TAKE [item]` | Add an item to your inventory |
| `TALK [item/person]` | Speak to someone or something |
| `ATTACK [item/person]` | Attack an object or person |
| `USE [item] ON [target]` | Use an inventory item on something in the room |
| `H` or `HELP` | Show the help menu |
| `I` or `INVENTORY` | View items you're carrying |
| `R` or `RETURN` | Return to the room description |
| `E` or `EXIT` | Exit the room (when objectives are complete) |

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/elijahms/stuck-in-space.git
cd stuck-in-space
npm install
cp env.example .env.local  # Add your Firebase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## CI/CD Pipeline

This project uses **GitHub Actions** for automated deployments:

| Trigger | Action |
|---------|--------|
| Push to `main` | Build & deploy to Firebase Hosting + Firestore rules |
| Pull Request | Build & deploy preview URL |

### Required GitHub Secrets

The Firebase CLI auto-configured `FIREBASE_SERVICE_ACCOUNT_STUCK_IN_SPACE_APP`. The following are also set:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Firebase | 12.7.0 | Firestore DB + Hosting |

## Project Structure

```
stuck-in-space/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main game component
│   │   ├── leaderboard/      # Leaderboard page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # CRT/space theme styles
│   └── lib/
│       ├── firebase.ts       # Firebase initialization
│       └── gameData.ts       # All game data (rooms, items)
├── .github/workflows/        # CI/CD workflows
├── firebase.json             # Firebase hosting config
├── firestore.rules           # Firestore security rules
└── env.example               # Environment variable template
```

## Credits

Created by [@elijahsilverman](https://elijahsilverman.com)

Originally built in 2022 with Ruby on Rails + React. Modernized in 2024 with Next.js + Firebase.
