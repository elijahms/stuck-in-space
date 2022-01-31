import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const Death = ({ displayText, score, userDetails }) => {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    fetch(`/api/leaderboard`)
      .then((r) => r.json())
      .then((data) => {
        setUserStats(data);
      });
  }, []);

  let leaderboard = [...userStats]
    .sort((a, b) => a[1] - b[1])
    .reverse()
    .map((u) => `${u[0]} --- ${u[1]}\n\n`)
    .slice(0, 10);

  return (
    <div>
      <Typewriter
        options={{
          strings: displayText,
          autoStart: true,
          wrapperClassName: "game-start",
          delay: 20,
        }}
      />
      <br />
      <p>
        Your Score: {userDetails.name}---{score}
      </p>
      <h3>Leaderboard:</h3>
      <p>{leaderboard}</p>
    </div>
  );
};

export default Death;
