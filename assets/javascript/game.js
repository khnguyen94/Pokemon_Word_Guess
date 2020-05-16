// Initiate counter variables to be used
let liveCounter, winsCounter, lossesCounter, pikachuHeath;

// Initiate word bank variables
let currentPokemonName;

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
    .addEventListener("click", initializeGame);

  // Get references to the HTML text elements
  currentPokemonNameText = document.getElementById("currentPokemonNameText");
  currentPokemonWrongGuessesText = document.getElementById(
    "currentPokemonWrongGuessesText"
  );
  livesCounterText = document.getElementById("livesCounterText");
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
  initializeGame();
};

// Create the function that will initialize the game
let initializeGame = () => {
  // Reset Pikachu's health to 100%
  pikachuHeath = 100;

  // Randomly choose word from the PokemonNameBank
  currentPokemonName =
    pokemonNameBank[Math.floor(Math.random() * pokemonNameBank.length)];

  // Break up the word in to an array of individual letters
  currentPokemonNameLetters = currentPokemonName.split("");

  // Create a variable that equates to the number of of letters in the word
  numberOfBlanks = currentPokemonNameLetters.length;

  // Console log chosenPokemonName, currentPokemonNameLetters, numberOfBlanks
  console.log(currentPokemonName);
  console.log(currentPokemonNameLetters);
  console.log(numberOfBlanks);

  // Reset the currentPokemonNameArr
  currentPokemonNameArr = [];

  // Reset the currentGuessedLettersArr
  currentGuessedLettersArr = [];

  // Create a function that will populate the currentPokemonNameArr with underscores equal to numberOfBlanks
  let populateCurrentPokemonNameArr = (num) => {
    for (var i = 0; i < num; i++) {
      currentPokemonNameArr.push("_");
    }
  };

  // Run populateCurrentPokemonNameArr
  populateCurrentPokemonNameArr(numberOfBlanks);

  // Console log populateCurrentPokemonNameArr
  console.log(currentPokemonNameArr);

  // Print these blanks to the corresponding HTML element
  currentPokemonNameText.innerHTML = currentPokemonNameArr.join(" ");

  console.log(currentPokemonNameText);

  // Clear wrong guesses from previous round
  currentPokemonWrongGuessesText.innerHTML = currentGuessedLettersArr.join(" ");

  console.log(currentPokemonWrongGuessesText);
};

// Create a function to check if the letter guess is in the current Pokemon name array
// letter is the letter being guessed
// nameArray is the current pokemon array the guessed letter is being compared to
let checkLetterInName = (letter) => {
  // Initiate a boolean that is initially set to false, will toggle if a guessed letter is found in the name array
  let letterInWord = false;

  // Check if letter is in the name array
  for (var i = 0; i < numberOfBlanks; i++) {
    if (currentPokemonName[i] === letter) {
      letterInWord = true;
    }
  }

  // If the letter exists in the name array then find all indices and populate indices with letter
  if (letterInWord) {
    for (var j = 0; j < numberOfBlanks; j++) {
      if (currentPokemonName[j] === letter) {
        currentPokemonNameText[j] === letter;
      }
    }

    // Console log currentPokemonNameText
    console.log(currentPokemonNameText);
  } else {
    // asdf
  }
};

// Create a function to
