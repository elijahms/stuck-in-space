'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import Typewriter from 'typewriter-effect';
import Link from 'next/link';
import { 
  rooms, 
  items, 
  getItemsForRoom, 
  getRoomById, 
  Item 
} from '@/lib/gameData';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface GameState {
  isStarted: boolean;
  playerName: string;
  playerEmail: string;
  currentRoom: number;
  score: number;
  moveCount: number;
  inventory: Item[];
  isDead: boolean;
  hasWon: boolean;
  roomItems: Item[];
  startTime: number | null;
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    isStarted: false,
    playerName: '',
    playerEmail: '',
    currentRoom: 1,
    score: 0,
    moveCount: 0,
    inventory: [],
    isDead: false,
    hasWon: false,
    roomItems: [],
    startTime: null,
  });

  const [displayText, setDisplayText] = useState<string | null>(null);
  const [displayFastText, setDisplayFastText] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [targetedObject, setTargetedObject] = useState<Item | null>(null);
  const [elapsedTime, setElapsedTime] = useState({ minutes: 0, seconds: 0 });
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Load room items when room changes
  useEffect(() => {
    if (gameState.isStarted && gameState.currentRoom > 0) {
      const roomItems = getItemsForRoom(gameState.currentRoom).map(item => ({ ...item }));
      setGameState(prev => ({ ...prev, roomItems }));
      
      const room = getRoomById(gameState.currentRoom);
      if (room) {
        setDisplayText(room.introDescription);
        setDisplayFastText(null);
      }
    }
  }, [gameState.currentRoom, gameState.isStarted]);

  // Timer
  useEffect(() => {
    if (gameState.isStarted && gameState.startTime && !gameState.isDead && !gameState.hasWon) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameState.startTime!) / 1000);
        setElapsedTime({
          minutes: Math.floor(elapsed / 60),
          seconds: elapsed % 60,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState.isStarted, gameState.startTime, gameState.isDead, gameState.hasWon]);

  // Focus input
  useEffect(() => {
    if (gameState.isStarted && !gameState.isDead && !gameState.hasWon) {
      inputRef.current?.focus();
    }
  }, [gameState.isStarted, gameState.isDead, gameState.hasWon, displayText]);

  const startGame = (e: FormEvent) => {
    e.preventDefault();
    if (!gameState.playerName.trim()) return;
    
    setGameState(prev => ({
      ...prev,
      isStarted: true,
      startTime: Date.now(),
      currentRoom: 1,
    }));
  };

  const handleDeath = async () => {
    setGameState(prev => ({ ...prev, isDead: true }));
    
    // Save score to Firestore (if configured)
    if (db) {
      try {
        await addDoc(collection(db, 'leaderboard'), {
          name: gameState.playerName,
          email: gameState.playerEmail,
          score: gameState.score,
          roomReached: gameState.currentRoom,
          minutes: elapsedTime.minutes,
          seconds: elapsedTime.seconds,
          completedAt: serverTimestamp(),
          won: false,
        });
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  const handleWin = async () => {
    const finalScore = gameState.score + 1000;
    setGameState(prev => ({ ...prev, hasWon: true, score: finalScore }));
    
    // Save score to Firestore (if configured)
    if (db) {
      try {
        await addDoc(collection(db, 'leaderboard'), {
          name: gameState.playerName,
          email: gameState.playerEmail,
          score: finalScore,
          roomReached: gameState.currentRoom,
          minutes: elapsedTime.minutes,
          seconds: elapsedTime.seconds,
          completedAt: serverTimestamp(),
          won: true,
        });
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const input = inputValue.trim().split(' ');
    const verb = input[0].toLowerCase();
    const targetName = input.length > 1 ? input[input.length - 1].toLowerCase() : '';
    
    const room = getRoomById(gameState.currentRoom);
    const itemNames = gameState.roomItems.map(i => i.name.toLowerCase());

    setInputValue('');

    // Check death threshold
    if (room && room.deathThreshold === gameState.moveCount) {
      if (gameState.roomItems.every(i => !i.exitTrigger)) {
        setDisplayFastText(null);
        setDisplayText(room.deathThresholdMet);
        handleDeath();
        return;
      }
    }

    // Check win condition (room 5, all exit triggers met)
    if (gameState.currentRoom === 5 && gameState.roomItems.every(i => i.exitTrigger)) {
      handleWin();
      return;
    }

    // Handle choice selections (1 or 2) for targeted objects
    if (targetedObject && (verb === '1' || verb === '2')) {
      if (targetedObject.talkChoice1 && targetedObject.talkChoice2) {
        if (verb === '1') {
          setDisplayFastText(null);
          setDisplayText(targetedObject.talkChoice1);
          if (targetedObject.deathTrigger === '1') handleDeath();
        } else {
          setDisplayFastText(null);
          setDisplayText(targetedObject.talkChoice2);
          if (targetedObject.deathTrigger === '2') handleDeath();
        }
        setTargetedObject(null);
        return;
      }
      if (targetedObject.inspectChoice1 && targetedObject.inspectChoice2) {
        if (verb === '1') {
          setDisplayFastText(null);
          setDisplayText(targetedObject.inspectChoice1);
          if (targetedObject.deathTrigger === '1') handleDeath();
        } else {
          setDisplayFastText(null);
          setDisplayText(targetedObject.inspectChoice2);
          if (targetedObject.deathTrigger === '2') handleDeath();
        }
        setTargetedObject(null);
        return;
      }
    }

    // USE command
    if (verb === 'use' && input.length >= 3) {
      const usedItemName = input[1].toLowerCase();
      const targetItemName = input[input.length - 1].toLowerCase();
      const invItem = gameState.inventory.find(i => i.name.toLowerCase() === usedItemName);
      const targetItem = gameState.roomItems.find(i => i.name.toLowerCase() === targetItemName);

      if (invItem && targetItem) {
        if (invItem.id === targetItem.catalystItem && targetItem.catalystResponse) {
          setDisplayFastText(null);
          setDisplayText(targetItem.catalystResponse);
          setGameState(prev => ({
            ...prev,
            moveCount: prev.moveCount + 1,
            roomItems: prev.roomItems.map(i => 
              i.id === targetItem.id ? { ...i, exitTrigger: true } : i
            ),
          }));
        } else {
          setDisplayFastText(null);
          setDisplayText(`Using ${invItem.name} on ${targetItem.name} won't have any effect!`);
        }
      } else {
        setDisplayFastText(null);
        setDisplayText("I didn't quite catch that. Remember the syntax for USE is: Use (item from inventory) on (item in room)");
      }
      return;
    }

    // Basic commands
    if (['inspect', 'attack', 'talk', 'take'].includes(verb) && itemNames.includes(targetName)) {
      const item = gameState.roomItems.find(i => i.name.toLowerCase() === targetName);
      if (!item) return;

      if (verb === 'inspect') {
        setTargetedObject(item);
        setDisplayFastText(null);
        setDisplayText(item.description);
        setGameState(prev => ({
          ...prev,
          moveCount: prev.moveCount + 1,
          score: prev.score + 100,
          roomItems: item.triggersOn === 'inspect' 
            ? prev.roomItems.map(i => i.id === item.id ? { ...i, exitTrigger: true } : i)
            : prev.roomItems,
        }));
        if (item.deathTrigger === 'inspect') handleDeath();
        return;
      }

      if (verb === 'take') {
        if (!item.isTakeable) {
          setGameState(prev => ({ ...prev, score: prev.score - 100 }));
          setDisplayFastText(null);
          setDisplayText(`You can't Take the ${item.name}! Sorry!`);
        } else if (gameState.inventory.some(i => i.id === item.id)) {
          setDisplayFastText(null);
          setDisplayText(`You already have the ${item.name}!`);
        } else {
          setGameState(prev => ({
            ...prev,
            score: prev.score + 200,
            moveCount: prev.moveCount + 1,
            inventory: [...prev.inventory, item],
            roomItems: prev.roomItems.map(i => 
              i.id === item.id ? { ...i, exitTrigger: true } : i
            ),
          }));
          setDisplayFastText(null);
          setDisplayText(`You picked up ${item.name}!`);
          if (item.deathTrigger === 'take') handleDeath();
        }
        return;
      }

      if (verb === 'attack') {
        if (!item.isAttackable) {
          setGameState(prev => ({ ...prev, score: prev.score - 100 }));
          setDisplayFastText(null);
          setDisplayText(`You cannot Attack the ${item.name}, sorry!`);
        } else {
          setDisplayFastText(null);
          setDisplayText(item.attackResponse || '');
          if (item.triggersOn === 'attack') {
            setGameState(prev => ({
              ...prev,
              moveCount: prev.moveCount + 1,
              score: prev.score + 200,
              roomItems: prev.roomItems.map(i => 
                i.id === item.id ? { ...i, exitTrigger: true } : i
              ),
            }));
          }
          if (item.deathTrigger === 'attack') handleDeath();
        }
        return;
      }

      if (verb === 'talk') {
        if (!item.isTalkable) {
          setGameState(prev => ({ ...prev, score: prev.score - 100 }));
          setDisplayFastText(null);
          setDisplayText(`You can't talk to ${item.name}! Sorry!`);
        } else {
          setTargetedObject(item);
          setDisplayFastText(null);
          setDisplayText(item.talkResponse || '');
          setGameState(prev => ({
            ...prev,
            moveCount: prev.moveCount + 1,
            roomItems: prev.roomItems.map(i => 
              i.id === item.id ? { ...i, exitTrigger: true } : i
            ),
          }));
          if (item.deathTrigger === 'talk') handleDeath();
        }
        return;
      }
    }

    // System commands
    if (['h', 'help'].includes(verb)) {
      setDisplayText(null);
      setDisplayFastText(`Interact with the world by using commands on objects in it.
Format your messages in the form of a COMMAND OBJECT
Not all commands will work on all objects! ex You can't TAKE a person or TALK to a window!

~~~ COMMANDS ~~~
INSPECT: Inspect an object to receive a detailed description of that object
TAKE: Take an object to add it to your inventory
TALK: Talk to an object/person and they might talk back!
USE: Use an item in your inventory on an object in the room.
ATTACK: Attack an object/person in the room

~~~ ADDITIONAL OPTIONS ~~~
H: Type H for the Help menu
I: Type I to view the items you are currently carrying
R: Type R to return to the description of the room you are currently in
E: Type E to exit the room you are currently in, this will only work when you have cleared the room's objectives`);
      return;
    }

    if (['i', 'inventory'].includes(verb)) {
      if (gameState.inventory.length > 0) {
        const invText = gameState.inventory.map(i => i.name).join(', ');
        setDisplayFastText(null);
        setDisplayText(invText);
      } else {
        setDisplayFastText(null);
        setDisplayText('Your inventory is empty!');
      }
      return;
    }

    if (['r', 'return'].includes(verb)) {
      const room = getRoomById(gameState.currentRoom);
      if (room) {
        setDisplayText(null);
        setDisplayFastText(`${room.name}:\n\n${room.description}`);
      }
      return;
    }

    if (['e', 'exit'].includes(verb)) {
      if (gameState.roomItems.every(i => i.exitTrigger)) {
        const room = getRoomById(gameState.currentRoom);
        setGameState(prev => ({
          ...prev,
          currentRoom: prev.currentRoom + 1,
          score: prev.score + 1000,
          moveCount: 0,
        }));
        setDisplayFastText(null);
        setDisplayText(`You have successfully left the ${room?.name}! Type 'Enter' to continue to the next room.`);
      } else {
        const room = getRoomById(gameState.currentRoom);
        setDisplayFastText(null);
        setDisplayText(`You have not yet met the requirements to exit the ${room?.name}. There's some more to do! Hit 'r' to return to the room's description, and 'h' if you need a refresher on your options.`);
      }
      return;
    }

    if (verb === 'enter') {
      const room = getRoomById(gameState.currentRoom);
      if (room) {
        setDisplayFastText(null);
        setDisplayText(room.introDescription);
      }
      return;
    }
  };

  // Restart game
  const restartGame = () => {
    setGameState({
      isStarted: false,
      playerName: '',
      playerEmail: '',
      currentRoom: 1,
      score: 0,
      moveCount: 0,
      inventory: [],
      isDead: false,
      hasWon: false,
      roomItems: [],
      startTime: null,
    });
    setDisplayText(null);
    setDisplayFastText(null);
    setTargetedObject(null);
    setElapsedTime({ minutes: 0, seconds: 0 });
  };

  // Start screen
  if (!gameState.isStarted) {
    return (
      <div className="game-container">
        <div className="start-screen">
          <h1 className="terminal-glow">STUCK IN SPACE</h1>
          <p style={{ color: 'var(--color-terminal-dim)', marginBottom: '2rem', maxWidth: '500px' }}>
            You wake up in an alien spaceship. Can you escape before they probe you?
          </p>
          <form onSubmit={startGame} className="start-form">
            <div className="form-group">
              <label htmlFor="name">Enter your name, traveler:</label>
              <input
                id="name"
                type="text"
                value={gameState.playerName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setGameState(prev => ({ ...prev, playerName: e.target.value }))
                }
                placeholder="Your name..."
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email (optional, for leaderboard):</label>
              <input
                id="email"
                type="email"
                value={gameState.playerEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setGameState(prev => ({ ...prev, playerEmail: e.target.value }))
                }
                placeholder="your@email.com"
              />
            </div>
            <button type="submit" className="start-button">
              BEGIN ADVENTURE
            </button>
          </form>
          <Link href="/leaderboard" className="nav-link" style={{ marginTop: '2rem' }}>
            View Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  // Death screen
  if (gameState.isDead) {
    return (
      <div className="overlay death">
        <h2 className="terminal-glow">YOU DIED</h2>
        <p style={{ fontSize: '1.5rem', maxWidth: '600px' }}>
          Your journey ends here, lost among the stars.
        </p>
        <p style={{ color: 'var(--color-terminal-dim)' }}>
          Final Score: {gameState.score} | Time: {elapsedTime.minutes}m {elapsedTime.seconds}s
        </p>
        <button onClick={restartGame}>TRY AGAIN</button>
        <Link href="/leaderboard" className="nav-link" style={{ marginTop: '1rem' }}>
          View Leaderboard
        </Link>
      </div>
    );
  }

  // Win screen
  if (gameState.hasWon) {
    return (
      <div className="overlay win">
        <h2 className="terminal-glow">YOU ESCAPED!</h2>
        <p style={{ fontSize: '1.5rem', maxWidth: '600px' }}>
          Against all odds, you made it home. Well done, agent.
        </p>
        <p style={{ color: 'var(--color-terminal-dim)' }}>
          Final Score: {gameState.score} | Time: {elapsedTime.minutes}m {elapsedTime.seconds}s
        </p>
        <button onClick={restartGame}>PLAY AGAIN</button>
        <Link href="/leaderboard" className="nav-link" style={{ marginTop: '1rem' }}>
          View Leaderboard
        </Link>
      </div>
    );
  }

  // Main game UI
  const room = getRoomById(gameState.currentRoom);

  return (
    <div className="game-container">
      <header className="header">
        <h1 className="terminal-glow">STUCK IN SPACE</h1>
        <nav style={{ marginTop: '0.5rem' }}>
          <Link href="/leaderboard" className="nav-link">Leaderboard</Link>
        </nav>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">ROOM:</span>
          <span>{room?.name || 'Unknown'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">SCORE:</span>
          <span>{gameState.score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">MOVES:</span>
          <span>{gameState.moveCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">TIME:</span>
          <span>{elapsedTime.minutes}:{elapsedTime.seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="display-area" onClick={() => inputRef.current?.focus()}>
        {displayFastText ? (
          <div className="typewriter-container" style={{ whiteSpace: 'pre-wrap' }}>
            {displayFastText}
          </div>
        ) : displayText ? (
          <div className="typewriter-container">
            <Typewriter
              key={displayText}
              options={{
                delay: 20,
                cursor: '',
              }}
              onInit={(typewriter) => {
                typewriter.typeString(displayText).start();
              }}
            />
          </div>
        ) : (
          <div className="typewriter-container" style={{ color: 'var(--color-terminal-dim)' }}>
            Type &apos;h&apos; for help...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-area">
        <span className="input-prompt">stuck_in_space:\\&gt;</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
