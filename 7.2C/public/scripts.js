const socket = io();

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultsEl = document.getElementById("results");

function renderOptions(options) {
  optionsEl.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = `Vote: ${opt}`;
    btn.onclick = () => socket.emit("vote", opt);
    optionsEl.appendChild(btn);
  });
}

function renderResults(votes) {
  resultsEl.innerHTML = "";
  for (const opt in votes) {
    const li = document.createElement("li");
    li.textContent = `${opt}: ${votes[opt]}`;
    resultsEl.appendChild(li);
  }
}

socket.on("pollData", (poll) => {
  questionEl.textContent = poll.question;
  renderOptions(poll.options);
  renderResults(poll.votes);
});

socket.on("pollResults", (votes) => {
  renderResults(votes);
});
