const fs = require('fs')
    // const book = {
    //     title: 'Book title',
    //     author: 'Author'
    // }

// const bookJson = JSON.stringify(book)
// console.log(bookJson)

// const parsedData = JSON.parse(bookJson)
// console.log(parsedData.title, parsedData.author)
// fs.writeFileSync("1-json.json", bookJson)

// const dataBuffer = fs.readFileSync("1-json.json")
// console.log(dataBuffer);
// const stringData = dataBuffer.toString()
// console.log(stringData);
// const parsedData = JSON.parse(stringData)
// console.log(parsedData.title);

const dataBuffer = fs.readFileSync("1-chaljson.json")
let stringData = dataBuffer.toString()
const parsedData = JSON.parse(stringData)
parsedData.role = "Test Automation Enginner"
parsedData.age = 26
stringData = JSON.stringify(parsedData)
console.log(stringData);
fs.writeFileSync("1-chaljson.json", stringData)