// constants for use in calculations
const sec = 1000,
    min = 60 * sec,
    hour = 60 * min,
    day = 24 * hour;

//selecting html elements
const days = document.querySelector(".day"),
    hours = document.querySelector(".hour"),
    minutes = document.querySelector(".min"),
    seconds = document.querySelector(".sec"),
    heading = document.querySelector("h1"),
    counter = document.querySelector(".counter");

//taking input from user
const takeInput = (yyyy) => {

    let enterDay = prompt("Enter Day").padStart(2, "0");
    //make sure entered Day is valid
    while (enterDay > 31) {
        alert("Please provide a valid Date!");
        enterDay = prompt("Enter Day").padStart(2, "0");
    }

    let enterMonth = prompt("Enter Month").padStart(2, "0");
    //make sure entered Day is valid
    while (enterMonth > 12) {
        alert("Please provide a valid Month!");
        enterMonth = prompt("Enter Month").padStart(2, "0");
    }

    //return input in form --> 06/06/2024
    return `${enterMonth}/${enterDay}/${yyyy}`;
}

//main funtion that changes the timer
const timer = () => {

    //today's date
    let now = new Date(),
        dd = now.getDay().toString().padStart(2, "0"),
        mm = now.getMonth().toString().padStart(2, "0"),
        yyyy = now.getFullYear();

    //storing the input
    let targetDate = takeInput(yyyy);

    //converting to 06/22/2024
    now = `${mm}/${dd}/${yyyy}`;

    //if "now" is greater increase year by 1
    if (now > targetDate) {
        targetDate = `${enterMonth}/${enterDay}/${yyyy + 1}`;
    }

    // creating an interval to continuously update the value
    const id = setInterval(() => {

        //input time in ms
        const enteredTime = new Date(targetDate).getTime();

        //current time in ms
        const currentTime = new Date().getTime();

        //difference between enteredTime and current Time
        const diff = enteredTime - currentTime;

        // getting all other fields based on difference in time
        days.innerText = Math.floor(diff / day).toString().padStart(2, "0");
        hours.innerText = Math.floor((diff % day) / hour).toString().padStart(2, "0");
        minutes.innerText = Math.floor((diff % hour) / min).toString().padStart(2, "0");
        seconds.innerText = Math.floor((diff % min) / sec).toString().padStart(2, "0");

        // stop counter when time is arrived
        if (diff < 0) {
            counter.style.display = "none";
            heading.innerText = "Time's Up7"
            clearInterval(id);
        }

    }, 0);
};

//calling the function
timer();