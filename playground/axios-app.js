const axios = require('axios').default;


// axios.get("https://reqres.in/users?page=2")
//     .then(function(response) {
//         console.log(response.status)
//         console.log(response.data);
//         console.log(response.statusText);
//     })
//     .catch(function(error) {
//         console.log("Error", error.response.data);
//     })
//     .finally(function() {
//         console.log("finally");
//     });


axios.get("https://reqres.in/api/users?page=2")
    .then(function(response) {
        console.log(response.status)
        console.log(response.data);
        console.log(response.data.data[0].id);
    })
    .catch(function(error) {
        if (error instanceof TypeError) {
            console.log("TypeError :", error);
        } else {
            console.log("Error", error.response.data);
        }
    })
    .finally(function() {
        console.log("finally");
    })