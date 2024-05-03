
const searchButton = document.querySelector('#search');
const apiKey = 'd4c18acba714db26450483a3b0c2f7f4';

searchButton.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    if (!cityName) {
        document.querySelector('#weather').classList.remove('show');
        showAlert("Digite uma cidade!");
        return;
    }

    const results = await fetch (apiUrl);
    const json = await results.json();
    console.log(json.weather[0]); //ver se ta funcionando

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
        switchBackImages(json);
        switchTempIcon(json);
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
    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(0)} <sup>°C</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`;
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(0)} <sup>°C</sup>`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(0)} <sup>°C</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function switchBackImages(json) {
    const weatherMain = json.weather[0].main;
    let imgUrl = ''
    if (weatherMain == "Rain" || weatherMain == "Drizzle") {
        imgUrl = "url('images/imageRainy.jpg')";
    } else if (weatherMain == "Clouds") {
        imgUrl = "url('images/imageCloudy.jpg')";
    } else if (weatherMain == "Clear") {
        imgUrl = "url('images/imageSunny.jpg')";
    } else {
        imgUrl = "url('images/backgroundImage.jpg')";
    }
    
    document.body.style.backgroundImage = imgUrl;
}

function switchTempIcon(json) {
    let iconSrc = '';
    const weatherMain = json.weather[0].main;
    if (weatherMain == "Rain" || weatherMain == "Drizzle") {
        iconSrc = "images/rainyIcon.png"
    } else if (weatherMain == "Clouds") {
        iconSrc = "images/cloudyIcon.png"
    } else if (weatherMain == "Clear") {
        iconSrc = "images/sunIcon.png"
    } else {
        iconSrc = "images/mistIcon.png"
    }

    document.querySelector('#temp-icon').setAttribute('src', iconSrc);
}