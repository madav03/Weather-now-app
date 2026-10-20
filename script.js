// WeatherNow: fetch current weather and update the page.

const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const apiKeyInput = document.querySelector("#api-key");
const searchButton = document.querySelector("#search-button");
const statusMessage = document.querySelector("#status-message");
const weatherSection = document.querySelector("#weather-section");

const fields = {
  city: document.querySelector("#city-name"),
  country: document.querySelector("#country-badge"),
  date: document.querySelector("#local-date"),
  icon: document.querySelector("#weather-icon"),
  temperature: document.querySelector("#temperature"),
  description: document.querySelector("#weather-description"),
  feelsLike: document.querySelector("#feels-like"),
  max: document.querySelector("#temp-max"),
  min: document.querySelector("#temp-min"),
  humidity: document.querySelector("#humidity"),
  wind: document.querySelector("#wind-speed"),
  pressure: document.querySelector("#pressure"),
  visibility: document.querySelector("#visibility")
};

function showStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`.trim();
}

function round(value) {
  return Math.round(value);
}

function displayWeather(data) {
  // The API returns a JSON object. These fields come from that response.
  fields.city.textContent = data.name;
  fields.country.textContent = data.sys.country || "";
  fields.date.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  fields.temperature.textContent = round(data.main.temp);
  fields.description.textContent = data.weather[0].description;
  fields.feelsLike.textContent = `${round(data.main.feels_like)}°C`;
  fields.max.textContent = `${round(data.main.temp_max)}°`;
  fields.min.textContent = `${round(data.main.temp_min)}°`;
  fields.humidity.innerHTML = `${data.main.humidity}<small>%</small>`;
  fields.wind.innerHTML = `${Number(data.wind.speed).toFixed(1)}<small> m/s</small>`;
  fields.pressure.innerHTML = `${data.main.pressure}<small> hPa</small>`;
  fields.visibility.innerHTML = `${(data.visibility / 1000).toFixed(1)}<small> km</small>`;

  const iconCode = data.weather[0].icon;
  fields.icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  fields.icon.alt = data.weather[0].description;

  weatherSection.classList.remove("hidden");
}

async function getWeather(city) {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    showStatus("Please paste your OpenWeatherMap API key first.", "error");
    apiKeyInput.focus();
    return;
  }

  if (!city.trim()) {
    showStatus("Please enter a city name.", "error");
    cityInput.focus();
    return;
  }

  searchButton.disabled = true;
  searchButton.textContent = "Loading…";
  showStatus(`Getting current weather for ${city.trim()}…`);

  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.search = new URLSearchParams({
      q: city.trim(),
      appid: apiKey,
      units: "metric"
    }).toString();

    const response = await fetch(url);

    // fetch does not automatically throw when the server returns a 404 or 401.
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Check the spelling and try again.");
      }
      if (response.status === 401) {
        throw new Error("API key not accepted. Check your key; a newly created key may take some time to activate.");
      }
      if (response.status === 429) {
        throw new Error("The API request limit may have been reached. Please try again later.");
      }
      throw new Error(`Weather service returned an error (${response.status}). Please try again.`);
    }

    const data = await response.json();
    displayWeather(data);
    showStatus(`Live weather loaded for ${data.name}.`, "success");
  } catch (error) {
    showStatus(error.message || "Something went wrong. Check your internet connection and try again.", "error");
  } finally {
    searchButton.disabled = false;
    searchButton.innerHTML = 'Search <span aria-hidden="true">→</span>';
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop the browser from reloading the page.
  getWeather(cityInput.value);
});

document.querySelectorAll(".city-chip").forEach((button) => {
  button.addEventListener("click", () => {
    cityInput.value = button.dataset.city;
    getWeather(button.dataset.city);
  });
});
