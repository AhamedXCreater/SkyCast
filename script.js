const apiKey = "e4584b3aa83923663a59a96cd9068d97";

const cityInput = document.querySelector("input");
const searchBtn = document.querySelector(".search-box button");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    getWeather(city);
});

    cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        document.getElementById("Loading").style.display = "block";

        const response = await fetch(url);

        if (!response.ok) {
            alert("City not found!");
            return;
        }

        const data = await response.json();

        document.getElementById("city").innerText = data.name;
        document.getElementById("country").innerText = data.sys.country;
        document.getElementById("temperature").innerText = data.main.temp + "°C";
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity;
        document.getElementById("wind").innerText = data.wind.speed;
        document.getElementById("feels-like").innerText = data.main.feels_like;
        document.getElementById("pressure").innerText = data.main.pressure;

        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);

        document.getElementById("sunrise").innerText =
        sunrise.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
});

        document.getElementById("sunset").innerText =
        sunset.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
});

        document.getElementById("Loading").style.display = "none";

        const icon = data.weather[0].icon;

        document.getElementById("weather-icon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

        const weatherMain = data.weather[0].main;
        const weatherDescription = data.weather[0].description;

        console.log("Main:", weatherMain);
        console.log("Description:", weatherDescription);


        if (weatherMain === "Clear") {
            document.body.style.backgroundImage = "url('background/clear.jpg')";
}
        else if (weatherMain === "Clouds") {
            document.body.style.backgroundImage = "url('background/cloudy.jpg')";
}
        else if (weatherMain === "Rain" || weatherMain === "Drizzle") {
            document.body.style.backgroundImage = "url('background/rain.jpg')";
}
        else if (weatherMain === "Snow") {
            document.body.style.backgroundImage = "url('background/snow.jpg')";
}
        else {
            document.body.style.backgroundImage = "url('background/clear.jpg')";
}

    } catch (error) {

        document.getElementById("Loading").style.display = "none";
        alert("Something went wrong.");
        console.log(error);
    }

}