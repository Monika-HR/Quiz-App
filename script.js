
const questions = [
  { q: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], answer: 1 },
  { q: "What is 5 + 3?", options: ["5", "8", "9", "6"], answer: 1 },
  { q: "Largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
  { q: "HTML stands for?", options: ["Hyperlink Markup", "Hypertext Markup Language", "Home Tool Markup", "None"], answer: 1 },
  { q: "Who wrote the Ramayana?", options: ["Tulsidas", "Valmiki", "Vyasa", "Kalidasa"], answer: 1 },
  { q: "Fastest land animal?", options: ["Lion", "Cheetah", "Tiger", "Jaguar"], answer: 1 },
  { q: "What is the boiling point of water?", options: ["80°C", "90°C", "100°C", "120°C"], answer: 2 },
  { q: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: 2 },
  { q: "Color of the sky?", options: ["Green", "Blue", "Yellow", "Black"], answer: 1 },
  { q: "Which is a frontend language?", options: ["Java", "Python", "HTML", "SQL"], answer: 2 }
];

let current = 0;
let selectedAnswer = null;
let score = 0;
let timer;
const timePerQuestion = 30;
let timeLeft = timePerQuestion;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("totalQ").textContent = questions.length;
  loadQuestion();
});

function loadQuestion() {
  clearInterval(timer);
  timeLeft = timePerQuestion;
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(); // auto-move if time runs out
    }
  }, 1000);

  selectedAnswer = null;
  document.getElementById("nextBtn").disabled = true;
  const q = questions[current];
  document.getElementById("qNum").textContent = current + 1;
  document.querySelector(".progress").style.width = ((current + 1) / questions.length * 100) + "%";
  document.getElementById("question").textContent = q.q;
  const opts = q.options.map((opt, i) =>
    `<button onclick="selectOption(this, ${i})">${String.fromCharCode(65 + i)}. ${opt}</button>`
  ).join("");
  document.getElementById("options").innerHTML = opts;
}

function updateTimerDisplay() {
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
}

function selectOption(btn, index) {
  if (selectedAnswer === null) {
    document.querySelectorAll(".options button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedAnswer = index;
    document.getElementById("nextBtn").disabled = false;

    if (index === questions[current].answer) score++;
  }
}

function nextQuestion() {
  clearInterval(timer);
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector(".quiz-box").innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your score: ${score} / ${questions.length}</p>
  `;
}
