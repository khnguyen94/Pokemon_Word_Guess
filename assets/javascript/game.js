// Initiate counter variables to be used
let liveCounter, winsCounter, lossesCounter, pikachuHeath;

// Initiate word bank variables
let currentPokemonName, currentPokemonLettersGuessed;

// Initialize references to HTML elements
let currentPokemonNameText,
  currentPokemonLettersGuessedText,
  livesCounterText,
  winsCounterText,
  lossesCounterText,
  pikachuHealthText;

// Initate a name bank of Pokemon names
let pokemonNameBank = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
  "Weedle",
  "Kakuna",
  "Beedrill",
  "Pidgey",
  "Pidgeotto",
  "Pidgeot",
  "Rattata",
  "Raticate",
  "Spearow",
  "Fearow",
  "Ekans",
  "Arbok",
  "Pikachu",
  "Raichu",
  "Sandshrew",
  "Sandslash",
  "Nidoran♀",
  "Nidorina",
  "Nidoqueen",
  "Nidoran♂",
  "Nidorino",
  "Nidoking",
  "Clefairy",
  "Clefable",
  "Vulpix",
  "Ninetales",
  "Jigglypuff",
  "Wigglytuff",
  "Zubat",
  "Golbat",
  "Oddish",
  "Gloom",
  "Vileplume",
  "Paras",
  "Parasect",
  "Venonat",
  "Venomoth",
  "Diglett",
  "Dugtrio",
  "Meowth",
  "Persian",
  "Psyduck",
  "Golduck",
  "Mankey",
  "Primeape",
  "Growlithe",
  "Arcanine",
  "Poliwag",
  "Poliwhirl",
  "Poliwrath",
  "Abra",
  "Kadabra",
  "Alakazam",
  "Machop",
  "Machoke",
  "Machamp",
  "Bellsprout",
  "Weepinbell",
  "Victreebel",
  "Tentacool",
  "Tentacruel",
  "Geodude",
  "Graveler",
  "Golem",
  "Ponyta",
  "Rapidash",
  "Slowpoke",
  "Slowbro",
  "Magnemite",
  "Magneton",
  "Farfetch’d",
  "Doduo",
  "Dodrio",
  "Seel",
  "Dewgong",
  "Grimer",
  "Muk",
  "Shellder",
  "Cloyster",
  "Gastly",
  "Haunter",
  "Gengar",
  "Onix",
  "Drowzee",
  "Hypno",
  "Krabby",
  "Kingler",
  "Voltorb",
  "Electrode",
  "Exeggcute",
  "Exeggutor",
  "Cubone",
  "Marowak",
  "Hitmonlee",
  "Hitmonchan",
  "Lickitung",
  "Koffing",
  "Weezing",
  "Rhyhorn",
  "Rhydon",
  "Chansey",
  "Tangela",
  "Kangaskhan",
  "Horsea",
  "Seadra",
  "Goldeen",
  "Seaking",
  "Staryu",
  "Starmie",
  "Mr. Mime",
  "Scyther",
  "Jynx",
  "Electabuzz",
  "Magmar",
  "Pinsir",
  "Tauros",
  "Magikarp",
  "Gyarados",
  "Lapras",
  "Ditto",
  "Eevee",
  "Vaporeon",
  "Jolteon",
  "Flareon",
  "Porygon",
  "Omanyte",
  "Omastar",
  "Kabuto",
  "Kabutops",
  "Aerodactyl",
  "Snorlax",
  "Articuno",
  "Zapdos",
  "Moltres",
  "Dratini",
  "Dragonair",
  "Dragonite",
  "Mewtwo",
  "Mew",
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
  currentPokemonNameText = document.getElementById("currentWordText");
  currentPokemonLettersGuessedText = document.getElementById(
    "currentPokemonLettersGuessedText"
  );
  livesCounterText = document.getElementById("livesCounterText");
  winsCounterText = document.getElementById("winsCounterText");
  lossesCounterText = document.getElementById("lossesCounterText");
  pikachuHealthText = document.getElementById("pikachuHealthText");

  // Initiate wins and losses counter
  winsCounter = 0;
  winsCounterText.textContent = "Wins: 0";
  lossesCounter = 0;
  lossesCounterText.textContent = "Losts: 0";

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
  let populateCurrentPokemonNameArr = (numberOfBlanks) => {
      for (var i=0; i<numberOfBlanks; i++) {
          currentPokemonNameArr.push("_");
      }
  }; 

  // Console log populateCurrentPokemonNameArr
  console.log(populateCurrentPokemonNameArr); 

  // Print these blanks to the corresponding HTML element 
  currentPokemonNameText.innerHTML = populateCurrentPokemonNameArr.join(" ");

};

// Create a function to check if the letter guess is in the current Pokemon name array
// letter is the letter being guessed
// nameArray is the current pokemon array the guessed letter is being compared to
let checkLetterInName = (letter, nameArr) => {
  return nameArr.includes(letter);
};

// Create a function to
