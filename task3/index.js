let currentQuestion = 0;
let score = 0;
let questions = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple");
  const data = await res.json();
  questions = data.results;
  showQuestion();
}

function showQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionEl.innerHTML = decodeHTML(q.question);

  const options = [...q.incorrect_answers];
  const correctIndex = Math.floor(Math.random() * 4);
  options.splice(correctIndex, 0, q.correct_answer);

  options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.innerText = decodeHTML(opt);
    btn.addEventListener("click", () => selectAnswer(btn, q.correct_answer));
    answersEl.appendChild(btn);
  });
}

function resetState() {
  nextBtn.disabled = true;
  answersEl.innerHTML = "";
}

function selectAnswer(button, correct) {
  Array.from(answersEl.children).forEach(btn => {
    if (btn.innerText === decodeHTML(correct)) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });
  if (button.innerText === decodeHTML(correct)) {
    score++;
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionEl.innerText = "Quiz Complete!";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.innerText = `Your Score: ${score} / ${questions.length}`;
  }
});

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

fetchQuestions();
