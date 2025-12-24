let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let milliseconds = Math.floor((ms % 1000) / 10);

  return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(milliseconds).padStart(2, "0")
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
  }
});

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  lapCount = 1;
  updateDisplay();
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
    laps.appendChild(li);
    lapCount++;
  }
});