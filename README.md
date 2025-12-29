# Stuck in Space 🚀

A retro text adventure game where you wake up on an alien spaceship and must escape before they probe you! Built with Next.js 16, React 19, and Firebase.

![Stuck in Space](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## 🎮 Play the Game

[Play Stuck in Space](https://your-firebase-url.web.app) _(Update after deployment)_

## Features

- **Classic text adventure gameplay** - Navigate through rooms using typed commands
- **5 unique rooms** - Cell, Laboratory, Hallway, Airlock, and the Blue Origin Space Cruise
- **22 interactive items** - Inspect, take, attack, talk, and use items to solve puzzles
- **Multiple endings** - Die in creative ways or escape to victory
- **Leaderboard** - Compete for the highest score
- **Retro CRT aesthetic** - Authentic terminal experience with scanlines and glow effects

## Commands

| Command | Description |
|---------|-------------|
| `INSPECT [item]` | Get a detailed description of an object |
| `TAKE [item]` | Add an item to your inventory |
| `TALK [item/person]` | Speak to someone or something |
| `ATTACK [item/person]` | Attack an object or person |
| `USE [inventory item] ON [room item]` | Use an inventory item on something in the room |
| `H` or `HELP` | Show the help menu |
| `I` or `INVENTORY` | View items you're carrying |
| `R` or `RETURN` | Return to the room description |
| `E` or `EXIT` | Exit the room (when objectives are complete) |

## Local Development

### Prerequisites

- Node.js 18+ 
- npm
- Firebase project (for leaderboard functionality)

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/yourusername/stuck-in-space.git
   cd stuck-in-space
   npm install
   ```

2. **Configure Firebase:**
   
   Copy `env.example` to `.env.local` and fill in your Firebase credentials:
   ```bash
   cp env.example .env.local
   ```
   
   Get your credentials from the [Firebase Console](https://console.firebase.google.com/):
   - Go to Project Settings → General → Your apps
   - Copy the config values

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## Deploy to Firebase

### Prerequisites

- Firebase CLI: `npm install -g firebase-tools`
- Logged in: `firebase login`

### Deployment Steps

1. **Initialize Firebase (first time only):**
   ```bash
   firebase init
   ```
   Select:
   - Hosting (configure files for Firebase Hosting)
   - Firestore (for leaderboard)
   - Use existing project → select your project
   - Use `out` as public directory
   - Configure as single-page app: Yes
   - Don't overwrite `firebase.json`

2. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

3. **Deploy Firestore rules:**
   ```bash
   firebase deploy --only firestore:rules
   ```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Firebase | 12.7.0 | Firestore DB + Hosting |
| typewriter-effect | 2.22.0 | Typewriter text animation |

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
├── firebase.json             # Firebase hosting config
├── firestore.rules           # Firestore security rules
└── env.example               # Environment variable template
```

## Credits

Created by [@elijahsilverman](https://elijahsilverman.com)

Originally built in 2022 with Ruby on Rails + React. Modernized in 2024 with Next.js + Firebase.
