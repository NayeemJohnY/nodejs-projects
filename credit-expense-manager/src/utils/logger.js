const tracer = require('tracer')

const fs = require('fs')
const path = require('path');
const date = [new Date().toISOString().substring(0,10)]
const filename = "./logs/cemanagerlog-" + date.join("-") + ".log"

const logger = tracer.colorConsole({
    format: [
        '[{{timestamp}}][{{title}}][{{file}}:{{line}}][{{event}}]  {{message}}', //default format
        {
            error: '[{{timestamp}}][{{title}}][{{file}}:{{line}}][{{event}}]  {{message}}\nCall Stack:\n{{stack}}' // error format
        }
    ],
    dateformat: 'yyyy-mm-dd HH:MM:ss.L',
    preprocess: function (data) {
        data.title = data.title.toUpperCase()
        data.event = data.args[0].toUpperCase()
        data.args[0] = ""
    },
    transport: [
        function (data) {
            fs.appendFile(filename, data.rawoutput + '\n', (err) => {
                if (err) throw err;
            });
        },
        function (data) {
            console.log(data.output);
        }
    ]
});

const deleteLogFiles = () => {

    files = fs.readdirSync("./logs")
    var deletedFiles = files.filter(file => !filename.includes(file))
    for (const file of deletedFiles) {
        fs.unlinkSync(path.join("./logs", file), err => {
            if (err) throw err;
        });
    };
    return deletedFiles
}

module.exports = {
    logger,
    deleteLogFiles
}


