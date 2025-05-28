const express = require('express');
const path = require('path')


const app = express();

publicDirectoryPath = path.join(__dirname);
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.html')
})

app.get('/application', (req, res) => {
    // res.send("GOOD")
    res.render('application.html')
})

app.listen(5000, () => {
    console.log('listening on port')
})