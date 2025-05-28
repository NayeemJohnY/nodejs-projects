// const fs = require('fs')

// fs.writeFileSync("notes.txt", "This file is created by Node js")

// // Challenge : Append a message to notes.txt

// fs.appendFileSync("notes.txt", "Append the text to file")

// const eName = require('./utils.js');

// console.log(eName);

// const add = require("./utils.js")
// console.log("Add result = ", add(20, 15));

// const fetchNotes = require("./notes.js")
// console.log("Notes : ", fetchNotes());

// const validator = require('validator')
// console.log(validator.isEmail('@example.com'));
// console.log(validator.isURL('http://fde.com:443'));


// const chalk = require("chalk")
// console.log(chalk.green("Success"));
// console.log(chalk.red("Fail"));
// console.log(chalk.inverse.blue("Info"));
// console.log(chalk.blue.bgYellow.bold("Warning"));


// eName = "nayeem"
// console.log(eName);
// console.log(process.argv[2])
// if (process.argv[2] === "add") {
//     console.log("Add");
// }


const yargs = require("yargs")
    // yargs.version("1.1.1.0")
    // console.log(process.argv)


// yargs.command({
//     command: "add",
//     description: "Add a new note",
//     handler: function() {
//         console.log("===> Added a new note")
//     },
//     command: "read",
//     description: "reading a note",
//     handler: function() {
//         console.log("===> Removing a new note")
//     },
// })

// yargs.command({
//     command: "remove",
//     description: "Remove a note",
//     handler: function() {
//         console.log("===> Removing a new note")
//     }
// })

// yargs.command({
//     command: "list",
//     description: "listing notes",
//     handler: function() {
//         console.log("===> listing notes")
//     }
// })

// yargs.command({
//         command: "print_title",
//         description: "Printing title from cmd line",
//         builder: {
//             title: {
//                 description: "Title to print command",
//                 demandOption: true,
//                 type: "string"
//             }
//         },
//         handler: function(argv) {
//             console.log("print :", argv)
//         }
//     })
//     // console.log(yargs.argv)
// yargs.parse()


// yargs.command({
//     command: "body",
//     description: "Adding body to the notes",
//     builder: {
//         body: {
//             description: "Body to notes",
//             demandOption: true,
//             type: "string"
//         }
//     },
//     handler: function(argv) {
//         console.log("Print the body : ", argv.body)
//     }
// })
// yargs.parse()


const notes = require("./notes")
yargs.command({
    command: "addNotes",
    description: "Addding notes",
    builder: {
        title: {
            type: "string",
            demandOption: true,
            description: "Title of the Notes"
        },
        body: {
            type: "string",
            demandOption: true,
            description: "body content of notes"
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})
yargs.command({
    command: "removeNotes",
    description: "Removing notes with title",
    builder: {
        title: {
            type: "string",
            demandOption: true,
            description: "Title of the Notes"
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command: "listNotes",
    description: "Listing notes title",
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: "readNotes",
    description: "Reading notes",
    builder: {
        title: {
            type: "string",
            demandOption: true,
            description: "Title of the Notes"
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

yargs.parse()