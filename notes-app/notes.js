// function getNotes() {
//     return "your Notes...."
// }

// module.exports = getNotes
const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes()
        // const duplicateNotes = notes.filter(note => note.title === title)
        // To find first match
    const duplicteNote = notes.find(note => note.title === title)
    if (!duplicteNote) {
        notes.push({ title: title, body: body })
        saveNotes(notes)
        console.log("Added new note");
    } else {
        console.log("Note with title: " + title + " already taken");
    }

}

const removeNotes = (title) => {
    const notes = loadNotes()
        // findNotes = notes.filter(note => note.title === title)
        // if (findNotes.length === 0) {
        //     console.log(chalk.bgRed("No Notes are found for the title " + title));
        // } else {
        //     console.log("Total " + findNotes.length + " are found for title " + title);
        //     notesToKeep = notes.filter(note => note.title != title)
        //     saveNotes(notesToKeep)
        //     console.log(chalk.bgGreen("Removed the notes with title: " + title));
        // }
    notesToKeep = notes.filter(note => note.title != title)
    notesdiff = notes.length - notesToKeep.length
    if (notesdiff) {
        console.log("Total " + notesdiff + " are found for title " + title);
        console.log(chalk.bgGreen("Removed the notes with title: " + title));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed("No Notes are found for the title " + title));
    }


}

const listNotes = () => {
    console.log(chalk.inverse("Your Notes"));
    notes = loadNotes()
    notes.forEach(note => console.log(note.title))
}

const readNotes = (title) => {
    notes = loadNotes()
        // debugger
    notesToRead = notes.find(note => note.title === title)
    if (notesToRead) {
        console.log(chalk.green("Body Of Notes title :"), chalk.inverse(title))
        console.log(notesToRead.body)
    } else {
        console.log(chalk.bgRed("No Notes are found for the title " + title));
    }
}
const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync("notes.json")
        return JSON.parse(notesBuffer.toString())
    } catch (error) {
        console.log(chalk.red(error.message));
        return []
    }

}

const saveNotes = (notes) => {
    fs.writeFileSync("notes.json", JSON.stringify(notes))
}


module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}