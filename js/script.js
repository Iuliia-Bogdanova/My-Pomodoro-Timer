const timer = document.querySelector('.timer');
const title = document.querySelector(".title");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const resume = document.querySelector(".resume");
const reset = document.querySelector(".reset");
const pomoCountsDisplay = document.querySelector(".pomoCountsDisplay");

const WORK_TIME = 0.2 * 60;
const BREAK_TIME = 0.1 * 60;
let timerID = null;
let oneRoundCompleted = false;
let totalCount = 0;

const updateTitle = (msg) => {
    title.textContent = msg;
}

const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem('pomoCounts'));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem('pomoCounts', JSON.stringify(counts));
}

const countDown = (time) => {
    return () => {
        const mins = Math.floor(time / 60).toString().padStart(2, '0');
        const secs = Math.floor(time % 60).toString().padStart(2, "0");
        // timer.textContent = time;
        timer.textContent = `${mins}:${secs}`;
        time--;
        if(time < 0) {
            stopTimer();
            if(!oneRoundCompleted) {
                timerID = startTimer(BREAK_TIME);
                oneRoundCompleted = true;
                updateTitle("It's Break Time!");
            }
            else{
                updateTitle("Completed 1 Round of Pomodoro Technique!");
                setTimeout(() => updateTitle("Start Timer Again!"), 2000);
                totalCount++;
                saveLocalCounts();
                showPomoCounts();
            }
        }
    }
}

const startTimer = (startTime) => {
    if(timerID !== null) {
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000);
}

const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
}

start.addEventListener('click', () => {
    timerID = startTimer(WORK_TIME);
    updateTitle("It's Work Time!");
});

reset.addEventListener('click', () => {
    stopTimer();
    timer.textContent = "25:00";
});

pause.addEventListener("click", () => {
    stopTimer();
    // timer.textContent = "25:00";
});

const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem('pomoCounts'));
    if(counts > 0){
        pomoCountsDisplay.style.display = "flex";
    }
    pomoCountsDisplay.firstElementChild.textContent = counts;
}