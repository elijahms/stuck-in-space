'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  roomReached: number;
  minutes: number;
  seconds: number;
  won: boolean;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      // Check if Firebase is configured
      if (!db) {
        setError('Firebase is not configured. Add your credentials to .env.local');
        setLoading(false);
        return;
      }

      try {
        const leaderboardRef = collection(db!, 'leaderboard');
        const q = query(
          leaderboardRef,
          orderBy('score', 'desc'),
          limit(50)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as LeaderboardEntry[];
        setEntries(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Unable to load leaderboard. Check Firebase configuration.');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="game-container">
      <header className="header">
        <h1 className="terminal-glow">LEADERBOARD</h1>
        <nav style={{ marginTop: '0.5rem' }}>
          <Link href="/" className="nav-link">← Back to Game</Link>
        </nav>
      </header>

      <div className="display-area" style={{ padding: '1.5rem' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-terminal-dim)' }}>
            Loading scores...
          </p>
        ) : error ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--color-terminal-dim)' }}>{error}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--color-terminal-dim)' }}>
              Configure your Firebase credentials in .env.local to enable the leaderboard.
            </p>
          </div>
        ) : entries.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-terminal-dim)' }}>
            No scores yet. Be the first to escape!
          </p>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th>Room</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                  <td>{entry.roomReached}/5</td>
                  <td>{entry.minutes}:{entry.seconds?.toString().padStart(2, '0') || '00'}</td>
                  <td style={{ color: entry.won ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                    {entry.won ? '★ ESCAPED' : 'DEAD'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
