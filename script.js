


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

// Close modal when clicking either button 
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

// Close modal when clicking outside the modal content 
const outsideModal = (event) => { 
  if (event.target === modal && difficultySelected) {
    closeModal();
  } else if (event.target === modal && !difficultySelected) {
    alert("Please select a difficulty level first!");
  }
}; 
window.addEventListener("click", outsideModal); 

// Game elements and variables 
const levelEasy = document.getElementById("easy"); 
const levelMedium = document.getElementById("medium"); 
const levelHard = document.getElementById("hard"); 
const scoreDisplay = document.querySelector(".score"); 
const messageDisplay = document.querySelector(".message"); 
const userInput = document.querySelector(".guess"); 
const checkButton = document.querySelector(".check"); 
const againButton = document.querySelector(".again-btn"); 
let secretNumber = generateSecretNumber(); 
let maxGuesses; 
let remainingGuesses; 
let gameOver = false; 
let score = 0; 
let highScore = 0; 

function generateSecretNumber() { 
  return Math.trunc(Math.random() * 20) + 1; 
} 

// Set difficulty and start a new game 
function setDifficulty(level) { 
  if (level === "easy") { 
    maxGuesses = 20; 
    scoreDisplay.textContent = "💯 score: 20"; 
  } else if (level === "medium") { 
    maxGuesses = 10; 
    scoreDisplay.textContent = "💯 score: 10"; 
  } else if (level === "hard") { 
    maxGuesses = 5; 
    scoreDisplay.textContent = "💯 score: 5"; 
  } 
  remainingGuesses = maxGuesses; 
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

// Check user's guess 
checkButton.addEventListener("click", function () { 
  if (gameOver) return; 
  const userValue = Number(userInput.value); 
  if (!userValue) { 
    messageDisplay.textContent = "⛔ No number!"; 
    return; 
  } 

  // Function to decrease the number of guesses left 
  function decreaseGuessesLeft() { 
    remainingGuesses--; 
    document.getElementById('guesses-remaining').innerHTML = `💯 score: ${remainingGuesses}`; 
  } 

  if (userValue < secretNumber) { 
    decreaseGuessesLeft(); 
    messageDisplay.textContent = "📉 Too low!"; 
  } else if (userValue > secretNumber) { 
    decreaseGuessesLeft(); 
    messageDisplay.textContent = "📈 Too high!"; 
  } else { 
    messageDisplay.textContent = "🎉 Correct Number!"; 
    document.querySelector(".highScore").textContent = "🥇 HighScore: " + secretNumber; 
    document.body.style.backgroundColor = "#60b347"; 
    document.querySelector(".number").textContent = secretNumber; 
    checkButton.disabled = true; 
    if (score > highScore) { 
      highScore = score; 
      document.querySelector(".highScore").textContent = highScore; 
    } 
    return; 
  } 

  if (remainingGuesses === 0) { 
    messageDisplay.textContent = "💥 You lost the game"; 
    document.body.style.backgroundColor = "#970119"; 
    checkButton.disabled = true; 
    gameOver = true; 
  } 
}); 

// Generate new number 
function replay() {
  document.querySelector(".number").textContent = "?"; 
  document.querySelector(".guess").value = ""; 
  messageDisplay.textContent = "Start Guessing...."; 
  document.body.style.backgroundColor = "rgb(34, 34, 34)"; 
  document.querySelector(".highScore").textContent = "🥇 Highscore: 0"; 
  userInput.value = ""; 
  checkButton.disabled = false; 
  gameOver = false; 
  score = 0; 
  secretNumber = generateSecretNumber(); 
  modal.style.display = "flex"; 
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
  window.addEventListener("click", outsideModal);
}


againButton.addEventListener('click', replay);


