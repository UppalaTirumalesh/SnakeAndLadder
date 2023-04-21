const WINNING_POSITION = 100;
let CURRENT_PLAYER_INDEX = 0;
let WINNER = null;
let playersList = localStorage.getItem("players");
let players = JSON.parse(playersList);

let boxes = document.querySelectorAll(".snakegame .box");

// let l = [...boxes].map(box => box.id);
// console.log(l);

const PLAYER_DIRECTION_CONFIG = {
  "0deg": ["b90", "b80", "b70", "b60", "b50", "b40", "b30", "b20", "b10"],
  "90deg": [
    "b01",
    "b02",
    "b03",
    "b04",
    "b05",
    "b06",
    "b07",
    "b08",
    "b09",
    "b21",
    "b22",
    "b23",
    "b24",
    "b25",
    "b26",
    "b27",
    "b28",
    "b29",
    "b41",
    "b42",
    "b43",
    "b44",
    "b45",
    "b46",
    "b47",
    "b48",
    "b49",
    "b61",
    "b62",
    "b63",
    "b64",
    "b65",
    "b66",
    "b67",
    "b68",
    "b69",
    "b81",
    "b82",
    "b83",
    "b84",
    "b85",
    "b86",
    "b87",
    "b88",
    "b89",
  ],
  "-90deg": [
    "b19",
    "b18",
    "b17",
    "b16",
    "b15",
    "b14",
    "b13",
    "b12",
    "b11",
    "b39",
    "b38",
    "b37",
    "b36",
    "b35",
    "b34",
    "b33",
    "b32",
    "b31",
    "b59",
    "b58",
    "b57",
    "b56",
    "b55",
    "b54",
    "b53",
    "b52",
    "b51",
    "b79",
    "b78",
    "b77",
    "b76",
    "b75",
    "b74",
    "b73",
    "b72",
    "b71",
    "b99",
    "b98",
    "b97",
    "b96",
    "b95",
    "b94",
    "b93",
    "b92",
    "b91",
  ],
};

const LADDERS = Object.freeze({
  4: 25,
  21: 39,
  29: 74,
  43: 76,
  63: 80,
  71: 89,
});

const SNAKES = Object.freeze({
  30: 7,
  47: 15,
  56: 19,
  82: 42,
  73: 51,
  82: 42,
  92: 75,
  98: 55,
});

function rollDice() {
  let num = Math.floor(Math.random() * 6) + 1;
  return num;
}

function getLadderTopPosition(expectedPosition) {
  let k = expectedPosition.toString();
  console.log("Check in Ladders");
  console.log(LADDERS);
  console.log(k in LADDERS);
  if (k in LADDERS) {
    return LADDERS[k];
  } else {
    return expectedPosition;
  }
}

function getSnakeTailPosition(expectedPosition) {
  let k = expectedPosition.toString();
  console.log("Check in Snakes");
  console.log(SNAKES);
  console.log(k in SNAKES);
  if (k in SNAKES) {
    return SNAKES[k];
  } else {
    return expectedPosition;
  }
}

function movePlayerPosition(diceValue, isDiceValueSix) {
  let expectedPosition = players[CURRENT_PLAYER_INDEX].position + diceValue;
  console.log("expectedPosition :", expectedPosition);
  if (expectedPosition < WINNING_POSITION) {
    let finalPos = expectedPosition;
    let ladderPos = getLadderTopPosition(expectedPosition);
    if (ladderPos === expectedPosition) {
      finalPos = getSnakeTailPosition(expectedPosition);
    } else {
      finalPos = ladderPos;
    }

    console.log("finalPos :", finalPos);

    players[CURRENT_PLAYER_INDEX].position = finalPos;
    if (!isDiceValueSix) {
      CURRENT_PLAYER_INDEX = CURRENT_PLAYER_INDEX + 1;
      if (CURRENT_PLAYER_INDEX >= players.length) {
        CURRENT_PLAYER_INDEX = 0;
      }
    }
  } else if (expectedPosition === WINNING_POSITION) {
    players[CURRENT_PLAYER_INDEX].position = expectedPosition;
    WINNER = players[CURRENT_PLAYER_INDEX];
  } else {
    CURRENT_PLAYER_INDEX = CURRENT_PLAYER_INDEX + 1;
    if (CURRENT_PLAYER_INDEX >= players.length) {
      CURRENT_PLAYER_INDEX = 0;
    }
  }
}

// function startGame() {
//   while (WINNER === null) {
//     console.log("#".repeat(100));
//     console.log("Current Player : ", players[CURRENT_PLAYER_INDEX].name);
//     let diceValue = rollDice();
//     console.log("dice : ", diceValue);
//     if (diceValue !== 6) {
//       if (CURRENT_PLAYER_INDEX < players.length) {
//         movePlayerPosition(diceValue, false);
//       } else {
//         CURRENT_PLAYER_INDEX = 0;
//         movePlayerPosition(diceValue, false);
//       }
//     } else {
//       movePlayerPosition(diceValue, true);
//     }
//   }
//   console.log("The Winner is : ", WINNER.name);
// }

// function initalize(numberOfPlayers) {

//   startGame();
// }

// initalize(4);
