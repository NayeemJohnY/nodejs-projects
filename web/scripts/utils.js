function setDate() {
    var today = new Date().toISOString().substr(0, 10);
    if (document.querySelectorAll("#date").length > 0) {
        for (element of document.querySelectorAll("#date")) {
            element.value = today
            element.max = today
        }
    }
}

function removeShakeClass(...fields) {
    fields.forEach(field => setTimeout(() => { //remove shake class after 500ms
        field.classList.remove("shake");
    }, 500));
}

function checkInputs(input, field) {
    if (input.value == "") { //if value is empty then add error and remove valid class
        field.classList.add("error");
        field.classList.remove("valid");
    } else { //if value is not empty then remove error and add valid class
        field.classList.remove("error");
        field.classList.add("valid");
    }
}

$(document).on("click", "table button[id='remove']", function() {
    table = this.parentNode.parentNode.parentNode
    formNode = table.parentNode
    $(table).fadeOut()
    setTimeout(function() {
        table.remove()
        if (formNode.querySelectorAll("table").length === 0) {
            $(formNode.querySelector("input[type='submit']")).hide()
            displayMessageBox("அனைத்தும் நீக்கப்பட்டது", "info")
        }
    }, 600);
    listOfTables = document.querySelectorAll("table")
    index = Array.prototype.indexOf.call(listOfTables, table)
    arrayOfMapOfData.splice(index, 1)
    console.log(arrayOfMapOfData)
});

function displayMessageBox(message, messageType) {
    messageDiv = document.createElement("div")
    messageDiv.classList.add("message-box")
    messageDiv.innerHTML = `<span class="closebtn">&times;</span>` + message
    switch (messageType) {
        case "Success":
            messageDiv.classList.add("class", "success")
            break;
        case "Failure":
            messageDiv.classList.add("class", "failure")
            break;
        case "Warning":
            messageDiv.classList.add("class", "warning")
            break;
        default:
            messageDiv.classList.add("class", "info")
            break;
    }
    document.querySelector('body').appendChild(messageDiv)
    setTimeout(() => {
        closeMessageBox(messageDiv.querySelector('.closebtn'))
    }, 3000);
}

function closeMessageBox(messageCloseBtn) {
    messageDiv = messageCloseBtn.parentElement;
    messageDiv.style.opacity = "0";
    setTimeout(function() { messageDiv.remove() }, 600);
}

function createEntryTable(entryMap, WrapperIdToHide, FormIdToForTable) {
    entryTable = document.createElement("table");
    for (const [mapKey, value] of Object.entries(entryMap)) {
        headerTextNode = document.createTextNode(mapKey)
        th = document.createElement('th');
        th.appendChild(headerTextNode);
        td = document.createElement('td');
        idValue = idPlaceholderMap[mapKey]
        td.setAttribute("id", idValue)
        if (idValue == "date") {
            dateValue = value.toString().split("-").reverse().join("/")
            cellTextNode = document.createTextNode(dateValue)
        } else {
            cellTextNode = document.createTextNode(value)
        }
        td.appendChild(cellTextNode);
        tr = document.createElement('tr');
        tr.appendChild(th);
        tr.appendChild(td);
        entryTable.appendChild(tr);
    }
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.setAttribute("colspan", 2)
    removeEntryTableElement = document.createElement("button")
    removeEntryTableElement.setAttribute("id", "remove")
    removeEntryTableElement.innerHTML = '<i class="icon fa fa-times fa-lg"></i> நீக்கு'
    td.appendChild(removeEntryTableElement)
    tr.appendChild(td);
    entryTable.appendChild(tr);

    FormForTable = document.getElementById(FormIdToForTable)
    FormForTable.querySelector("input[type='submit']").removeAttribute("style")
    submitBtn = FormForTable.querySelector("input[type='submit']")
    submitBtn.parentNode.insertBefore(entryTable, submitBtn)

    $(document.getElementById(WrapperIdToHide)).hide()
    $(FormForTable.parentNode).fadeIn("slow")
}