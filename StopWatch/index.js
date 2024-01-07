let seconds = document.getElementById("seconds"),
  minutes = document.getElementById("minutes"),
  hours = document.getElementById("hours");

let second = 0,
  minute = 0,
  hour = 0;

let id;
const startDisabled = false;

function startClock() {
  if (!startDisabled) {
    id = setInterval(() => {
      seconds.innerText = (++second).toString().padStart(2, "0");
      if (minute > 59) {
        hours.innerText = (++hour).toString().padStart(2, "0");
        (minute = 0), (second = 0);
        minutes.innerText = "00";
        seconds.innerText = "00";
      } else if (second > 59) {
        minutes.innerText = (++minute).toString().padStart(2, "0");
        seconds.innerText = "00";
        second = 0;
      }
    }, 1000);
    startDisabled = true;
  }
}
function stopClock() {
  clearInterval(id);
  startDisabled = false;
}
function resetClock(params) {
  seconds.innerText = "00";
  minutes.innerText = "00";
  hours.innerText = "00";
  (hour = 0), (minute = 0), (second = 0);
  stopClock();
}
