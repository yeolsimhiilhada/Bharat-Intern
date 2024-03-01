const container = document.querySelector(".container"),
  body = document.querySelector(".body"),
  inputPart = document.querySelector(".input-section"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = container.querySelector(".weather-section"),
  wIcon = weatherPart.querySelector("img"),
  windSpan = weatherPart.querySelector(".wind span");
arrowBack = container.querySelector("header i");
let api;
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});
function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6cb636c48d31ef6031587201c5718c4e`;
  fetchData();
}
function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6cb636c48d31ef6031587201c5718c4e`;
  fetchData();
}
function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}
function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Something went wrong";
      infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;
    const { speed } = info.wind;
    // const timezoneOffset = info.timezone; // Timezone offset in seconds
    // const currentTime = new Date((Date.now() + timezoneOffset) * 1000);
    // // const localHour = currentTime.getHours();
    // const isDaytime = currentTime >= 6 && currentTime < 18;
    const sunrise = info.sys.sunrise * 1000; // Convert sunrise time to milliseconds
    const sunset = info.sys.sunset * 1000; // Convert sunset time to milliseconds
    const currentTime = new Date().getTime(); // Get current time in milliseconds
    const isDaytime = currentTime >= sunrise && currentTime < sunset;
    if (isDaytime && id == 800) {
      wIcon.src = "weather_icons/sunny-day.png";
      body.style.backgroundImage =
        "url('weather_icons/sunny-day-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (!isDaytime && id == 800) {
      wIcon.src = "weather_icons/clear-night.png";
      body.style.backgroundImage =
        "url('weather_icons/clear-night-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (id >= 200 && id <= 232 && isDaytime) {
      wIcon.src = "weather_icons/stormy-day.png";
      body.style.backgroundImage =
        "url('weather_icons/stormy-day-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (id >= 200 && id <= 232 && !isDaytime) {
      wIcon.src = "weather_icons/stormy-night.png";
      body.style.backgroundImage =
        "url('weather_icons/stormy-night-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (id >= 600 && id <= 622 && isDaytime) {
      wIcon.src = "weather_icons/snowy-day.png";
      body.style.backgroundImage =
        "url('weather_icons/snowy-day-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (id >= 600 && id <= 622 && !isDaytime) {
      wIcon.src = "weather_icons/snowy-night.png";
      body.style.backgroundImage =
        "url('weather_icons/snowy-night-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (id >= 701 && id <= 781 && isDaytime) {
      wIcon.src = "weather_icons/morning-haze.png";
      body.style.backgroundImage =
        "url('weather_icons/morning-haze-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (id >= 701 && id <= 781 && !isDaytime) {
      wIcon.src = "weather_icons/night-haze.png";
      body.style.backgroundImage =
        "url('weather_icons/night-haze-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (id >= 801 && id <= 804 && isDaytime) {
      wIcon.src = "weather_icons/cloudy-day.png";
      body.style.backgroundImage =
        "url('weather_icons/cloudy-day-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (id >= 801 && id <= 804 && !isDaytime) {
      wIcon.src = "weather_icons/cloudy-night.png";
      body.style.backgroundImage =
        "url('weather_icons/cloudy-night-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (
      ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) &&
      isDaytime
    ) {
      wIcon.src = "rainy-day.png";
      body.style.backgroundImage =
        "url('weather_icons/rainy-day-background.jpg')";
      body.style.backgroundSize = "cover";
    } else if (
      ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) &&
      !isDaytime
    ) {
      wIcon.src = "rainy-night.png";
      body.style.backgroundImage =
        "url('weather_icons/rainy-night-background.jpg')";
      body.style.backgroundSize = "contain";
    }

    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText =
      Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    if (speed !== undefined) {
      const windSpeed = (speed * 3.6).toFixed(2);
      windSpan.innerText = `${windSpeed} km/h`;
    } else {
      windSpan.innerText = "N/A";
    }

    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    container.classList.add("active");
  }
}
arrowBack.addEventListener("click", () => {
  container.classList.remove("active");
  body.style.backgroundImage = "";
});
