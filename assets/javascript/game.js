// Initiate variable for the current letter guessed
let currentLetterGuess;

// Initiate counter variables to be used
let winsCounter, lossesCounter, pikachuHeath;

// Initiate word model variables
let currentPokemonName,
  currentPokemonNameModel,
  currentPokemonWrongGuessedLettersModel;

// Initialize references to HTML elements
let currentPokemonNameText,
  currentPokemonWrongGuessedText,
  livesCounterText,
  winsCounterText,
  lossesCounterText,
  pikachuHealthText;

// Initate a name bank of Pokemon names
let pokemonNameBank = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
  "weedle",
  "kakuna",
  "beedrill",
  "pidgey",
  "pidgeotto",
  "pidgeot",
  "rattata",
  "raticate",
  "spearow",
  "fearow",
  "ekans",
  "arbok",
  "pikachu",
  "raichu",
  "sandshrew",
  "sandslash",
  "nidoran♀",
  "nidorina",
  "nidoqueen",
  "nidoran♂",
  "nidorino",
  "nidoking",
  "clefairy",
  "clefable",
  "vulpix",
  "ninetales",
  "jigglypuff",
  "wigglytuff",
  "zubat",
  "golbat",
  "oddish",
  "gloom",
  "vileplume",
  "paras",
  "parasect",
  "venonat",
  "venomoth",
  "diglett",
  "dugtrio",
  "meowth",
  "persian",
  "psyduck",
  "golduck",
  "mankey",
  "primeape",
  "growlithe",
  "arcanine",
  "poliwag",
  "poliwhirl",
  "poliwrath",
  "abra",
  "kadabra",
  "alakazam",
  "machop",
  "machoke",
  "machamp",
  "bellsprout",
  "weepinbell",
  "victreebel",
  "tentacool",
  "tentacruel",
  "geodude",
  "graveler",
  "golem",
  "ponyta",
  "rapidash",
  "slowpoke",
  "slowbro",
  "magnemite",
  "magneton",
  "farfetch’d",
  "doduo",
  "dodrio",
  "seel",
  "dewgong",
  "grimer",
  "muk",
  "shellder",
  "cloyster",
  "gastly",
  "haunter",
  "gengar",
  "onix",
  "drowzee",
  "hypno",
  "krabby",
  "kingler",
  "voltorb",
  "electrode",
  "exeggcute",
  "exeggutor",
  "cubone",
  "marowak",
  "hitmonlee",
  "hitmonchan",
  "lickitung",
  "koffing",
  "weezing",
  "rhyhorn",
  "rhydon",
  "chansey",
  "tangela",
  "kangaskhan",
  "horsea",
  "seadra",
  "goldeen",
  "seaking",
  "staryu",
  "starmie",
  "mr. mime",
  "scyther",
  "jynx",
  "electabuzz",
  "magmar",
  "pinsir",
  "tauros",
  "magikarp",
  "gyarados",
  "lapras",
  "ditto",
  "eevee",
  "vaporeon",
  "jolteon",
  "flareon",
  "porygon",
  "omanyte",
  "omastar",
  "kabuto",
  "kabutops",
  "aerodactyl",
  "snorlax",
  "articuno",
  "zapdos",
  "moltres",
  "dratini",
  "dragonair",
  "dragonite",
  "mewtwo",
  "mew",
];

// Initiate a letter bank of the alphabet
let letterBank = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// On page load, execute this function
window.onload = () => {
  // When restart button is pushed, re-initialize the game
  document
    .getElementById("restartButton")
    .addEventListener("click", initializeGame());

  // Get references to the HTML text elements
  currentPokemonNameText = document.getElementById("currentPokemonNameText");
  currentPokemonWrongGuessesText = document.getElementById(
    "currentPokemonWrongGuessesText"
  );
  winsCounterText = document.getElementById("winsCounterText");
  lossesCounterText = document.getElementById("lossesCounterText");
  pikachuHealthText = document.getElementById("pikachuHealthText");

  // Initiate wins and losses counter
  winsCounter = 0;
  lossesCounter = 0;

  // Create copies of the letter bank and pokemon name bank for modification between rounds of guessing
  copyPokemonNameBank = pokemonNameBank;
  copyLetterBank = letterBank;

  // Then initialize the game
  initializeGameFunc();
};

// Create the function that will initialize the game
let initializeGameFunc = () => {
  // Reset Pikachu's health to 100%
  pikachuHeath = 100;

  // Randomly choose word from the PokemonNameBank
  currentPokemonName =
    pokemonNameBank[Math.floor(Math.random() * pokemonNameBank.length)];

  // Break up the word in to an array of individual letters
  currentPokemonNameModel = currentPokemonName.split("");

  // Create a variable that equates to the number of of letters in the word
  numberOfBlanks = currentPokemonNameModel.length;

  // Console log chosenPokemonName, currentPokemonNameLetters, numberOfBlanks
  console.log("Current Pokemon: " + currentPokemonName);
  console.log("Current Pokemon: " + currentPokemonNameModel);
  console.log("NumBlanks: " + numberOfBlanks);

  // Reset the currentPokemonNameModel
  currentPokemonNameModel = [];

  // Reset the currentGuessedLettersModel
  currentPokemonWrongGuessedLettersModel = [];

  // Create a function that will populate the currentPokemonNameArr with underscores equal to numberOfBlanks
  let populateCurrentPokemonNameArrFunc = (num) => {
    for (var i = 0; i < num; i++) {
      currentPokemonNameArr.push("_");
    }
  };

  // Run populateCurrentPokemonNameArr
  populateCurrentPokemonNameArrFunc(numberOfBlanks);

  // Console log populateCurrentPokemonNameArr
  console.log("Current array: " + currentPokemonNameArr);

  // Print these blanks to the corresponding HTML element
  currentPokemonNameText.innerHTML = currentPokemonNameArr.join(" ");

  console.log(currentPokemonNameText);

  // Clear wrong guesses from previous round
  currentPokemonWrongGuessesText.innerHTML = currentGuessedLettersArr.join(" ");

  console.log(currentPokemonWrongGuessesText);
};

// Create a function to check if the letter guess is in an array
let checkLetterInArrayFunc = (letter, array) => {
  // Initialize a boolean set to false
  let isInArray = false;

  // Toggle if the letter is in the array
  for (var i = 0; i < array.length; i++) {
    if (array[i] === letter) {
      isInArray = true;
    }
  }

  return isInArray;
};

// Create a function to update the wrongGuessedLetters model and update the HTML dom element
let updateWrongGuessedLetters = (letter) => {
    // Add to wrongGuessed
  currentPokemonWrongGuessesText.push(letter);
};

// Create a function to check if the letter guess is in the current Pokemon name array
// letter is the letter being guessed
// nameArray is the current pokemon array the guessed letter is being compared to
let checkLetterIn = (letter) => {
  // Initiate a boolean that is initially set to false, will toggle if a guessed letter is found in the name array
  let letterInWord = false;

  // Check if letter is in the name array
  for (var i = 0; i < numberOfBlanks; i++) {
    if (currentPokemonName[i] === letter) {
      letterInWord = true;
    }
  }

  // Initiate a boolean that is initially set to false, will toggle if the new letter is a newly guessed letter
  let isNewLetter = true;

  // Check if letter is in the array of letters already guessed
  for (var j = 0; j < currentPokemonNameText; j++) {
    if (currentPokemonWrongGuessesText[k] === letter) {
      isNewLetter = false;
    }
  }

  // If the letter exists in the name array then find all indices and populate indices with letter
  if (letterInWord && isNewLetter) {
    for (var k = 0; k < numberOfBlanks; k++) {
      if (currentPokemonName[j] === letter) {
        currentPokemonNameText[j] === letter;
      }
    }

    // Console log currentPokemonNameText
    console.log(currentPokemonNameText);
  } else if (isNewLetter === false) {
    console.log("You've already guessed the letter: " + letter);
    alert("You've already guessed the letter: " + letter);
  } else {
    // Else if the letter guessed is not in the name array, then add it to the wrong guess array
    currentGuessedLettersArr.push(letter);

    // Subtract 10% from pikachu's health
    pikachuHeath -= 10;

    console.log("The letter " + letter + " is not in the Pokemon's name");
    alert("The letter " + letter + " is not in the Pokemon's name");
  }
};

// Create a function that updates the all the counters and HTML elements
let roundComplete = () => {
  // Console log counters after every round
  console.log(
    "Wins: " +
      winsCounter +
      "Losses: " +
      lossesCounter +
      "Health: " +
      pikachuHeath
  );

  // Update HTML elements pikachu's health, name array, and wrong guesses array
  pikachuHealthText.innerHTML = pikachuHeath;
  currentPokemonNameText.innerHTML = currentPokemonNameText.join(" ");
  currentPokemonWrongGuessedText.innerHTML = currentPokemonWrongGuessedText.join(
    " "
  );

  // If all letters of the Pokemon's name are guessed and they match the original name,
  if (
    currentPokemonNameLetters.toString() === currentPokemonNameText.toString()
  ) {
    // Then increment win counter
    winsCounter += 1;

    // Alert user of win
    alert("You guessed the Pokemon! You win!");

    // Update the win counter in HTML
    winsCounterText = winsCounter;

    // Restart the game
    startGame();
  }

  // Else if, Pikachu's health is at 0%
  else if (pikachuHeath === 0) {
    // Then increment loss counter
    lossesCounter += 1;

    // Alert user of loss and answer
    alert(
      "Pikachu is dead! The correct answer was " +
        currentPokemonNameLetters.toString()
    );

    // Update loss counter in HTML
    lossesCounterText = lossesCounter;

    // Restart the game
    startGame();
  }
};

// Main Process

// Start the game
// startGame();

// Initiate key click capture
document.onkeyup = function (event) {
  // Check if key pressed is a letter
  if (event.keyCode >= 65 && event.keyCode < 90) {
    // Convert all key clicks to lower case
    currentLetterGuess = event.key.toLocaleLowerCase();

    // Run function to check checkLetterInName
    checkLetterInName(currentLetterGuess);

    // Run code for roundComplete
    roundComplete();
  }
};


