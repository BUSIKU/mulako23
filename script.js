const apiKey = '2075a3fef86b405c99465912241310';
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.querySelector('.weather-info');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        if (data.cod === '404') {
            alert('City not found');
        } else {
            displayWeatherData(data);
        }
    } catch (error) {
        alert('Error fetching the data');
    }
}

function displayWeatherData(data) {
    const cityName = document.getElementById('cityName');
    const temp = document.getElementById('temp');
    const condition = document.getElementById('condition');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const localTime = document.getElementById('localTime');
    const icon = document.getElementById('icon');
    
    cityName.textContent = data.name;
    temp.textContent = Math.round(data.main.temp);
    condition.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
    
    const weatherIcon = data.weather[0].icon;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="weather-icon">`;

    // Get the local time of the searched city using the timezone offset
    const timezoneOffset = data.timezone;
    const localDate = new Date(new Date().getTime() + (timezoneOffset * 1000));
    localTime.textContent = `Local Time: ${localDate.toLocaleTimeString()}`;
    
    weatherInfo.style.display = 'block';
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherDataByCoords(lat, lon);
    });
}

async function fetchWeatherDataByCoords(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    displayWeatherData(data);
}
