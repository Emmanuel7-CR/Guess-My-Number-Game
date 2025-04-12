


'use strict'; 
// Get modal and buttons 
const modal = document.getElementById("modal"); 
let closeModalBtn1 = document.getElementById("closeModal"); 
let closeModalBtn2 = document.getElementById("start"); 
let difficultySelected = false; 

// Function to close modal 
function closeModal() { 
  modal.style.display = "none"; 
} 

// Setup modal listeners (only set up once)
function setupModalListeners() {
  closeModalBtn1.addEventListener("click", function() {
    if (difficultySelected) {
      closeModal();
    } else {
      alert("Please select a difficulty level first!");
    }
  });

  closeModalBtn2.addEventListener("click", function() {
    if (difficultySelected) {
      closeModal();
    } else {
      alert("Please select a difficulty level first!");
    }
  });

  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      if (difficultySelected) {
        closeModal();
      } else {
        alert("Please select a difficulty level first!");
      }
    }
  });
}
setupModalListeners();

// Game elements and variables 
const levelEasy = document.getElementById("easy"); 
const levelMedium = document.getElementById("medium"); 
const levelHard = document.getElementById("hard"); 
const messageDisplay = document.querySelector(".message"); 
const userInput = document.querySelector(".guess"); 
const checkButton = document.querySelector(".check"); 
const againButton = document.querySelector(".again-btn"); 
let secretNumber = generateSecretNumber(); 
let maxGuesses; 
// We'll use "score" as the player's current points.
let score; 
let highScore = 0; 
let gameOver = false; 

// Generate a new secret number
function generateSecretNumber() { 
  return Math.trunc(Math.random() * 20) + 1; 
} 

// Set difficulty and initialize game variables
function setDifficulty(level) { 
  if (level === "easy") { 
    maxGuesses = 20; 
  } else if (level === "medium") { 
    maxGuesses = 10; 
  } else if (level === "hard") { 
    maxGuesses = 5; 
  } 
  // Set initial score to 20 regardless of difficulty.
  score = 20; 
  document.getElementById('guesses-remaining').textContent = `💯 score: ${score}`; 
}; 

// Attach difficulty selection handlers 
levelEasy.addEventListener("click", function() {
  setDifficulty("easy");
  difficultySelected = true;
});

levelMedium.addEventListener("click", function() {
  setDifficulty("medium");
  difficultySelected = true;
});

levelHard.addEventListener("click", function() {
  setDifficulty("hard");
  difficultySelected = true;
});

// ********* New: Difficulty-based score deduction **********
// Deduction is calculated as 20 / maxGuesses.
// For easy: Deduct 1 point per wrong guess.
// For medium: Deduct 2 points per wrong guess.
// For hard: Deduct 4 points per wrong guess.
function decScore() {
  let deduction = 20 / maxGuesses;
  score = score - deduction;
  if (score < 0) score = 0;
  document.getElementById('guesses-remaining').textContent = `💯 score: ${score}`;
}

// Check user's guess 
checkButton.addEventListener("click", function () { 
  if (gameOver) return; 
  const userValue = Number(userInput.value); 
  if (!userValue) { 
    messageDisplay.textContent = "⛔ No number!"; 
    return; 
  } 

  // Handle wrong guess: Deduct score based on difficulty
  if (userValue < secretNumber) { 
    decScore(); 
    messageDisplay.textContent = "📉 Too low!"; 
  } else if (userValue > secretNumber) { 
    decScore(); 
    messageDisplay.textContent = "📈 Too high!"; 
  } else { 
    // Correct guess scenario
    messageDisplay.textContent = "🎉 Correct Number!"; 
    document.querySelector(".number").textContent = secretNumber; 
    document.body.style.backgroundColor = "#60b347"; 
    checkButton.disabled = true; 
    if (score > highScore) { 
      highScore = score; 
      document.querySelector(".highScore").textContent = "🥇 HighScore: " + highScore; 
    } 
    return; 
  } 

  // If score reaches zero, the game is lost
  if (score <= 0) { 
    lostGame(); 
  } 
}); 

// When the player loses the game
function lostGame() { 
  messageDisplay.textContent = "💥 You lost the game"; 
  document.body.style.backgroundColor = "#970119"; 
  checkButton.disabled = true; 
  gameOver = true; 
  document.getElementById('guesses-remaining').textContent = `💯 score: 0`;
}

// Replay function: resets game while preserving the high score.
function replay() {
  document.querySelector(".number").textContent = "?"; 
  messageDisplay.textContent = "Start Guessing....";
  document.body.style.backgroundColor = "rgb(34, 34, 34)"; 
  // Reset score display to the initial 20
  document.getElementById('guesses-remaining').textContent = `💯 score: ${20}`;
  userInput.value = ""; 
  checkButton.disabled = false; 
  gameOver = false; 
  secretNumber = generateSecretNumber(); 
  score = 20; // Reset score to 20 for the new game
  difficultySelected = false;
  modal.style.display = "flex"; 
}

againButton.addEventListener('click', replay);

