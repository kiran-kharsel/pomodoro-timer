// modal
const modal = document.querySelector(".setting-modal");
console.log(modal);

// modal.showModal();

// get dom elements
const timerElem = document.querySelector(".timer");
const startBtn = document.querySelector(".action");
const infoElem = document.querySelector(".info-tabs");
const settingsBtn = document.querySelector(".settings");

// default values
// let defaultWorkTime = 0.3;
// let defaultBreakTime = 0.25;
let defaultSession = 2;
let sessionCounter = 0;

// convert min into sec
// let workTimeInSec = defaultWorkTime * 60;
// let breakTimeInSec = defaultBreakTime * 60;

//interval
let workInterval;
let breakInterval;

function loadTimer() {
  timerElem.innerHTML = `${defaultWorkTime}:00`;
  infoElem.querySelector(".work-tab").classList.add("active");
}

// loadTimer();

startBtn.addEventListener("click", function () {
    workTimer();
});

// function for worktimer
function workTimer() {
    let defaultWorkTime = 0.3;
    let workTimeInSec = defaultWorkTime * 60;

  workInterval = setInterval(() => {
    
    //format time
    const mins = Math.floor(workTimeInSec / 60);
    const secs = workTimeInSec % 60;

    // display
    timerElem.innerHTML = `${String(mins).padStart(2, "0")}:${String(secs)}`

    // active work tab
    infoElem.querySelector(".work-tab").classList.add("active");

    workTimeInSec--;


    if (workTimeInSec < 0) {

      // clear interval
      clearInterval(workInterval);

      // remove active work tab
      infoElem.querySelector(".work-tab").classList.remove("active");

      //show break timer
      breakTimer();
    }
  }, 1000);
}


// breaktimer
function breakTimer() {

    let defaultBreakTime = 0.25;
    let breakTimeInSec = defaultBreakTime * 60;

  breakInterval = setInterval(() => {

    //format time 
    const mins = Math.floor(breakTimeInSec / 60);
    const secs = breakTimeInSec % 60;

    // display
    console.log(`${String(mins).padStart(2, "0")}:${String(secs)}`);
    timerElem.innerHTML = `${String(mins).padStart(2, "0")}:${String(secs)}`

    // active break tab
    infoElem.querySelector(".break-tab").classList.add("active");
    
    breakTimeInSec--;

    if (breakTimeInSec < 0) {
      // clear interval
      clearInterval(breakInterval);

      // increae sessioncounter to 1
      sessionCounter++;

      // cheak for session, if it match with default
      if (sessionCounter === defaultSession) {
        console.log("time over, u completed 2 cycle");
        clearInterval(breakInterval);
        clearInterval(workInterval)
      } else {
        //reset break tab
        infoElem.querySelector(".break-tab").classList.remove("active");
        // again start work timer
        workTimer();
      }
    }
  }, 1000);
}

