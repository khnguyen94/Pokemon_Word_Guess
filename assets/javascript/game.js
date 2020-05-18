// Initiate variable for the current letter guessed
let currentLetterGuess;

// Initiate counter variables to be used
let winsCounter,
  lossesCounter,
  guessesLeftCounter,
  pikachuHeath,
  pikachuMaxHealth;

// Initiate wins and losses counter
winsCounter = 0;
lossesCounter = 0;

// Initiate dict, models, arrays variables
let currentPokemonName = "";
let currentPokemonNameDict = {};
let currentPokemonNameModel = [];
let currentPokemonGuessedLettersArr = [];
let pokemonNameBankCopy = [];

// Initialize references to HTML elements and get references to the HTML text elements
var $currentPokemonNameText = $("#currentPokemonNameText");
var $currentPokemonWrongGuessesText = $("#currentPokemonWrongGuessesText");
var $winsCounterText = $("winsText");
var $lossesCounterText = $("#lossesText");
var $pikachuHealthBar = $("#pikachuHealthBar");

// Initate a name bank of Pokemon names
const pokemonNameBank = [
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

pokemonNameBankCopy = [...pokemonNameBank];

// Initiate a letter bank of the alphabet
const letterBank = [
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
  $(document).ready(function () {
    $("#restartButton").click(function () {
      initializeGameFunc();
    });
  });

  $winsCounterText.textContent = "Wins: 0";
  $lossesCounterText.textContent = "Losses: 0";

  // Create copies of the letter bank and pokemon name bank for modification between rounds of guessing
  pokemonNameBankCopy = [...pokemonNameBank];

  // Then initialize the game
  initializeGameFunc();
};

// Create a function to check if the letter guess is in an array
let checkLetterInArrayFunc = (letter, array) => {
  return array.includes(letter);
};

// Create a function to check if letter exists within a dictionary of the currentPokemonName
// NOTE: one letter can appear multiple times
let checkLetterinDictFunc = (letter, dict) => {
  for (var i = 0; i < dict.length; i++) {
    // If the letter matches the dict value at that index, then return true
    if (dict[i] === letter) {
      return true;
    }
  }
  // Else if letter is not in the dict then return false
  return false;
};

// Create a function that updates the currentPokemonGuessedLettersArr and the HTML element
let updateLettersGuessedFunc = (letter, arr) => {
  // First, update the model by pushing the wrongly guess letter into the array
  arr.push(letter);

  console.log("Guess Arr: " + arr);

  // Second, update the HTML element
  $currentPokemonWrongGuessesText.innerText = arr;
};

// Create a function that handles what happens when the player guesses a correct letter
let rightGuessFunc = (letter, dict, model) => {
  // Check the letter against each value in the NameDict
  for (var i = 0; i < dict.length; i++) {
    // If there is match between the letter guessed and the letter at the DictModel index,
    // replace that guessed letter to the array at the next index, dict[i][1]
    if (dict[i][0] === letter) {
      // Loop through entire dict and for every match to the letter, change that blank of model at that index
      for (var j = 0; j < dict.length; j++) {
        model[j] === letter;
      }
    }
  }

  console.log(dict);
  console.log(model);
};

// Create a function to check if all the letters have been guessed in the current NameModel
let checkCompletedNameModelFunc = (name, model, bankCopy) => {
  // Initiate a new variable to hold the name being guessed in its current state
  let modelName = "";

  // Build the word using the NameModel
  for (var i = 0; i < model.length; i++) {
    modelName += model[i];

    // Match the NameModel word to the currentPokemonName
    if (name === modelName) {
      // Increment wins
      winsCounter += 1;

      // Update the HTML element for wins
      winsCounterText.textContent = winsCounter;

      // Remove that Pokemon from the pokemonNameBankCopy
      bankCopy.splice(bankCopy.indexOf(name), 1);

      console.log(bankCopy);

      // Restart the game
      initializeGameFunc();
    }
  }
};

// Create a function to handle the wrong letter being guessed
let wrongGuessFunc = () => {
  // Decrement guessesLeftCounter
  guessesLeftCounter -= 1;

  // Decrement Pikachu's health points
  pikachuHeath -= 1;

  // Update HTML text element for Pikachu's health bar
  $pikachuHealthBar.textContent = pikachuHeath + "/10";

  // Update the width of Pikachu's health bar
  updateHealthbarFunc(guessesLeftCounter);

  console.log($pikachuHealthBar); 
};

// Create a function that updates the width of Pikachu's health bar
let updateHealthbarFunc = (number) => {
  $pikachuHealthBar.style.width = (number / pikachuMaxHealth) * 100 + "%";
};

// Create a function when Pikachu runs out of health
let roundLostFunc = () => {
  // Increment lossesCounter
  lossesCounter += 1;

  // Update the HTML element for losses
  lossesCounterText.textContent = lossesCounter;

  // Restart Game
  initializeGameFunc();
};

// Create a function that handles key presses
document.onkeyup = (event) => {
  // Initialize a variable to hold the key pressed
  let keyPressed;

  // Set that key to lowercase
  keyPressed = event.key.toLocaleLowerCase();

  // Check to see if keyPressed is valid letter in letterBank
  if (checkLetterInArrayFunc(keyPressed, letterBank)) {
    // If keyPressed has NOT been guessed
    // and that keyPressed matches a letter in the current Dict
    if (
      !checkLetterInArrayFunc(keyPressed, currentPokemonGuessedLettersArr) &&
      checkLetterinDictFunc(keyPressed, currentPokemonNameDict)
    ) {
      // Then add keyPressed to guessedLettersArr
      updateLettersGuessedFunc(keyPressed, currentPokemonGuessedLettersArr);

      // Run rightGuessFunc
      rightGuessFunc(
        keyPressed,
        currentPokemonNameDict,
        currentPokemonNameModel
      );

      // Check to see if they completed the word by running the checkCompletedNameModelFunc
      checkCompletedNameModelFunc(
        currentPokemonName,
        currentPokemonNameModel,
        pokemonNameBankCopy
      );
    }

    // If keyPressed has NOT been guessed
    // and that keyPressed DOES NOT match a letter in the current Dict
    else if (
      !checkLetterInArrayFunc(keyPressed, currentPokemonGuessedLettersArr) &&
      !checkLetterinDictFunc(keyPressed, currentPokemonNameDict)
    ) {
      // Then add keyPressed to guessedLettersArr
      updateLettersGuessedFunc(keyPressed, currentPokemonGuessedLettersArr);

      // Run wrongGuessFunc
      wrongGuessFunc();

      // If Pikachu is out of health, run roundLostFunc
      if (guessesLeftCounter === 0) {
        roundLostFunc();
      }
    }
  }
};

// Create a function that runs on page load or when restart button is clicked
let initializeGameFunc = () => {
  // Empty out all word bank variables
  currentPokemonName = "";
  currentPokemonNameDict = {};
  currentPokemonNameModel = [];
  currentPokemonGuessedLettersArr = [];

  // Set Pikachu's health to 10
  pikachuHeath = 10;

  // Randomly choose word from the PokemonNameBank
  currentPokemonName =
    pokemonNameBankCopy[Math.floor(Math.random() * pokemonNameBankCopy.length)];

  // Break up the word in to an array of individual letters
  currentPokemonNameDict = currentPokemonName.split("");

  // Create a variable that equates to the number of of letters in the word
  numberOfBlanks = currentPokemonNameDict.length;

  // Console log chosenPokemonName, currentPokemonNameLetters, numberOfBlanks
  console.log("Name: " + currentPokemonName);
  console.log("Dict: " + currentPokemonNameDict);
  console.log("NumBlanks: " + numberOfBlanks);

  // Create a function that will populate the currentPokemonNameModel with underscores equal to numberOfBlanks
  let populateCurrentPokemonNameArrFunc = (num) => {
    for (var i = 0; i < num; i++) {
      currentPokemonNameModel.push("_");
    }
  };

  // Run populateCurrentPokemonNameArrS
  populateCurrentPokemonNameArrFunc(numberOfBlanks);

  // Console log populateCurrentPokemonNameArr
  console.log("Model: " + currentPokemonNameModel);

  // Print these blanks to the corresponding HTML element
  currentPokemonNameText = currentPokemonNameModel.join(" ");

  // Clear wrong guesses from previous round
  $currentPokemonWrongGuessesText.html = currentPokemonGuessedLettersArr.join(
    " "
  );
};
