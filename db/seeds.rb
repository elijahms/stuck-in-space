puts 'Seeding Data'

# item seeding
Item.create(
  name: 'Window',
  is_takeable: false,
  description:
    "You look out the window, and realize you are among the stars. You can still see Earth, and judging from its distance, you have not been on this ship long. If you haven't figured it out already, you are on a space ship. How you got here? That's for you to figure out.",
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response:
    'You slam the window, but it is too sturdy to break... which is probably for the best, because if it did break, you would be pulled into the cold vacuum of space.',
  durability: 0.0,
  catalyst_item: 0,
  catalyst_response: nil,
  exit_trigger: true,
  triggers_on: nil,
  death_trigger: nil,
)
Item.create(
  name: 'Cellmate',
  is_takeable: false,
  description:
    'The man in the room with you has grown out his hair and beard, and gives off a strong odor. He seems like he has been here for a while.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: true,
  talk_response:
    " 'You're awake already? Most of the poor souls that I've shared this cell with are still asleep by now. Consider yourself unlucky, as you'll probably be awake through it all. ...Me? I got picked up a few weeks, months, maybe years ago. I've been told I'm not a 'proper specimen,' I'm too tight for the probe. \n 
  Anyway, they'll be in here any minute now to drag you away. \n Unless... \n You have any ideas? Between the two of us, there are plenty of classic 'break-out-of-jail' gambits we could pull.' \n
  1. Suggest he pretend to be sick-- you will call for help, and together you can overpower the guard. \n
  2. Suggest a fake prison fight-- you will hit him, and the guard will come break it up.",
  talk_choice_1:
    "Your cellmate lays on the ground, moaning and wailing. 'My stomach! I'm backed up! I'm just too tight! Nothing gets through!' Weirdly specific, but if you call the guard, this will definitely distract him.",
  talk_choice_2:
    " 'It's been so long since I've felt anything that I welcome pain. Hit me as hard as you can, so I can feel the sublime ecstasy of pleasure. Go on, do it! ' ",
  is_attackable: true,
  attack_response:
    " You punch your cellmate in the face. 'My nose! You broke my goddamn nose! What is wrong with you?! Guard!!!' Blood flowing down his face, he calls for the guard: a tall, smooth, grey alien temporarily deactivates the laser wall with a Keycard and enters your cell. The Guard seems surprised to see you awake, so you have a chance to surprise him.",
  durability: 1.0,
  catalyst_item: 0,
  catalyst_response: nil,
  exit_trigger: true,
  triggers_on: nil,
  death_trigger: nil,
)
Item.create(
  name: 'Lasers',
  is_takeable: false,
  description:
    'A blazing hot infrared laser wall, meant to keep you inside this cell. Anything that attmempted to pass through it would likely be reduced to ashes.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: true,
  talk_response:
    'You run up to the laser wall and call for help. Moments later, a tall, smooth, grey alien uses a Keycard to temporarily deactivate the laser wall and enters your cell. The Guard seems surprised to see you awake, so you have a chance to surprise him.',
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response:
    'You attempt to punch the laser wall, and your entire arm is incinerated. You catch on fire and die.',
  durability: 0.0,
  catalyst_item: 5,
  catalyst_response:
    'You wave your Keycard at the Lasers, and they temporarily turn off. You may now EXIT the room freely.',
  exit_trigger: false,
  triggers_on: 'use',
  death_trigger: 'attack',
)
Item.create(
  name: 'Guard',
  is_takeable: false,
  description:
    "A tall, smooth, grey alien. Pretty generic as far as aliens go. Don't feel bad about attacking him, because they abducted you and were going to probe you. Also, he's a prison guard. ACAB.",
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: true,
  talk_response:
    "You attempt to reason with the alien Guard. He seems to understand what you're saying-- perhaps these aliens have developed a universal translator. That being said, he does not seem particularly sympathetic to your situation. He shoots lasers from his eyes and you are burned alive. You die.",
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response:
    'You punch the alien Guard in the face. Your fist tears through his soft, jelly-like flesh and you pulverize his brain. He falls dead to the floor and drops his Keycard. These aliens may look scary, but luckily for you, seem to be exceptionally weak.',
  durability: 0.0,
  catalyst_item: 0,
  catalyst_response: '',
  exit_trigger: false,
  triggers_on: 'attack',
  death_trigger: 'talk',
)

Item.create(
  name: 'Keycard',
  is_takeable: true,
  description:
    'A thin card held by the alien Guard. When waved at the laser wall, it lowers the Lasers and allows the holder to pass through.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: false,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: 0,
  catalyst_response: nil,
  exit_trigger: false,
  triggers_on: 'take',
  death_trigger: nil,
)
Item.create(
  name: 'Body',
  is_takeable: false,
  description:
    "The Body sprawled out on the table died with a smirk on his face, despite his cruel fate. His stomach has been cut open, and many organs have been removed. But even in this state, you can tell that this man was once quite handsome and, if you're checking, well-endowed. There seems to be something bulging out of a corner of his stomach.",
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: true,
  talk_response:
    'You attempt to speak to the dead body, but there is no response. Not sure what you were expecting--a witty retort?',
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response: 'You attack the dead body. It does not fight back.',
  durability: 0.0,
  catalyst_item: 7,
  catalyst_response:
    "You cut the body open with the surgical Knife, and inside of the body's stomach, discover a USB.",
  exit_trigger: true,
  triggers_on: '',
  death_trigger: nil,
)
Item.create(
  name: 'Knife',
  is_takeable: true,
  description: 'A surgical Knife, presumably used for dissections.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: false,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: true,
  catalyst_response: nil,
  exit_trigger: true,
  triggers_on: '',
  death_trigger: nil,
)
Item.create(
  name: 'USB',
  is_takeable: true,
  description:
    'A USB-C drive, discovered hidden in the body of the dissected human. Why would it be there?',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: false,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: true,
  catalyst_response: nil,
  exit_trigger: true,
  triggers_on: '',
  death_trigger: nil,
)
Item.create(
  name: 'Desk',
  is_takeable: false,
  description:
    'A Desk, made of a foreign alien metal. On top of it sits a Computer. There a few empty drawers, and one locked drawer. You do not see a key for it anywhere nearby, but perhaps you could force it open.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response:
    'You smash the Desk, and try to rip open the desk drawer. After a few attempts, you force it open. Inside, you see various valuables collected from dissected humans. Most notably, a Wallet and an Omega Watch.',
  durability: 0.0,
  catalyst_item: 5,
  catalyst_response:
    "You wave the guard's Keycard near the locked drawer, and it pops open. Inside, you see various valuables collected from dissected humans. Most notably, a Wallet and an Omega Watch.",
  exit_trigger: true,
  triggers_on: '',
  death_trigger: nil,
)
Item.create(
  name: 'Watch',
  is_takeable: true,
  description:
    "A platinum Watch, very expensive, definitely out of your price range. It ticks and tells time, but seems to have a number of knobs and buttons whose functions you don't recognize.",
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: false,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: true,
  catalyst_response: '',
  exit_trigger: true,
  triggers_on: '',
  death_trigger: nil,
)
Item.create(
  name: 'Wallet',
  is_takeable: true,
  description:
    'A leather Wallet containing several passports with different identities, and £50,000 cash.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: false,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: true,
  catalyst_response: '',
  exit_trigger: true,
  triggers_on: '',
  death_trigger: nil,
)
Item.create(
  name: 'Computer',
  is_takeable: false,
  description:
    'An alien Computer, closely resembling the kind found on Earth. The information on the screen is in alien characters, so you cannot navigate through it. It does, weirdly enough, have a USB-C slot.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response:
    "You attack the computer. Yes, 'the files are in the computer', but that's not the way to get them out.",
  durability: 0.0,
  catalyst_item: 8,
  catalyst_response:
    "You insert the USB-C drive into the Computer, and a message in English begins to display on the screen: \n
  Bond, \n
  If you're reading this message, the plan to have you abducted has gone swimmingly.\n I hope the USB drive didn't give you too much trouble coming out the other end.\n The information from the alien Computer has been downloaded to this drive, which will give us a great advantage in preventing future abductions.\n You have served Queen and Country again, now use the Teleporter and escape the ship. If you run into any of the buggers-- remember your Watch, it's quite an eyesore. \n \n God speed, James. \n -Q",
  exit_trigger: true,
  triggers_on: '',
  death_trigger: nil,
)
Item.create(
  name: 'Teleporter',
  is_takeable: false,
  description:
    "The teleporter is an impressive piece of alien technology. A touch screen with a blueprint of the ship determines your destination, currently set to the Airlock and Escape Pods, conveniently for you. Inconvenient however-- the Teleporter seems to be on the fritz; sparks and static seem to be coming from the machine. \n 1. Use the Teleporter \n 2. Reconsider",
  inspect_choice_1:
    "Hearing the steps of nearby aliens, you know you don't have time to worry about the state of the Teleporter. You hit the START button, ready to escape, but as it begins to whirr, smoke comes out of the machine and the machine reduces you to a pile of fleshy goop on the floor. You are dead.",
  inspect_choice_2:
    'You do not use the Teleporter. Is there a reliable, old fashioned way to get a complicated piece of tech working?',
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response:
    'You smack the teleporter a few times, and all the sparks and static cease. It seems to be back to working perfectly. You may now EXIT the room.',
  durability: 0.0,
  catalyst_item: 8,
  catalyst_response:
    'You attempt to insert the USB-C drive into the Teleporter, but it only has USB-A and CD-ROM. Technology can be a pain in the butt. ',
  exit_trigger: false,
  triggers_on: 'attack',
  death_trigger: '1',
)
Item.create(
  name: 'Crew',
  is_takeable: false,
  description:
    "The alien Crew. Over a dozen-- they do not carry weapons but their eyes are glowing and fixed on your location. They have you surrounded in all directions, blocking your way to the ship's exit. They await your surrender.",
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: true,
  talk_response:
    "An alien speaks: 'There's no version of this where you make it out alive. Even if you had made it to the Escape Pods, our auto targeting system would blow you to pieces. Surrender or die, human scum. The road ends here. You are stuck in space.' \n
  1. Surrender to the aliens and accept the probe \n
  2. Make a defiant quip and buy yourself some time",
  talk_choice_1:
    "'You've made a wise choice, human scum. The experiments we perform on your colon will lead to great innovations for our people.' \n 
  As the aliens accept your surrender, the glow in their eyes lessens. You may have bought yourself another moment.",
  talk_choice_2:
    'You search your mind for a moment, trying to think of the perfect quip. It is hard to be clever on demand.',
  is_attackable: true,
  attack_response:
    "You punch the nearest alien in the face; your fist tears through his soft, jelly-like flesh. You swing on two more aliens, destroying them instantly. But there are still many to deal with and one alien gives the order: 'Fire.'\n
    The alien Crew focuses on your with their glowing eyes, and they shoot red hot glowing lasers from their pupils. You are vaporized by the aliens' eye lasers. You are dead.",
  durability: 0.0,
  catalyst_item: 10,
  catalyst_response:
    "You take out the Watch you found earlier, frantically turning dials and pushing buttons. The face of the Watch displays a message: 'Device Armed.' \n
    You push down on the dial and a blinding white flash fills the room. Alien screams echo through the hallway, as their glowing eyes explode and set fire to the rest of their bodies. You think of the perfect quip: 'I thought you only had eyes for me.' \n Every alien in sight is dead-- you may now EXIT the hallway and head for the Escape Pods and Airlock.",
  exit_trigger: false,
  triggers_on: 'use',
  death_trigger: 'attack',
)
Item.create(
  name: 'Bowtie',
  is_takeable: true,
  description:
    'A very classy black Bowtie, clearly belonging to a very classy man.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: nil,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: nil,
  catalyst_response: nil,
  exit_trigger: true,
  triggers_on: nil,
  death_trigger: nil,
)
Item.create(
  name: 'Escape-Pods',
  is_takeable: false,
  description:
    "You walk up to the Escape Pods. A small rocketship with basic rudimentary controls. You believe this pod will be enough to get you back to Earth. If you take it, this could finally be the end of your odyssey. \n
    1. Get in the Escape Pod and launch it. \n
    2. Launch an empty Escape Pod into space.",
  inspect_choice_1:
    "You get into the Escape Pod and launch yourself into space. You are able to figure out the basic controls and begin flying back toward Earth. As you finally exhale and feel safe, the sirens of your ship begin to flash and alarm. You look out the window of your ship and see a massive torpedo, fired from the alien mothership, heading in your direction. This is the last thing you see before you die. \n \nYou are dead.",
  inspect_choice_2:
    'To test the controls, or perhaps because you were feeling skittish, you launch an empty Escape Pod into space. And whether it was luck or foresight--you made the right decision. Seconds after the Escape Pod is launched, a torpedo from the alien mothership is launched and destroyds the Escaped Pod. They know that this is your way off the ship.',
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: nil,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: nil,
  catalyst_response: nil,
  exit_trigger: false,
  triggers_on: 'inspect',
  death_trigger: '1',
)
Item.create(
  name: 'Engineer',
  is_takeable: false,
  description:
    "Judging from the difference in anatomical features, you surmise the alien Engineer to be the first alien woman you've seen on the ship. She is wearing a grease-covered jumpsuit and holding a wrapped package in her arms. She seemed to be watching the door expecting someone to arrive, but when it was you, her eyes filled with disappointment.",
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: true,
  talk_response:
    "The alien Engineer speaks English, but in an accent foreign to your world:\n 'You aren't James. Where is he, human? Do you know him? He is a magnificent gentleman of class. Women want him and men want to be him. It was out of love and desire for him that I've betrayed my own kind to save yours. He told me to meet him here in the Airlock and aid in his escape. But it's you I see here now. And you're no James Bond.' \n Your chances of escaping this ship are slim without the help of the Engineer, and she is in no emotional state to assist you. \n
  1. Comfort the Engineer on her loss. \n
  2. Seduce the Engineer",
  talk_choice_1:
    "You put your hand on the Engineer's shoulder and attempt to comfort her. \n 'If only I had something to remember him by. He was such a classy man. A species that could produce a man so elegant does not deserve the cruel fate we have in store for Earth.' ",
  talk_choice_2:
    "You put your hand on the small of the Engineer's back and attempt to seduce her. She recoils. \n
  'Once you've eaten Zandarian Space Worm you don't want Gylorkian Sand Rat.' You don't exactly understand her metaphor but you get the gist. \n
  Is there a way to make yourself more classy and win the Engineer's love?",
  is_attackable: true,
  attack_response:
    'You punch the Engineer in the face. You were expecting her face to collapse like all the previous aliens, but instead it feels like you punched a steel wall.  The Engineer pushes you into a wall and it feels like you have been hit by a truck. She grabs you and tosses you around the room like a piñata, slamming you against the walls and ceiling as you feel the life leave your body. You wish you knew that the women of this species have skin as hard as stone and the strength of ten humans. You are dead.',
  durability: 0.0,
  catalyst_item: 15,
  catalyst_response:
    "You put on the classy Bowtie and approach the Engineer. Her eyes are filled with a healthy mixture of sadness and desire. She pulls you in, quite forcefully, and plants a kiss on your lips. Honestly, it feels kind of not-great. \n
  'Thank you, sexy Earth-man. You have reminded me of why I decided to save your species in the first place. The hot dudes. \n
  Do not take the Escape-Pods, the radar of the mothership will pick your presence up and destroy your ship imminently. Your best hope is to open the Airlock and float through space--you will be too small for our radar and with some luck, a human vessel will retrieve you. \n 
  Please take these items: a human Spacesuit, and my Authenticator, needed to access the Terminal and open the Airlock.\n
  Maybe one day, our people will be able to live in peace. And bang.",
  exit_trigger: false,
  triggers_on: 'use',
  death_trigger: 'attack',
)
Item.create(
  name: 'Spacesuit',
  is_takeable: true,
  description:
    'A spacesuit, made by the aliens but specifically tailored and specially rigged for a human body. Built for the body of a larger, more attractive man, but it will fit.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: nil,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: nil,
  catalyst_response: nil,
  exit_trigger: false,
  triggers_on: 'take',
  death_trigger: nil,
)
Item.create(
  name: 'Authenticator',
  is_takeable: true,
  description:
    "An alien Authenticator, a pocket-sized device that when waved in front of a locked Computer or Terminal, activates it with the owner's credentials.",
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: nil,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: nil,
  catalyst_response: nil,
  exit_trigger: false,
  triggers_on: 'take',
  death_trigger: nil,
)
Item.create(
  name: 'Terminal',
  is_takeable: false,
  description:
    'A computer Terminal that controls the Airlock. It seems easy enough to operate, with OPEN and CLOSE buttons, but it seems to be locked behind a login.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: nil,
  attack_response: nil,
  durability: 0.0,
  catalyst_item: 19,
  catalyst_response:
    "You wave the Authenticator in front of the Terminal, and the screen displays a message in the alien language. The Terminal's keyboard lights up, indicating it is ready to be activated and the Airlock doors can be opened.",
  exit_trigger: false,
  triggers_on: 'use',
  death_trigger: nil,
)
Item.create(
  name: 'Airlock',
  is_takeable: false,
  description:
    'A large blast door, controlled by a nearby Terminal. When opened, will expose the room to the void of space, sucking out everything not tied down. Without a proper space suit, opening the Airlock means the certainty of a cold death. With a proper space suit, opening the Airlock means the certain uncertainty of being alone in the vastness of space. The door seems to have a bit of rust sealing it shut--it clearly has not been used for some time.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: false,
  talk_response: nil,
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response:
    'You smash into the doors of the Airlock, and with each smash, you feel the hinges of the door loosening up and shedding the rust that binds it closed. After a few attempts, you feel confident that the Terminal will open the Airlock.',
  durability: 0.0,
  catalyst_item: nil,
  catalyst_response: nil,
  exit_trigger: false,
  triggers_on: 'attack',
  death_trigger: nil,
)
Item.create(
  name: 'Bezos',
  is_takeable: false,
  description:
    'Jeff Bezos, in all his glory. Bald, wearing a cowboy hat, totally ripped, and totally going through a mid-life crisis.',
  inspect_choice_1: nil,
  inspect_choice_2: nil,
  is_talkable: true,
  talk_response:
    "Welcome to the Amazon Blue Origins Cruise Line! You're lucky we found you. I won't ask how you ended up here--but here's hoping it's because you're the lone survivor of a SpaceX rocket explosion. \n
  Let's get down to brass tax--this is our luxury liner, so I can't let you ride for free. I'd love to, I really would, but I have shareholders to answer to. It's my fiduciary responsibility to throw you out of the airlock if you can't pay.",
  talk_choice_1: nil,
  talk_choice_2: nil,
  is_attackable: true,
  attack_response:
    "You punch Jeff Bezos in the face, living the dream of many across the world. It feels amazing. Unfortunately, Jeff Bezos is ripped now. In a blazing flash of Kung Fu, he attacks all of your body's pressure points and your heart stops. 
  'I'll get your body home in 2 days or less. That's the Prime guarantee.'
  You are dead. ",
  durability: 0.0,
  catalyst_item: 11,
  catalyst_response:
    "You hand Jeff Bezos the Wallet with £50,000 cash. He opens it up and thumbs through the money. \n
  'This is enough for your initial deposit. We will fly you home, and charge you the rest on your Amazon card.' \n
  Bezos allows you in to the luxurious ballroom, where you socialize with all of Earth's most beautiful celebrities. \n
  You have escaped the aliens, you are no longer stuck in space. When you return to Earth you will be very influential and wealthy. \n
  You hear a voice, you think it's that of former president Barack Obama: \n
  'Now let me be clear--you've won the game. Hit EXIT to finish the game and view your high score on the leaderboard. God Bless America.'",
  exit_trigger: false,
  triggers_on: 'use',
  death_trigger: 'attack',
)

#Room seeding
Room.create(
  name: 'Cell',
  description:
    'Beneath you, you feel the silent hum of an engine; the floors and walls are made of metal, except for one wall which looks to be made of powerful Lasers. You appear to be in some sort of cell. Additionally, the room has one Window and there seems to be a man, perhaps your Cellmate, babbling to himself nearby.',
  death_threshold: 5,
  death_threshold_met:
    'Two tall, grey, smooth aliens enter the room, one wearing a military-like garb and the other a lab coat. They are surprised to see you awake, but do not panic. The one in military garb points a small device at you, and you experience a quick shock followed by full-body-paralysis. They carry you through the alien ship and to a laboratory like room, where you are probed. You do not survive the process. You are dead.',
  intro_description:
    'You open your eyes, awakening from a slumber. You feel groggy, and you do not recognize the place you are in. Your cellphone has no service. Beneath you, you feel the silent hum of an engine; the floors and walls are made of metal, except for one wall which looks to be made of powerful Lasers. You appear to be in some sort of cell. Additionally, the room has one Window and there seems to be a man, perhaps your Cellmate, babbling to himself nearby.',
)
Room.create(
  name: 'Laboratory',
  description:
    "You find yourself in some sort of Laboratory--a dissected human Body is displayed on a surgical table next to a surgical Knife and other instruments. Nearby is a scientist's Desk and on it, a Computer. On the other end of the room, you see a device that resembles the classic Star Trek 'beam me up Scotty' Teleporter, with a blueprint of the ship on a screen.",
  death_threshold: 10,
  death_threshold_met:
    'You hear a pounding on the door, followed by a long silence. Just as you think you are safe, the vents in the room let out a green gas, that, in addition to killing you, smells quite terrible.',
  intro_description:
    "You've escaped your cell, but hear the footsteps of more aliens quickly approaching. You open the door to the nearest room and shut the door behind you. You find yourself in some sort of Laboratory--a dissected human Body is displayed on a surgical table next to a surgical Knife and other instruments. Nearby is a scientist's Desk and on it, a Computer. On the other end of the room, you see a device that resembles the classic Star Trek 'beam me up Scotty' Teleporter, with a blueprint of the ship on a screen.",
)

Room.create(
  name: 'Hallway',
  description:
    "You are in a hallway. The door to the ship's Escape Pods and Airlock is across from you, but blocked by a large number of the alien Crew. They have you surrounded in all directions. They are too numerous to fight off.",
  death_threshold: 6,
  death_threshold_met:
    "The alien Crew, with their laser eyes fixed on your position, await your surrender. After some time, they realize you have been stalling and their captain gives the order: \n
  'Fire.' \n
  The aliens' eyes glow with a red intensity, and lasers shoot toward you. You are reduced to a pile of ash on the floor. You are put in a dustbin and placed in the garbage. You are dead.",
  intro_description:
    "You emerge from the Teleporter--the feeling of your molecules being disassembled and reassembled was unnerving but all things considered, quite seamless. You are in a hallway, and across from you is the door to the Escape Pods and Airlock. Standing between you and salvation, however, is a large number of the ship's alien Crew. One of them speaks to you: \n 'You have done well to make it this far, human scum. But this is the end of the road for you. Surrender or die.",
)

Room.create(
  name: 'Airlock',
  description:
    'You are at the entrance to the Airlock, located deep in the bowels of the ship. When activated, a large automatic door will open up to the vastness of space, sucking out anything not tied down. The doors are controlled by a Terminal next to the doors. This room also contains the Escape-Pods, with controls to launch them. An alien Engineer, who from her features seems to be a female, is waiting by the Escape-Pods with a package in hand.',
  death_threshold: 15,
  death_threshold_met:
    "A voice fills the room of the Airlock: \n
  'I know you are in there, human scum. You have dozens of my crew, and I will exact my revenge one hundred fold. \n
  The humans of your planet will pay the price for your actions. You and the traitorous concubine Engineer will die in the cold.'\n
  The sirens in the room activate, red lights flash and the doors to the Airlock begin to open. You are sucked into the vast emptiness of space. \n
  You are dead. You will be Stuck in Space forever.
  ",
  intro_description:
    "After activating your Watch gadget and burning out the eyes of the alien crew, you escape into the Airlock room. When you enter, you are startled by the presence of an alien woman, who seems to be the ship's Engineer, based on her jumpsuit and grease stains. The Airlock room contains a large automatic door that opens up to the vastness of space, sucking out anything not tied down. The door is controlled by a Terminal. This room also contains the Escape-Pods, with controls to launch them. You are so close to getting home.",
)

Room.create(
  name: 'Blue Origin Space Cruise',
  description:
    "You are in the luxury ballroom of the Amazon Blue Origin space cruiser. A string quartet plays Schubert's 13th as the glamorous and beautiful celebrities mingle. The servants are hard at work, serving hors d'oeuvres on sterling silver plates and refilling wine glasses. You are greeted by Bezos, wearing a cowboy hat, but his Goons block your entrance to the ballroom.'",
  death_threshold: 10,
  death_threshold_met:
    "Jeff Bezos grows agitated as he awaits your payment: \n
  'You know, I'd love to help you but... no free rides. It's the rules of the road: gas, grass or ass.' \n
  He turns his head as he hears one of his celebrity friends call his name. You think that might have been Jay-Z's voice. \n
  He snaps his fingers and his Amazon Goons grab you by the shoulders. They drag you toward the ship's Airlock and throw you in. \n
  The doors open and you are sucked into space, where you die in the cold vastness of space. You are dead. You will be Stuck in Space forever.
",
  intro_description:
    "You put on your Spacesuit and activate the ship's Airlock. You are sucked into space, and you can see the alien mothership drift by. After a few minutes, the mothership flies away, back to the alien homeworld. You have successfully escaped the aliens. \n
  But now, you are alone, Stuck in Space. (That's the title of the game)\n
  Your odds of survival are low, and you float alone in space for many hours, your hope dwindling.\n
  Miraculously, a spaceship heading in the direction of Earth flies nearby. Through the cockpit windows you can see a man in a cowboy hat. It does not suit him, \n
  The ship stops for you and picks you up. You are let in via the Airlock and walked through the cargo hold by workers wearing bright orange vests. \n
  You are led to the stairs, and the orange vest workers tell you 'We cannot accompany you any further.' \n
  You head up the stairs, and you find yourself in the luxury ballroom of the Amazon Blue Origin space cruiser. A string quartet plays Schubert's 13th as the glamorous and beautiful celebrities mingle. The servants are hard at work, serving hors d'oeuvres on sterling silver plates and refilling wine glasses. You are greeted by Bezos, wearing a cowboy hat, but his Goons block your entrance to the ballroom.",
)

ItemLocation.create(item_id: 1, room_id: 1, is_in: true)
ItemLocation.create(item_id: 2, room_id: 1, is_in: true)
ItemLocation.create(item_id: 3, room_id: 1, is_in: true)
ItemLocation.create(item_id: 4, room_id: 1, is_in: true)
ItemLocation.create(item_id: 5, room_id: 1, is_in: true)
ItemLocation.create(item_id: 6, room_id: 2, is_in: true)
ItemLocation.create(item_id: 7, room_id: 2, is_in: true)
ItemLocation.create(item_id: 8, room_id: 2, is_in: true)
ItemLocation.create(item_id: 9, room_id: 2, is_in: true)
ItemLocation.create(item_id: 10, room_id: 2, is_in: true)
ItemLocation.create(item_id: 11, room_id: 2, is_in: true)
ItemLocation.create(item_id: 12, room_id: 2, is_in: true)
ItemLocation.create(item_id: 13, room_id: 2, is_in: true)
ItemLocation.create(item_id: 15, room_id: 2, is_in: true)
ItemLocation.create(item_id: 14, room_id: 4, is_in: true)
ItemLocation.create(item_id: 16, room_id: 4, is_in: true)
ItemLocation.create(item_id: 17, room_id: 4, is_in: true)
ItemLocation.create(item_id: 18, room_id: 4, is_in: true)
ItemLocation.create(item_id: 19, room_id: 4, is_in: true)
ItemLocation.create(item_id: 20, room_id: 4, is_in: true)
ItemLocation.create(item_id: 21, room_id: 4, is_in: true)
ItemLocation.create(item_id: 22, room_id: 5, is_in: true)

Inventory.create(user_id: 1, item_id: 1, has: false)
Inventory.create(user_id: 1, item_id: 2, has: false)
Inventory.create(user_id: 1, item_id: 3, has: false)
Inventory.create(user_id: 2, item_id: 1, has: false)
Inventory.create(user_id: 2, item_id: 2, has: false)
Inventory.create(user_id: 2, item_id: 3, has: false)
Inventory.create(user_id: 3, item_id: 1, has: false)
Inventory.create(user_id: 3, item_id: 2, has: false)
Inventory.create(user_id: 3, item_id: 3, has: false)
Inventory.create(user_id: 4, item_id: 1, has: false)
Inventory.create(user_id: 4, item_id: 2, has: false)
Inventory.create(user_id: 4, item_id: 3, has: false)
Inventory.create(user_id: 5, item_id: 1, has: false)
Inventory.create(user_id: 5, item_id: 2, has: false)
Inventory.create(user_id: 5, item_id: 3, has: false)

puts 'done seeding'
