// get dom elements
const timerElem = document.querySelector(".timer");
const startBtn = document.querySelector(".action");
const buttonsElem = document.querySelector(".buttons");

const modal = document.querySelector(".setting-modal");
const settingsBtn = document.querySelector(".settings");
const workInput = document.querySelector("#work");
const breakInput = document.querySelector("#break");
const sessionInput = document.querySelector("#session");
const applyBtn = modal.querySelector(".apply");
const closeModalBtn = modal.querySelector(".close-modal");

// default values
let session = Number(sessionInput.value);
let sessionCounter = 0;

// get input values
let workTime;
let breakTime;

//interval
let workInterval;
let breakInterval;

function loadTimer() {
  timerElem.innerHTML = `${workInput.value}:00`;
  buttonsElem.querySelector(".work-tab").classList.add("active");
}

loadTimer();



// buttons
buttonsElem.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', function(e){
    // remove all previous values
    buttonsElem.querySelector(".active").classList.remove("active");
    timerElem.innerHTML = ``;

    if(e.target.className === 'work-tab'){
      timerElem.innerHTML = `${workInput.value}:00`;
      e.target.classList.add('active')
    }
    if(e.target.className === 'break-tab'){
      timerElem.innerHTML = `${breakInput.value}:00`;
      e.target.classList.add('active')
    }
  })
})



startBtn.addEventListener("click", function () {
  // check which tab is selected then add timer according to it
  buttonsElem.querySelectorAll('button').forEach((button) => {
    console.log(button.className)
    if(button.className === 'work-tab active'){
      console.log(button)
      workTimer();
    }

    if(button.className === 'break-tab active'){
      console.log(button)
      breakTimer();
    }
  })
  
});

// function for worktimer
function workTimer() {
  workTime = Number(workInput.value);
  let workTimeInSec = workTime * 60;

  workInterval = setInterval(() => {
    workTimeInSec--;
    //format time
    const mins = Math.floor(workTimeInSec / 60);
    const secs = workTimeInSec % 60;

    // display
    timerElem.innerHTML = `${String(mins).padStart(2, "0")}:${String(secs)}`;

    // active work tab
    // buttonsElem.querySelector(".work-tab").classList.add("active");

    //workTimeInSec--;

    if (workTimeInSec < 0) {
      // clear interval
      clearInterval(workInterval);

      // remove active work tab
      // infoElem.querySelector(".work-tab").classList.remove("active");

      //show break timer
      //breakTimer();
    }
  }, 1000);
}

// breaktimer
function breakTimer() {
  breakTime = Number(breakInput.value);
  let breakTimeInSec = breakTime * 60;

  breakInterval = setInterval(() => {
    breakTimeInSec--;
    //format time
    const mins = Math.floor(breakTimeInSec / 60);
    const secs = breakTimeInSec % 60;

    // display
    console.log(`${String(mins).padStart(2, "0")}:${String(secs)}`);
    timerElem.innerHTML = `${String(mins).padStart(2, "0")}:${String(secs)}`;

    // active break tab
    // infoElem.querySelector(".break-tab").classList.add("active");


    if (breakTimeInSec < 0) {
      // clear interval
      clearInterval(breakInterval);

      // increae sessioncounter to 1
      sessionCounter++;

      // cheak for session, if it match with default
      if (sessionCounter === session) {
        console.log("time over, u completed 2 cycle");
        clearInterval(breakInterval);
        clearInterval(workInterval);
      } else {
        //reset break tab
        //infoElem.querySelector(".break-tab").classList.remove("active");
        // again start work timer
        //workTimer();
      }
    }
  }, 1000);
}

// open setting modal
settingsBtn.addEventListener("click", function () {
  modal.showModal();
});

//close modal
closeModalBtn.addEventListener("click", function () {
  modal.close();
});

// set new values in modal
applyBtn.addEventListener("click", function () {
  workTime = Number(workInput.value);
  breakTime = Number(breakInput.value)
  loadTimer();
  modal.close();
});
