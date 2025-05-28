const path = require('path')
const express = require('express');
const hbs = require('hbs')
const axios = require('axios').default;
const getLocation = require('../utils/getLocation');
const getTemperature = require('../utils/getTemperature');

app = express();
console.log(__dirname);
console.log(__filename);
publicDirectoryPath = path.join(__dirname, '../public');
templatesPath = path.join(__dirname, '../templates')
partialsPath = path.join(__dirname, '../templates/partials')
console.log(publicDirectoryPath);


app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


// app.get('', (req, res) => {
//     res.send("<b>Welcome to the node js webserver</b>")
// })



// app.get('', (req, res) => {
//     res.render('index', {
//         text: 'Welcome to the node'
//     })
// })

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'help menu',
        menu: "Menu icon"
    })
})
app.get('', (req, res) => {
        res.render('template_1', {
            value: "of your choice",
        })
    })
    // app.get('', (req, res) => {
    //     res.render('index', {
    //         value: "Greate Man BBGYOR"
    //     })
    // })
app.get('/about', (req, res) => {
    res.send('<h1> It is an About page</h1>')
})

app.get('/json', (req, res) => {
    res.send({
        name: 'nayeem',
        age: 27
    })
})



// app.get("/weather", (req, res) => {
//     res.send({
//         city: 'Chennai',
//         temp: 289.0
//     })
// })

app.get("/weather", (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'You must provide an city!'
        })
    }
    getLocation(req.query.city, ({ latitude, longitude, city } = {}, error) => {
        if (error) {
            return res.send({ error: "Error while fetching location :" + error });
        }
        console.log("The latitude : " + latitude + ", and longitude : " + longitude + ", of city : " + city);
        getTemperature(latitude, longitude, city, ({ city, temp } = {}, error) => {
            if (error) {
                return res.send({ error: "Error while fetching temperature :" + error });
            }
            console.log("The Temperature is city : " + city + " is: ", temp);
            res.send({
                city: city,
                temp: temp
            })
        })
    })
})

// app.get('/help/*', (req, res) => {
//     res.send("Help Article not found")
// })


// app.get('*', (req, res) => {
//     res.send("Page is not found : 404")
// })

app.get('*', (req, res) => {
    res.render('404', {
        text: req.path
    })
})

app.listen(3000, (req, res) => {
    console.log("Web Server is up & running at port 3000");
})