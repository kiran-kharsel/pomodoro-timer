// get dom elements
const timerElem = document.querySelector(".timer");
const startBtn = document.querySelector(".action");
const buttonsElem = document.querySelector(".buttons");
const workButton = buttonsElem.querySelector('.work-tab')

const modal = document.querySelector(".setting-modal");
const settingsBtn = document.querySelector(".settings");
const workInput = document.querySelector("#work");
const breakInput = document.querySelector("#break");
const sessionInput = document.querySelector("#session");
const applyBtn = modal.querySelector(".apply");
const closeModalBtn = modal.querySelector(".close-modal");




function showTimer(activeBtn = workButton) {

  if(activeBtn.classList.contains('work-tab')){
    timerElem.innerHTML = `${workInput.value}:00`;
  }

  if(activeBtn.classList.contains('break-tab')){
    timerElem.innerHTML = `${breakInput.value}:00`;
  }
  activeBtn.classList.add("active");
}

showTimer(workButton);


// function resetShowTimer
function resetShowTimer(){
  buttonsElem.querySelector(".active").classList.remove("active");
  timerElem.innerHTML = ``;
}

// select work or break timer
buttonsElem.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // remove all previous values
    resetShowTimer()

    if (e.target.className === "work-tab") {
      showTimer(e.target);
    }
    if (e.target.className === "break-tab") {
      showTimer(e.target);
    }
  });
});

startBtn.addEventListener("click", function () {
  // check which tab is selected then add timer according to it
  buttonsElem.querySelectorAll("button").forEach((button) => {

    if (button.className === "work-tab active") {
      updateTimer(workInput)
    }

    if (button.className === "break-tab active") {
      updateTimer(breakInput)
    }
  });
});


// update timer function
function updateTimer(inputElem){
  let time = Number(inputElem.value);
  let timeInSec = time*60;

  let interval = setInterval(() => {
    timeInSec--;

    //format time
    const {mins, secs} = formatTime(timeInSec)

    // display
    timerElem.innerHTML = `${String(mins).padStart(2, "0")}:${String(secs)}`;

    if (timeInSec < 0) {
      // clear interval
      clearInterval(interval);
      // show modal that timer is over
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
  // workTime = Number(workInput.value);
  // breakTime = Number(breakInput.value);
  resetShowTimer()
  showTimer();
  modal.close();
});

// format time function
function formatTime(timeInSec) {
  const mins = Math.floor(timeInSec / 60);
  const secs = timeInSec % 60;

  return {mins, secs}
}
