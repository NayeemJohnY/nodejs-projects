arrayOfMapOfData = []
subscribers = ["என்ன வேணும்", "நயீம் ஜான்", "கிரேட் எபிபோர்ட்", "வினோத்"]
$(document).on('focus', "#subscriber", function() {
    $("#subscriber").autocomplete({
        source: subscribers,
        minLength: 0
    })
    $("#subscriber").autocomplete("search");
});


$(document).on("submit", "#subscriptionForm", function(event) {
    event.preventDefault()
    subscriptionForm = document.getElementById("subscriptionForm"),
        subscriberField = subscriptionForm.querySelector(".subscriber"),
        subscriberInput = subscriberField.querySelector("#subscriber"),
        place = subscriptionForm.querySelector("#place"),
        phone = subscriptionForm.querySelector("#phone"),
        subscriptionAmountField = subscriptionForm.querySelector(".subscriptionAmount"),
        subscriptionAmountInput = subscriptionAmountField.querySelector("#subscriptionAmount");

    (subscriberInput.value == "") ? subscriberField.classList.add("shake", "error"): {};
    (subscriptionAmountInput.value == "") ? subscriptionAmountField.classList.add("shake", "error"): {}
    regex = /^[6-9]\d{9}$/
    phoneField = subscriptionForm.querySelector(".phone");
    (phone.value != "" && !regex.test(phone.value)) ? phoneField.classList.add("shake", "error"): {}

    removeShakeClass(subscriberField, subscriptionAmountField, phoneField);

    subscriberInput.onkeyup = () => { checkInputs(subscriberInput, subscriberField); }
    subscriptionAmountField.onkeyup = () => { checkInputs(subscriptionAmountInput, subscriptionAmountField); }

    $(subscriberInput).on("autocompleteselect", function(event, ui) {
        $(subscriberInput).val(ui.item.value);
        checkInputs(subscriberInput, subscriberField)
    });

    phone.onkeyup = () => {
        if (phone.value != "" && !regex.test(phone.value)) {
            phoneField.classList.add("error");
            phoneField.classList.remove("valid");
        } else {
            phoneField.classList.remove("error");
            phoneField.classList.add("valid");
        }
    }



    if (!subscriberField.classList.contains("error") && !subscriptionAmountField.classList.contains("error") && !phoneField.classList.contains("error")) {
        subscriberField.classList.add("valid");
        fieldElements = subscriptionForm.querySelectorAll('.field')
        subsciptionMap = {}
        for (let index = 0; index < fieldElements.length; index++) {
            placeholder = fieldElements[index].querySelector("input").getAttribute("placeholder")
            idAttribute = fieldElements[index].querySelector("input").getAttribute("id")
            value = fieldElements[index].querySelector("input").value
            subsciptionMap[placeholder] = value
            idPlaceholderMap[placeholder] = idAttribute
        }
        arrayOfMapOfData.push(subsciptionMap)
        createEntryTable(subsciptionMap, "subscription", "subsriptionDetailsForm")
    }
});

// To Show Subscription Form
$(document).on("click", "#moreSubscription", function(event) {
    event.preventDefault()
    subscriptionDetails = document.getElementById("subscriptionDetails");
    $(subscriptionDetails).hide();
    subscriptionForm.innerHTML = subscriptionFormInnerHTML
    setDate()
    $("#subscription").fadeIn("slow")
    if (subscriptionDetails.querySelectorAll("table").length != 0) {
        $("#viewSubscription").show()
    } else {
        $("#viewSubscription").hide()
    }
});

// To Show Subscription Details
$(document).on("click", "#showSubscription", function(event) {
    event.preventDefault()
    $("#subscription").hide()
    subscriptionDetails = document.getElementById("subscriptionDetails");
    $(subscriptionDetails).fadeIn("slow")
});

// subsriptionDetailsForm.onsubmit = (e) => {
//     var tables = document.getElementsByTagName("table");
//     subscriptionJsonArray = []
//     for (index = 0; index < tables.length; index++) {
//         subscriptionJson = {}
//         tables[index].querySelectorAll("td").forEach(td => {
//             if (td.hasAttribute("id")) {
//                 subscriptionJson[td.getAttribute("id")] = td.textContent
//             }
//         });
//         subscriptionJsonArray.push(subscriptionJson)
//     }
//     console.log(subscriptionJsonArray)
// }


$(document).on("submit", "#viewSubscriptionDetailsForm", function(event) {
    event.preventDefault()
    console.log(arrayOfMapOfData)
});