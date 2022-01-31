import Score from "./Score";
import TimeInGame from "./TimeInGame";
import MoveCount from "./MoveCount";
import DisplayText from "./DisplayText";
import SubmitBox from "./SubmitBox";
import GameStart from "./GameStart";
import Death from "./Death";
import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

const Content = () => {
  const [collectedUser, setCollectedUser] = useState(false);
  const [score, setScore] = useState(10000);
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [displayFastText, setDisplayFastText] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [currRoom, setCurrRoom] = useState(0);
  const [deathElement, setDeathElement] = useState(false);
  const [displayText, setDisplayText] = useState(
    "Enter the realm of OUTER SPACE and attempt to make your way out, but beware of meteors, exploding satellites, and billionaires' vanity-project-rocketships! \n \n Enter a Username and Email"
  );

    useEffect(() => {
      if (collectedUser) {
        let totalSeconds = 0;
        let timeInterval = setInterval(setTime, 1000);
        function setTime() {
          ++totalSeconds;
          setSecond(pad(totalSeconds % 60));
          setMinute(pad(parseInt(totalSeconds / 60)));
        }

        function pad(val) {
          let valString = val + "";
          if (valString.length < 2) {
            return "0" + valString;
          } else {
            return valString;
          }
        }

        return () => {
          clearInterval(timeInterval);
        };
      }
    }, [collectedUser]);

  return (
    <div className="content-container">
      <Grid className="big-grid" container columns={3} stackable>
        <Grid.Column className="banner-1">
          <Score score={score} />
        </Grid.Column>
        <Grid.Column className="banner-2">
          <TimeInGame
            collectedUser={collectedUser}
            minute={minute}
            second={second}
            setMinute={setMinute}
            setSecond={setSecond}
            deathElement={deathElement}
          />
        </Grid.Column>
        <Grid.Column className="banner-3">
          <MoveCount currRoom={currRoom} moveCount={moveCount} />
        </Grid.Column>
      </Grid>
      {deathElement ? (
        <Death
          displayText={displayText}
          score={score}
          userDetails={userDetails}
        />
      ) : (
        <div>
          {!collectedUser ? (
            <GameStart
              setCollectedUser={setCollectedUser}
              setUserDetails={setUserDetails}
              displayText={displayText}
              setDisplayText={setDisplayText}
              setCurrRoom={setCurrRoom}
            />
          ) : (
            <div>
              <DisplayText
                displayText={displayText}
                setDisplayText={setDisplayText}
                displayFastText={displayFastText}
              />
              <SubmitBox
                setDealthElement={setDeathElement}
                displayText={displayText}
                setDisplayText={setDisplayText}
                setCurrRoom={setCurrRoom}
                currRoom={currRoom}
                setMoveCount={setMoveCount}
                moveCount={moveCount}
                setDeathElement={setDeathElement}
                setScore={setScore}
                score={score}
                userDetails={userDetails}
                minute={minute}
                second={second}
                setDisplayFastText={setDisplayFastText}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Content;
