import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

const GameStart = ({
  setCollectedUser,
  setCurrRoom,
  displayText,
  setDisplayText,
  setUserDetails,
}) => {
  const [checkUser, setCheckUser] = useState([]);
  const [form, setForm] = useState({
    username: "0",
    email: null,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetch(`/api/allusers`)
      .then((r) => r.json())
      .then((data) => {
        setCheckUser(data);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (form.username.length < 3 || form.email === null) {
      setDisplayText("Please enter a valid username and email.");
      e.target.reset();
    } else if (
      [...checkUser]
        .map((u) => u.toLowerCase())
        .includes(form.username.toLowerCase())
    ) {
      setDisplayText(
        `${form.username} is a taken username! Please select another. \n \n May we suggest:\n \n ${form.username}69\n ${form.username}420\n xX${form.username}Xx\n the_real_${form.username}`
      );
      e.target.reset();
    } else {
      fetch(`/api/newuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((r) => r.json())
        .then((data) => {
          setUserDetails(data);
        });
      setCollectedUser(true);
      setCurrRoom(1);
      setDisplayText(`Welcome ${form.username}, you've been abducted! \n \n \n Interact with the world by using commands on objects in it. \n
                Format your messages in the form of a COMMAND OBJECT \n
                Not all commands will work on all objects! ex You can't TAKE a person or TALK to a window! \n
                ~~~ COMMANDS ~~~ \n
                INSPECT: Inspect an object to receive a detailed description of that object \n
                TAKE: Take an object to add it to your inventory \n
                TALK: Talk to to an object/person and they might talk back! \n
                USE: Use an item in your inventory on an object in the room. \n
                ATTACK: Attack an object/person in the room \n
                ~~~ ADDITIONAL OPTIONS ~~~ \n
                H: Type H for the Help menu \n
                I: Type I to view the items you are currently carrying \n
                R: Type R to return to the description of the room you are currently in \n
                E: Type E to exit the room you are currently in, this will only work when you have cleared the room's objectives \n \n Type ENTER to start.`);
      e.target.reset();
    }
  }

  return (
    <div className="game-div">
      <Typewriter
        options={{
          strings: displayText,
          autoStart: true,
          wrapperClassName: "game-start",
          delay: 30,
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginTop: "3vh" }}
          autoComplete="off"
          className="no-outline"
          onChange={handleChange}
          name="username"
          placeholder="main://>>username"
          type="text"
        ></input>
        <input
          className="no-outline"
          autoComplete="off"
          onChange={handleChange}
          name="email"
          placeholder="main://>>email"
          type="email"
        ></input>
        <button className="play-button">Play</button>
      </form>
    </div>
  );
};

export default GameStart;
