console.log("Client side JS File content");


weatherForm = document.querySelector('form')
city = document.querySelector('input[name="city"]')
weatherInfo = document.querySelector('p[id="weatherInfo"]')
weatherError = document.querySelector('p[id="weatherError"]')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherInfo.textContent = 'Loading...'
    weatherError.textContent = ''
    console.log("Input City : ", city.value);
    fetch("http://localhost:3000/weather?city=" + city.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                console.log("Error: " + data.error);
                weatherError.textContent = data.error;
                weatherInfo.textContent = ''
            } else {
                console.log("City :", data.city);
                console.log("Temp :", data.temp);
                weatherInfo.textContent = "City : " + data.city + " Temp : " + data.temp
            }
        }).catch(err => {
            console.log(err);
        })
    })
})