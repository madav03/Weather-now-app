# WeatherNow — Real-Time Weather App

A beginner-friendly weather application made with HTML, CSS and JavaScript. It retrieves current weather information from OpenWeatherMap's Current Weather API.

## Features
- Search weather by city
- Current temperature in Celsius
- Feels-like, minimum and maximum temperature
- Humidity, wind speed, atmospheric pressure and visibility
- Weather description and icon
- Loading messages and errors for common API failures
- Responsive layout for desktop and mobile
- API key is entered by the user and is not saved by this app

## Run it
1. Extract the ZIP.
2. Open the `WeatherNow` folder in VS Code.
3. Open `index.html` with the VS Code Live Server extension, or open it in a browser.
4. Create/sign in to an OpenWeatherMap account and copy your API key from the API keys section.
5. Paste the key into the app's API-key field.
6. Search for Delhi or another city.

A new API key may not work immediately; activation can take some time. You need internet access for the API call and weather icons.

## Files
- `index.html`: content and layout (structure)
- `style.css`: colours, spacing, cards and responsive design (presentation)
- `script.js`: search events, API request, response handling and DOM updates (behaviour)
- `VIVA-GUIDE.md`: beginner tutorial and speaking script

## Important note about API keys
This is a front-end learning project. A key used in a browser is visible to the user through browser developer tools/network requests. Do not use this pattern for a production application with a private or sensitive key. A production app should make the API request through a backend server and keep secrets there.

## API endpoint
`https://api.openweathermap.org/data/2.5/weather`

The request includes `q` (city), `appid` (API key), and `units=metric`. OpenWeatherMap documents the response fields used in this project.
