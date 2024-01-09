const tempField = document.querySelector(".temp"),
    cityField = document.querySelector(".date_time p"),
    dateField = document.querySelector(".date_time span"),
    imgField = document.querySelector(".condition img"),
    conditionField = document.querySelector(".condition span"),
    inputField = document.querySelector("#location_input"),
    form = document.querySelector("form"),
    loader = document.querySelector('.loader'),
    weather = document.querySelector(".weather_data");

let target = "dewas";

const fetchData = async (target) => {
    loader.style.visibility = "visible";
    weather.style.visibility = "hidden";
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();

        const {
            current: {
                temp_c,
                condition: { text, icon }
            },
            location: { name, localtime },
        } = data;
        updateDate(`${temp_c}°C`, name, localtime, icon, text);
    } catch (e) {
        alert("Location not Found!");
    }
}

function updateDate(temp, city, time, img, text) {
    tempField.innerText = temp;
    cityField.innerText = city;
    imgField.src = img;
    conditionField.innerText = text;
    const realDate = time.split(" ")[0];
    const realTime = time.split(" ")[1];
    const exactDay = new Date(realDate).getDay();
    dateField.innerText = `${realTime} - ${getDayName(exactDay)} ${realDate}`;
    setTimeout(() => {
        loader.style.visibility = "hidden"
        weather.style.visibility = "unset"
    }, 1000);
}

function getDayName(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tueday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "";
    }
}


fetchData(target);

const search = (e) => {
    e.preventDefault();
    target = inputField.value;
    fetchData(target);
}
form.addEventListener("submit", search);