document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '4bbd26ac842775674ba861b046343ba4'; 
  
    const loginButton = document.getElementById('login');
    const signupButton = document.getElementById('signup');
  const weatherContainer = document.querySelector('.left-info');
  const todayInfo = document.querySelector('.today-info');
  const todayWeather = document.querySelector('.today-weather');
  const cityInput = document.querySelector('#city');
  const searchButton = document.querySelector('#search');

 
  const fetchWeather = async (city) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use metric for Celsius
      try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.cod === 200) {
              updateWeatherUI(data);
          } else {
              alert('City not found');
          }
      } catch (error) {
          console.error('Error fetching weather data:', error);
      }
  };

  
  const updateWeatherUI = (data) => {
      const { name, weather, main, wind, sys } = data;
      const weatherDescription = weather[0].description;
      const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
      const temperature = main.temp;
      const humidity = main.humidity;
      const precipitation = weather[0].main === 'Rain' ? 'Yes' : 'No';
      const windSpeed = wind.speed;
      const date = new Date().toLocaleDateString();
      
      todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('en-EN', { weekday: 'long' });
      todayInfo.querySelector('span').textContent = date;
      todayInfo.querySelector('div span').textContent = `${name}, ${sys.country}`;
      
      todayWeather.querySelector('.weather-temp').textContent = `${temperature}°C`;
      todayWeather.querySelector('h3').textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
      todayWeather.querySelector('i').setAttribute('class', `bx bx-${weather[0].icon}`);

      document.querySelector('.day-info .value').textContent = `${precipitation} %`;
      document.querySelector('.day-info .value:nth-of-type(2)').textContent = `${humidity} %`;
      document.querySelector('.day-info .value:nth-of-type(3)').textContent = `${windSpeed} km/h`;
  };

  
  searchButton.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city) {
          fetchWeather(city);
      } else {
          alert('Please enter a city name');
      }
  });

  // Optional: Allow pressing Enter to trigger search
  cityInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          searchButton.click();
      }
  });
  // Event listener for login button
  loginButton.addEventListener('click', () => {
    console.log('Login button clicked'); // Debugging line
    alert('Login button clicked');
  });
  
  signupButton.addEventListener('click', () => {
    console.log('Signup button clicked'); // Debugging line
    alert('Signup button clicked');
  });
  
});
