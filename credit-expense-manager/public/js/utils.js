function setDate() {
    var today = new Date().toISOString().substring(0, 10);
    var dateElements = document.querySelectorAll("input[type='date']")
    if (dateElements.length > 0) {
        for (element of dateElements) {
            element.value = today
            element.max = today
        }
    }
}

function removeShakeClass(...fields) {
    fields.forEach(async (field) => {
        await timeoutPromiseResolve(500)
        field.classList.remove("shake");
    })
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
$(document).on("click", "table button[id='remove']", async function (event) {
    event.preventDefault()
    table = this.parentNode.parentNode
    tableIndex = table.getAttribute("index")
    formNode = table.parentNode
    $(table).fadeOut()
    await timeoutPromiseResolve(600)
    table.remove()
    if (formNode.querySelectorAll("table").length === 0) {
        $(formNode.querySelector("input[type='submit']")).fadeOut()
        await displayMessageBox("அனைத்தும் நீக்கப்பட்டது", "info")
        $(".wrapper[style='']").fadeOut(() => {
            $("#menuitems").fadeIn()
        })
    }
    arrayOfDataObject.splice(tableIndex, 1)
    arrayOfPayload.splice(tableIndex, 1)
});

$(document).on("click", ".message-box .closebtn", function (e) {
    e.preventDefault();
    closeMessageBox(e.target)
})

async function displayMessageBox(message, messageType) {
    messageDiv = document.createElement("div")
    messageDiv.classList.add("message-box", "wrapper")
    messageDiv.setAttribute('style', "display:none")
    messageDiv.innerHTML = `<span class="closebtn">&times;</span>` + message
    switch (messageType) {
        case "Success":
            messageDiv.classList.add("success")
            break;
        case "Failure":
            messageDiv.classList.add("failure")
            break;
        case "Error":
            messageDiv.classList.add("warning")
            break;
        default:
            messageDiv.classList.add("info")
            break;
    }
    document.querySelector("body").insertAdjacentElement('afterbegin', messageDiv)
    $(messageDiv).fadeIn()
    await timeoutPromiseResolve(3000)
    closeMessageBox(messageDiv.querySelector('.closebtn'))
    await timeoutPromiseResolve(1000)
}

function closeMessageBox(messageCloseBtn) {
    messageDiv = messageCloseBtn.parentElement;
    $(messageDiv).fadeOut(() => messageDiv.remove());
}

function createCell(value) {
    td = document.createElement('td')
    if (value === undefined) value = ""
    td.appendChild(document.createTextNode(value));
    return td
}

function createDataRow(key, value) {
    tr = document.createElement('tr');
    tr.appendChild(createCell(key));
    tr.appendChild(createCell(value));
    return tr
}

function createRemoveElementRow() {
    td = document.createElement('td');
    removeEntryTableElement = document.createElement("button")
    removeEntryTableElement.setAttribute("id", "remove")
    removeEntryTableElement.innerHTML = '<i class="icon fa fa-times fa-lg"></i> நீக்கு'
    td.appendChild(removeEntryTableElement);
    td.setAttribute("colspan", 2)
    return td
}

function createTable(tabledata) {
    table = document.createElement("table");
    for (let [key, value] of Object.entries(tabledata)) {
        if (key === "தேதி") {
            value = value.toString().split("-").reverse().join("/")
        }
        table.appendChild(createDataRow(key, value));
    }
    table.appendChild(createRemoveElementRow());
    return table;
}

function showTable(tabledata, WrapperIdToHide, FormIdToForTable, index) {
    table = createTable(tabledata, index)
    table.setAttribute("index", index)
    tableForm = document.getElementById(FormIdToForTable)
    tableForm.querySelector("input[type='submit']").removeAttribute("style")
    submitBtn = tableForm.querySelector("input[type='submit']")
    submitBtn.parentNode.insertBefore(table, submitBtn)
    $(document.getElementById(WrapperIdToHide)).fadeOut(() => {
        $(tableForm.parentNode).fadeIn(()=>{
            adjustCSSProperty(tableForm.parentNode)
        })
    })
}


function timeoutPromiseResolve(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("Timeout");
        }, interval);
    });
};

pushMyhistory = (content = document.body.innerHTML) => {
    history.pushState({ data: content }, null, null)
}


window.onpopstate = function (event) {
    if (event.state)
        document.body.innerHTML = event.state.data
    setDate()
}

function adjustCSSProperty(element){
    if (element.clientHeight >= window.innerHeight) {
        $(element).css({
            top: "5%",
            position: "absolute",
        })
    }
}
