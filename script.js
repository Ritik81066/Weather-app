const apiKey = "***********************"; // Replace with your OpenWeatherMap API key

document.getElementById("location-form").addEventListener("submit", function(event) {
    event.preventDefault();
    getWeather();
});

async function getWeather() {
    const location = document.getElementById("location-input").value.trim();
    const weatherData = document.getElementById("weather-data");

    if (location === "") {
        weatherData.innerHTML = "<p class='error'>Please enter a city name.</p>";
        return;
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherData.innerHTML = `<p class='error'>Error: ${data.message}</p>`;
            return;
        }

        weatherData.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherData.innerHTML = "<p class='error'>Error: Unable to fetch data.</p>";
    }
}
