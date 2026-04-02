// ===========================
// Emoji Match — Game Logic
// ===========================

const EMOJI_SETS = {
  '4x4': ["😀","😀","🚀","🚀","🐶","🐶","🍕","🍕","🔥","🔥","🎮","🎮","🌈","🌈","🍩","🍩"],
  '6x6': [
    "😀","😀","🚀","🚀","🐶","🐶","🍕","🍕","🔥","🔥","🎮","🎮",
    "🌈","🌈","🍩","🍩","⚽","⚽","🎸","🎸","🦄","🦄","💎","💎",
    "🌮","🌮","🎯","🎯","🐱","🐱","🍀","🍀","🎲","🎲","🧊","🧊"
  ]
};

let flipped = [];
let matched = 0;
let moves = 0;
let totalCards = 0;
let lockBoard = false;

// Shuffle array in place (Fisher-Yates)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Get current difficulty
function getDifficulty() {
  return document.getElementById('difficulty').value;
}

// Start / restart the game
function startGame() {
  const difficulty = getDifficulty();
  const emojis = [...EMOJI_SETS[difficulty]];

  moves = 0;
  matched = 0;
  flipped = [];
  lockBoard = false;
  totalCards = emojis.length;

  document.getElementById('moves').textContent = moves;

  shuffle(emojis);

  const board = document.getElementById('gameBoard');
  board.innerHTML = '';
  board.className = difficulty === '6x6' ? 'grid-6x6' : 'grid-4x4';
  board.id = 'gameBoard';

  emojis.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

// Flip a card
function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
  if (flipped.length >= 2) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.emoji;
  flipped.push(this);

  if (flipped.length === 2) {
    moves++;
    document.getElementById('moves').textContent = moves;
    lockBoard = true;
    setTimeout(checkMatch, 700);
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [a, b] = flipped;

  if (a.dataset.emoji === b.dataset.emoji) {
    a.classList.add('matched');
    b.classList.add('matched');
    matched += 2;

    if (matched === totalCards) {
      setTimeout(() => {
        alert(`You won in ${moves} moves! 🎉`);
        saveScore();
      }, 300);
    }
  } else {
    a.classList.remove('flipped');
    a.textContent = '';
    b.classList.remove('flipped');
    b.textContent = '';
  }

  flipped = [];
  lockBoard = false;
}

// Save score to database via API
async function saveScore() {
  const nameInput = document.getElementById('playerName');
  const playerName = nameInput.value.trim();

  if (!playerName) {
    alert('Please enter your name to save your score.');
    return;
  }

  const difficulty = getDifficulty();

  try {
    const res = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerName,
        moves,
        difficulty
      })
    });

    const data = await res.json();

    if (res.ok) {
      console.log('Score saved:', data);
    } else {
      console.error('Save failed:', data.error);
    }
  } catch (err) {
    console.error('Network error saving score:', err);
  }
}

// ---------- Event Listeners ----------

document.getElementById('restartBtn').addEventListener('click', startGame);

document.getElementById('difficulty').addEventListener('change', startGame);

// Start game on page load
startGame();
