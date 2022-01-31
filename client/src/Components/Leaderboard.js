import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(`/api/leaderboard`)
      .then((r) => r.json())
      .then((data) => {
        setLeaderboard(data);
        console.log(data)
      });
  }, []);

  let theLeaderboard = [...leaderboard]
    .sort((a, b) => a[1] - b[1])
    .reverse()
    .map((u) => `${u[0]} --- ${u[1]}\n\n`)
    .slice(0, 15);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard:</h1>
      <p>{theLeaderboard}</p>
    </div>
  );
};

export default Leaderboard;
