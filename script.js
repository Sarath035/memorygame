const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart");

let cards = ["🍎","🍌","🍇","🍉","🍒","🍍","🥝","🍑"];
let gameCards = [...cards, ...cards]; // duplicate for pairs
let flippedCard = null;
let lockBoard = false;

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create board
function createBoard() {
  board.innerHTML = "";
  shuffle(gameCards).forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="front">${symbol}</div>
      <div class="back">?</div>
    `;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

// Flip card logic
function flipCard() {
  if (lockBoard) return;
  if (this === flippedCard) return;

  this.classList.add("flip");

  if (!flippedCard) {
    flippedCard = this;
    return;
  }

  checkMatch(this);
}

// Check for match
function checkMatch(secondCard) {
  const firstSymbol = flippedCard.querySelector(".front").textContent;
  const secondSymbol = secondCard.querySelector(".front").textContent;

  if (firstSymbol === secondSymbol) {
    flippedCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  } else {
    lockBoard = true;
    setTimeout(() => {
      flippedCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }
}

// Reset state
function resetBoard() {
  [flippedCard, lockBoard] = [null, false];
}

// Restart game
restartBtn.addEventListener("click", () => {
  createBoard();
});

// Initialize
createBoard();