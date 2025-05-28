/*
1. Call a API to get lan & lon information for city
2. Call a API to get temperature of city by lan & lon

Note : Use callback and axios
*/
const axios = require('axios').default;

// getLocation = ((city, callback) => {
//     axios({
//         method: 'get',
//         url: 'https://api.openweathermap.org/data/2.5/weather',
//         params: { q: city, appid: '7fe67bf08c80ded756e598d6f8fedaea' },
//     }).then(function(response) {
//         callback(response.data.coord.lat, response.data.coord.lon)
//     })
// })

// getLocation(city = "chennai", (latitude, longitude) => {
//     console.log("The latitude : " + latitude + ", and longitude : " + longitude + ", of city : " + city);
//     axios({
//         method: 'get',
//         url: 'https://api.openweathermap.org/data/2.5/weather',
//         params: { lat: latitude, lon: longitude, appid: '7fe67bf08c80ded756e598d6f8fedaea' },
//     }).then(function(response) {
//         console.log("The Temperature is city :" + city + " is: ", response.data.main.temp);
//     })
// })

// Error Handling
getLocation = ((city, callback) => {
    axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: { q: city, appid: '7fe67bf08c80ded756e598d6f8fedaea' },
    }).then(function(response) {
        callback({
            latitude: response.data.coord.lat,
            longitude: response.data.coord.lon,
            city: response.data.name
        }, undefined)
    }).catch(function(error) {
        callback(undefined, error)
    })
})

city = process.argv[2]
    // getLocation(city, (data, error) => {

//     if (error) {
//         console.log("Error while fetching location :", error.message);
//     } else {
//         console.log("The latitude : " + data.latitude + ", and longitude : " + data.longitude + ", of city : " + data.city);
//         axios({
//             method: 'get',
//             url: 'https://api.openweathermap.org/data/2.5/weather',
//             params: { lat: data.latitude, lon: data.longitude, appid: '7fe67bf08c80ded756e598d6f8fedaea' },
//         }).then(function(response) {
//             console.log("The Temperature is city :" + city + " is: ", response.data.main.temp);
//         })
//     }
// })
// Object destrcuting
getLocation(city, ({ latitude, longitude, city } = {}, error) => {

    if (error) {
        console.log("Error while fetching location :", error.message);
    } else {
        console.log("The latitude : " + latitude + ", and longitude : " + longitude + ", of city : " + city);
        axios({
            method: 'get',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: { lat: latitude, lon: longitude, appid: '7fe67bf08c80ded756e598d6f8fedaea' },
        }).then(function({ data }) {
            // console.log("The Temperature is city : " + city + " is: ", response.data.main.temp);
            console.log("The Temperature is city : " + city + " is: ", data.main.temp);

        })
    }
})