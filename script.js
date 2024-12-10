const apiKey = "e59fc793a428f80ace4415ca7c2b14a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";

// search variables
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// image variable
const weatherIcon = document.querySelector(".weather-icon");

// function to link to API site
async function checkWeather(city) {
    if (!city) {
        document.querySelector(".error").innerHTML = "Please enter a city name";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status == 404 || data.cod === "404") {
        document.querySelector(".error").innerHTML = "City not found";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Update weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°f";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        
        // Convert wind speed from m/s to km/h
        const windSpeed = Math.round(data.wind.speed * 3.6); // m/s to km/h conversion
        document.querySelector(".wind").innerHTML = windSpeed + " km/h";

        // Update weather icon based on weather condition
        const weatherMain = data.weather[0].main;
        if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherMain === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherMain === "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if (weatherMain === "Wind") {
            weatherIcon.src = "images/wind.png";
        }
        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for Enter key press
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
