import { useState, useEffect } from "react";

const SubmitBox = ({
  setDisplayText,
  setCurrRoom,
  currRoom,
  setMoveCount,
  moveCount,
  setDeathElement,
  setScore,
  score,
  userDetails,
  minute,
  second,
  setDisplayFastText,
}) => {
  //State and Variables of the Submit Box
  const [sub, setSub] = useState(null);
  const [items, setItems] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [targetedObject, setTargetedObject] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [prevRoomInfo, setPrevRoomInfo] = useState([]);

  let itemNames = [...items].map((i) => i.name.toLowerCase());
  function handleChange(e) {
    setSub(e.target.value);
  }

  //Use-effect loads the rooms and items
  useEffect(() => {
    fetch(`api/room/${currRoom}`)
      .then((r) => r.json())
      .then((data) => {
        setRoomInfo((roomInfo) => {
          setPrevRoomInfo(roomInfo);
          return data;
        });
      });

    fetch(`/api/item/${currRoom}`)
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
      });
  }, [currRoom]);

  //handleSubmit is the brunt of the app
  function handleSubmit(e) {
    e.preventDefault();
    let input = sub.split(" ");
    if (roomInfo.death_threshold === moveCount) {
      if (items.every((i) => i.exit_trigger !== true)) {
        setDisplayFastText(null);
        setDisplayText(roomInfo.death_threshold_met);
        handleDeath();
      }
    }
    if (currRoom === 5 && items.every((i) => i.exit_trigger === true)) {
      triggerWin();
    }
    if (targetedObject) {
      if (targetedObject.talk_choice_1) {
        if (input[0] === "1") {
          setDisplayFastText(null);
          setDisplayText(targetedObject.talk_choice_1);
          if (targetedObject.death_trigger === "1") {
            handleDeath();
          }
          e.target.reset();
        } else if (input[0] === "2") {
          setDisplayFastText(null);
          setDisplayText(targetedObject.talk_choice_2);
          e.target.reset();
          if (targetedObject.death_trigger === "2") {
            handleDeath();
          }
        } else {
          setDisplayFastText(null);
          setDisplayText(
            `ENTER "1" or "2" TO ANSWER THIS PROMPT: ${targetedObject.talk_response}`
          );
        }
      }
      if (targetedObject.inspect_choice_1) {
        if (input[0] === "1") {
          setDisplayFastText(null);
          setDisplayText(targetedObject.inspect_choice_1);
          e.target.reset();
          if (targetedObject.death_trigger === "1") {
            handleDeath();
          }
        } else if (input[0] === "2") {
          setDisplayFastText(null);
          setDisplayText(targetedObject.inspect_choice_2);
          e.target.reset();
          if (targetedObject.death_trigger === "2") {
            handleDeath();
          }
        } else {
          setDisplayFastText(null);
          setDisplayText(
            `ENTER "1" or "2" TO ANSWER THIS PROMPT: ${targetedObject.description}`
          );
        }
      }
    }
    if (input[0].toLowerCase() === "use" && input.length >= 3) {
      let invtext = inventory.map((i) => i.name.toLowerCase());
      if (
        invtext.includes(input[1].toLowerCase()) &&
        itemNames.includes(input[input.length - 1].toLowerCase())
      ) {
        handleUse(input[1], input[input.length - 1]);
      } else {
        setDisplayFastText(null);
        setDisplayText(
          `I didn't quite catch that. Remember the syntax for USE is: Use (item from inventory) on (item in room)`
        );
      }
    }
    if (
      ["inspect", "attack", "talk", "inventory", "take"].includes(
        input[0].toLowerCase()
      ) &&
      itemNames.includes(input[input.length - 1].toLowerCase())
    ) {
      let verb = input[0].toLowerCase();
      let item = input[input.length - 1];
      if (verb === "take") {
        handleTake(item);
      }
      if (verb === "inspect") {
        handleInspect(item);
      }
      if (verb === "attack") {
        handleAttack(item);
      }
      if (verb === "talk") {
        handleTalk(item);
      }
    } else if (
      [
        "h",
        "i",
        "r",
        "e",
        "help",
        "inventory",
        "return",
        "exit",
        "enter",
      ].includes(input[0].toLowerCase())
    ) {
      let verb = input[0].toLowerCase();

      if (verb === "h" || verb === "help") {
        handleHelp();
      }

      if (verb === "i" || verb === "inventory") {
        handleInventory();
      }

      if (verb === "r" || verb === "return") {
        handleReturn();
      }

      if (verb === "e" || verb === "exit") {
        handleExit();
      }
      if (verb === "enter") {
        handleEnter();
      }
    }
    e.target.reset();
  }

  //Function handles the "Use" verb on an Item
  function handleUse(usedItem, targetItem) {
    let foundItem = inventory.find(
      (i) => i.name.toLowerCase() === usedItem.toLowerCase()
    );
    let foundTarget = items.find(
      (i) => i.name.toLowerCase() === targetItem.toLowerCase()
    );
    if (foundItem.id === foundTarget.catalyst_item) {
      setDisplayFastText(null);
      setDisplayText(foundTarget.catalyst_response);
      setMoveCount((moveCount) => (moveCount += 1));
      foundTarget.exit_trigger = true;
    } else {
      setDisplayFastText(null);
      setDisplayText(
        `Using ${foundItem.name} on ${foundTarget.name} won't have any effect!`
      );
    }
  }
  //Triggers the 'death' component to load with a victory message
  function triggerWin() {
    setDisplayFastText(null);
    setDisplayText("You Wonnnn");
    setScore((score) => (score += 1000));
    setDeathElement(true);
  }
  //handles exit by iterating the score, and changing the room
  function handleExit() {
    if (items.every((i) => i.exit_trigger === true)) {
      setCurrRoom((currRoom) => currRoom + 1);
      setScore((score) => (score += 1000));
      setMoveCount(0);
      setDisplayFastText(null);
      setDisplayText(
        `You have successfully left the ${roomInfo.name}! Type 'Enter' to continue to the next room.`
      );
      console.log(currRoom);
    } else {
      setDisplayFastText(null);
      setDisplayText(
        `You have not yet met the requirements to exit the ${roomInfo.name}. There's some more to do! Hit 'r' to return to the room's description, and 'h' if you need a refresher on your options.`
      );
    }
  }

  function handleEnter() {
    setDisplayFastText(null);
    setDisplayText(`${roomInfo.intro_description}`);
  }

  function handleReturn() {
    setDisplayText(null);
    setDisplayFastText(`${roomInfo.name}:\n \n ${roomInfo.description}`);
  }

  function handleInventory() {
    if (inventory.length > 0) {
      let invtext = inventory.map((i) => i.name);
      setDisplayFastText(null);
      setDisplayText(invtext.toString());
    } else {
      setDisplayFastText(null);
      setDisplayText("Your inventory is empty!");
    }
  }

  function handleHelp() {
    setDisplayText(null);
    setDisplayFastText(`Interact with the world by using commands on objects in it. \n
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
        E: Type E to exit the room you are currently in, this will only work when you have cleared the room's objectives
        `);
  }

  // The function below handles the speaking-to of an item
  function handleTalk(item) {
    setDisplayFastText(null);
    let foundItem = items.find(
      (i) => i.name.toLowerCase() === item.toLowerCase()
    );

    setTargetedObject(foundItem);

    if (foundItem.is_talkable === false) {
      setScore((score) => (score -= 100));
      setDisplayText(`You can't talk to ${foundItem.name}! Sorry!`);
    }

    if (foundItem.is_talkable === true) {
      setDisplayText(foundItem.talk_response);
      foundItem.exit_trigger = true;

      if (foundItem.death_trigger === "talk") {
        handleDeath();
      }
      setMoveCount((moveCount) => (moveCount += 1));
    }
  }

  // The function below handles the attack of an item
  function handleAttack(item) {
    setDisplayFastText(null);
    let foundItem = items.find(
      (i) => i.name.toLowerCase() === item.toLowerCase()
    );
    if (foundItem.is_attackable === true) {
      setDisplayText(foundItem.attack_response);

      if (foundItem.death_trigger === "attack") {
        handleDeath();
      }

      if (foundItem.triggers_on === "attack") {
        foundItem.exit_trigger = true;
        setMoveCount((moveCount) => (moveCount += 1));
        setScore((score) => (score += 200));
      }
    } else {
      setDisplayText(`You cannot Attack the ${foundItem.name}, sorry!`);
      setScore((score) => (score -= 100));
    }
  }

  function handleInspect(item) {
    setDisplayFastText(null);
    let foundItem = items.find(
      (i) => i.name.toLowerCase() === item.toLowerCase()
    );
    setTargetedObject(foundItem);
    setDisplayText(foundItem.description);
    setMoveCount((moveCount) => (moveCount += 1));
    setScore((score) => (score += 100));
    console.log(foundItem.triggers_on);
    console.log(foundItem.exit_trigger);
    if (foundItem.death_trigger === "inspect") {
      handleDeath();
    }
    if (foundItem.triggers_on === "inspect") {
      foundItem.exit_trigger = true;
      console.log(foundItem.exit_trigger);
    }
    console.log(foundItem.description);
    return foundItem.description;
  }
  function handleTake(item) {
    setDisplayFastText(null);
    let foundItem = items.find(
      (i) => i.name.toLowerCase() === item.toLowerCase()
    );
    if (foundItem.is_takeable === false) {
      setScore((score) => (score -= 100));
      setDisplayText(`You can't Take the ${foundItem.name}! Sorry!`);
    } else {
      if (inventory.includes(foundItem)) {
        setDisplayText(`You already have the ${foundItem.name}!`);
      } else {
        foundItem.exit_trigger = true;
        if (foundItem.death_trigger === "take") {
          handleDeath();
        }
        setScore((score) => (score += 200));
        setInventory([...inventory, foundItem]);
        setDisplayText(`You picked up ${foundItem.name}!`);
        setMoveCount((moveCount) => (moveCount += 1));
      }
    }
  }

  function handleDeath() {
    setDisplayFastText(null);
    setDeathElement(true);
    fetch(`https://serene-island-13021.herokuapp.com/user/${userDetails.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: currRoom,
        score: score,
        minutes_in_game: minute,
        seconds_in_game: second,
      }),
    })
      .then((r) => r.json())
      .then((data) => {});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="terminal-text">stuck_in_space:\\</label>
        <input
          className="terminal-submit"
          autoFocus
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
};

export default SubmitBox;
