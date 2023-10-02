const button = document.getElementById("get-location-button");
const currentLocationDiv = document.getElementById("current-location");
const weatherInfoDiv = document.getElementById("weather-info");

async function getData(lat, long) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5fdc3024bfb04f95b04120512230110&q=${lat},${long}&aqi=no`);
    return await response.json();
}

async function geolocation(position) {
    try {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Display current location on the screen
        currentLocationDiv.innerHTML = `
            <h2>Current Location</h2>
            <p>Latitude: ${latitude}</p>
            <p>Longitude: ${longitude}</p>
        `;

        const result = await getData(latitude, longitude);
        console.log(result);

        // Display weather information on the screen
        weatherInfoDiv.innerHTML = `
            <h2>Weather Information</h2>
            <p>Location: ${result.location.name}, ${result.location.country}</p>
            <p>Temperature: ${result.current.temp_c}°C</p>
            <p>Condition: ${result.current.condition.text}</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function failedToGet() {
    console.log("Failed to get location");
}

button.addEventListener('click', async () => {
    const result = navigator.geolocation.getCurrentPosition(geolocation, failedToGet);
});
