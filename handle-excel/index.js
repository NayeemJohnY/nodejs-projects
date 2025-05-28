const xlsx = require('xlsx')
const fs = require('fs')
const employees = [
    { name: 'Nayeem', email: 'nayeem@example.com', age: 27, date: "10/10/1995" },
    { name: 'John', email: 'john@example.com', age: 24, date: "02/02/2022" }
]


// JS Object to Excel
var workbook = xlsx.utils.book_new()
var worksheet = xlsx.utils.json_to_sheet(employees)
console.log(worksheet);
xlsx.utils.book_append_sheet(workbook, worksheet, "Employees")
xlsx.writeFile(workbook, "Employees.xlsx")

// Excel to JSON
var wb = xlsx.readFile("Salary.xlsx", { cellDates: true })
    // var wb = xlsx.readFile("Salary.xlsx", { dateNF: "MM/dd/yyyy" })
var ws = wb.Sheets['Students']
console.log(ws);
var htmlString = xlsx.utils.sheet_to_html(ws)
console.log(htmlString);
var exceljsondata = xlsx.utils.sheet_to_json(ws)
console.log(exceljsondata);
newData = exceljsondata.map((data) => {
    data.Salary = data.Salary + 15000
    return data
})
fs.writeFileSync('excel-json.json', JSON.stringify(newData, null, 2))
fs.writeFileSync('excel-table.html', htmlString)

// JSON to Excel
var jsoncontent = JSON.parse(fs.readFileSync('excel-json.json'))
var ws_2 = xlsx.utils.json_to_sheet(jsoncontent)
console.log(ws_2);
xlsx.utils.book_append_sheet(wb, ws_2, "Salary")
xlsx.writeFileSync(wb, "Employees-Salary.xlsx")