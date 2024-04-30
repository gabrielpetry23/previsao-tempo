const searchButton = document.querySelector('#search');
const cityName = document.querySelector('#city-name').value;
const apiKey = 'd4c18acba714db26450483a3b0c2f7f4';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

searchButton.addEventListener('submit', async (event) => {
    event.preventDefault;

    if (!cityName) {
        document.querySelector('#weather').classList.remove('show');
        showAlert("Digite uma cidade!");
        return;
    }

    const results = await fetch (apiUrl);
    const json = await results.json();
    console.log(json); //ver se ta funcionando

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector('#weather').classList.remove('show');
        showAlert("Não foi possível localizar.")
    }
});

function showAlert(msg) {
    document.querySelector('.alert').innerHTML = msg;
}

function showInfo(json) {
    showAlert('');
    document.querySelector('#weather').classList.add('show');
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(1)} <sup>C</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`;
    document.querySelector('#temp-img').setAttribute('src', ` https://openweathermap.org/img/wn/${json.tempIcon}10d@2x.png`);
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1)} <sup>C</sup>`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1)} <sup>C</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function switchImages() {
    
}