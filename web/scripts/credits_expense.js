arrayOfMapOfData = []
$(document).on("submit", "#creditExpenseForm", function(event) {
    event.preventDefault()
    creditsExpenseForm = document.getElementById("creditExpenseForm"),
        creditExpenseNameField = creditsExpenseForm.querySelector(".credit-expense-name"),
        creditExpenseNameInput = creditExpenseNameField.querySelector("#credit-expense-name"),
        categoryField = creditsExpenseForm.querySelector(".categories"),
        categoryInput = creditsExpenseForm.querySelector("input[id='category']"),
        creditExpenseTypeField = creditsExpenseForm.querySelector(".radio"),
        creditRadio = creditExpenseTypeField.querySelector("input[id='credit']"),
        expenseRadio = creditExpenseTypeField.querySelector("input[id='expense']"),
        creditExpenseAmountField = creditsExpenseForm.querySelector(".creditExpenseAmount"),
        creditExpenseAmountInput = creditExpenseAmountField.querySelector("#creditExpenseAmount");
    (creditExpenseNameInput.value == "") ? creditExpenseNameField.classList.add("shake", "error"): {};
    (creditExpenseAmountInput.value == "") ? creditExpenseAmountField.classList.add("shake", "error"): {};
    (categoryInput.value == "") ? categoryField.classList.add("shake", "error"): {}

    if (!creditRadio.checked && !expenseRadio.checked) {
        creditExpenseTypeField.classList.add("shake", "error");
    }
    removeShakeClass(creditExpenseNameField, creditExpenseAmountField, creditExpenseTypeField, categoryField);

    creditExpenseNameInput.onkeyup = () => { checkInputs(creditExpenseNameInput, creditExpenseNameField); }
    creditExpenseAmountInput.onkeyup = () => { checkInputs(creditExpenseAmountInput, creditExpenseAmountField); }
    categoryInput.onkeyup = () => { checkInputs(categoryInput, categoryField); }
    creditRadio.onclick = () => { checkInputs(creditRadio, creditExpenseTypeField); }
    expenseRadio.onclick = () => { checkInputs(expenseRadio, creditExpenseTypeField); }

    if (!categoryField.classList.contains("error") && !creditExpenseNameField.classList.contains("error") && !creditExpenseAmountField.classList.contains("error") && !creditExpenseTypeField.classList.contains("error")) {
        creditExpenseNameField.classList.add("valid");
        fieldElements = creditsExpenseForm.querySelectorAll('.field')
        creditExpenseMap = {}
        for (let index = 0; index < fieldElements.length; index++) {
            if (fieldElements[index].querySelector("input").getAttribute("type") != "radio") {
                placeholder = fieldElements[index].querySelector("input").getAttribute("placeholder")
                value = fieldElements[index].querySelector("input").value
                idAttribute = fieldElements[index].querySelector("input").getAttribute("id")
            } else {
                placeholder = fieldElements[index].querySelector('label[id = "type"]').textContent.replace(":", "")
                value = fieldElements[index].querySelector("input[name='ce-type']:checked").value
                idAttribute = fieldElements[index].querySelector("input[name='ce-type']:checked").getAttribute("id")
            }
            creditExpenseMap[placeholder] = value
            idPlaceholderMap[placeholder] = idAttribute
        }
        arrayOfMapOfData.push(creditExpenseMap)
        createEntryTable(creditExpenseMap, "creditExpense", "creditExpenseDetailsForm")
    }
});

// To Show Credit Expense Form
$(document).on("click", "#moreCreditExpenseForm", function(event) {
    event.preventDefault()
    creditExpenseDetails = document.getElementById("creditExpenseDetails");
    $(creditExpenseDetails).hide();
    creditsExpenseForm.innerHTML = creditsExpenseFormInnerHTML
    setDate()
    $("#creditExpense").fadeIn("slow")
    if (creditExpenseDetails.querySelectorAll("table").length != 0) {
        $("#viewCreditExpense").show()
    } else {
        $("#viewCreditExpense").hide()
    }
});

// To Show Credit Expense Details
$(document).on("click", "#showCreditExpense", function(event) {
    event.preventDefault()
    $("#creditExpense").hide()
    creditExpenseDetails = document.getElementById("creditExpenseDetails");
    $(creditExpenseDetails).fadeIn("slow")
});

// creditExpenseDetailsForm.onsubmit = (e) => {
//     var tables = document.getElementsByTagName("table");
//     creditExpenseJsonArray = []
//     for (index = 0; index < tables.length; index++) {
//         creditExpenseJson = {}
//         tables[index].querySelectorAll("td").forEach(td => {
//             if (td.hasAttribute("id")) {
//                 creditExpenseJson[td.getAttribute("id")] = td.textContent
//             }
//         });
//         creditExpenseJsonArray.push(creditExpenseJson)
//     }
//     console.log(creditExpenseJsonArray)
// }