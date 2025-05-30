const axios = require('axios').default

const getTemperature = (latitude, longitude, city, callback) => {
    axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: { lat: latitude, lon: longitude, appid: '7fe67bf08c80ded756e598d6f8fedaea' },
    }).then(function({ data }) {
        callback({ city: city, temp: data.main.temp }, undefined)
    }).catch(function(error) {
        callback(undefined, error)
    })
}

module.exports = getTemperature