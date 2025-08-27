// Use an IIFE (Immediately Invoked Function Expression) to avoid global variable pollution
(function() {
    
    const API_KEY = "13ea3be5e8f0557e732ed1c115c8cee2"; //Use your own API Key
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

    // Get references to all necessary HTML elements
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherInfoDiv = document.getElementById('weather-info');
    const cityNameEl = document.getElementById('city-name');
    const weatherConditionEl = document.getElementById('weather-condition');
    const weatherIconEl = document.getElementById('weather-icon');
    const temperatureEl = document.getElementById('temperature');
    const humidityValueEl = document.getElementById('humidity-value');
    const windSpeedValueEl = document.getElementById('wind-speed-value');
    const statusMessageDiv = document.getElementById('status-message');
    const messageTextEl = document.getElementById('message-text');
    const loadingSpinnerEl = document.querySelector('.loading-spinner');

    // Async function to fetch weather data from the API
    async function getWeatherData(city) {
        // Check if API key is configured
        if (API_KEY === "YOUR_API_KEY") {
            displayMessage("Please configure your API key in the JavaScript code.");
            return;
        }

        // Hide previous data and show loading state
        weatherInfoDiv.classList.add('hidden', 'opacity-0');
        statusMessageDiv.classList.remove('hidden');
        loadingSpinnerEl.classList.remove('hidden');
        messageTextEl.textContent = "Fetching weather...";

        // Construct the full API URL
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Handle API response errors (e.g., city not found)
            if (data.cod !== 200) {
                displayMessage(data.message.charAt(0).toUpperCase() + data.message.slice(1) + '. Please check the city name.');
                return;
            }

            // Process and display the weather data
            displayWeatherData(data);

        } catch (error) {
            console.error("Error fetching weather data:", error);
            displayMessage("Failed to fetch weather data. Please try again later.");
        }
    }

    // Function to display an error or loading message
    function displayMessage(message) {
        loadingSpinnerEl.classList.add('hidden');
        messageTextEl.textContent = message;
        statusMessageDiv.classList.add('hidden');
        weatherInfoDiv.classList.add('hidden');
    }

    // Function to update the UI with weather information
    function displayWeatherData(data) {
        cityNameEl.textContent = data.name;
        weatherConditionEl.textContent = data.weather[0].description;
        temperatureEl.textContent = Math.round(data.main.temp);
        humidityValueEl.textContent = `${data.main.humidity}%`;
        windSpeedValueEl.textContent = `${data.wind.speed} m/s`;
        
        // Change the icon to a custom SVG for clear sky conditions
        const iconCode = data.weather[0].icon;
        let iconUrl = '';

        if (iconCode === '01d' || iconCode === '01n') {
            // Updated sun SVG with a more vibrant yellow/orange fill
            iconUrl = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fbbf24" stroke="%23f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-24 h-24 text-yellow-400"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        } else {
            // Use the default OpenWeatherMap icon for all other conditions
            iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        }

        weatherIconEl.src = iconUrl;
        
        // Show the weather info section and hide the status message
        statusMessageDiv.classList.add('hidden');
        weatherInfoDiv.classList.remove('hidden');
        setTimeout(() => {
            weatherInfoDiv.classList.remove('opacity-0');
        }, 10);
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            displayMessage("Please enter a city name.");
        }
    });

    // Event listener to allow searching with the "Enter" key
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Initial message
    displayMessage("Enter a city to get started.");
})();
