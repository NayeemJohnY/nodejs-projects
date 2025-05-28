arrayOfDataObject = []
arrayOfPayload = []
let index = 0
subscribers = ["என்ன வேணும்", "நயீம் ஜான்", "கிரேட் எபிபோர்ட்", "வினோத்"]
$(document).on('focus', "input[name='subscriber']", function () {
    $("input[name='subscriber']:visible").autocomplete({
        source: subscribers,
        minLength: 0
    })
    $("input[name='subscriber']:visible").autocomplete("search");
});
locations = {
    Dharmapuri: "தருமபுரி",
    Karimangalam: "காரிமங்கலம்",
    Harur: "அரூர்",
    Nallampalli: "நல்லம்பள்ளி",
    Palacode: "பாலக்கோடு",
    Pappireddipatti: "பாப்பிரெட்டிபட்டி",
    Pennagaram: "பென்னாகரம்"
}
$(document).on('focus', "#place", function () {
    $("#place:visible").autocomplete({
        source: Object.values(locations),
        minLength: 0
    })
    $("#place:visible").autocomplete("search");
});




$(document).on("submit", "#subscriptionForm", function (event) {
    event.preventDefault()
    subscriptionForm = document.getElementById("subscriptionForm"),
        subscriberField = subscriptionForm.querySelector(".subscriber"),
        subscriberInput = subscriberField.querySelector("#subscriber"),
        place = subscriptionForm.querySelector("#place"),
        phone = subscriptionForm.querySelector("#phone"),
        subscriptionAmountField = subscriptionForm.querySelector(".subscriptionAmount"),
        subscriptionAmountInput = subscriptionAmountField.querySelector("#subscriptionAmount");

    (subscriberInput.value == "") ? subscriberField.classList.add("shake", "error") : {};
    (subscriptionAmountInput.value == "") ? subscriptionAmountField.classList.add("shake", "error") : {}
    regex = /^[6-9]\d{9}$/
    phoneField = subscriptionForm.querySelector(".phone");
    (phone.value != "" && !regex.test(phone.value)) ? phoneField.classList.add("shake", "error") : {}

    removeShakeClass(subscriberField, subscriptionAmountField, phoneField);

    subscriberInput.onkeyup = () => { checkInputs(subscriberInput, subscriberField); }
    subscriptionAmountField.onkeyup = () => { checkInputs(subscriptionAmountInput, subscriptionAmountField); }

    $(subscriberInput).on("autocompleteselect", function (event, ui) {
        $(subscriberInput).val(ui.item.value);
        checkInputs(subscriberInput, subscriberField)
    });

    $(place).on("autocompleteselect", function (event, ui) {
        $(place).val(ui.item.value);
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
        dateField = document.querySelector("#subscriptiondate")
        subscriptionDataUI = {
            [dateField.placeholder]: dateField.value,
            [subscriberInput.placeholder]: subscriberInput.value,
            [place.placeholder]: place.value,
            [phone.placeholder]: phone.value,
            [subscriptionAmountInput.placeholder]: subscriptionAmountInput.value
        }
        arrayOfPayload.push({
            date: dateField.value,
            name: subscriberInput.value,
            place: place.value,
            phone: phone.value,
            amount: subscriptionAmountInput.value
        })
        arrayOfDataObject.push(subscriptionDataUI)
        showTable(subscriptionDataUI, "subscription", "subsriptionDetailsForm", index++)
    }
});

// To Show Subscription Form
$(document).on("click", "#moreSubscription", function (event) {
    event.preventDefault()
    subscriptionDetails = document.getElementById("subscriptionDetails");
    $(subscriptionDetails).fadeOut(() => {
        subscriptionForm.innerHTML = subscriptionFormInnerHTML
        setDate()
        $("#subscription").fadeIn(() => {
            if (subscriptionDetails.querySelectorAll("table").length != 0) {
                $("#viewSubscription").fadeIn()
            } else {
                $("#viewSubscription").fadeOut()
            }
        })
    });

});

// To Show Subscription Details
$(document).on("click", "#showSubscription", function (event) {
    event.preventDefault()
    $("#subscription").fadeOut()
    $("#subscriptionDetails").fadeIn()

});


$(document).on("submit", "#viewSubscriptionDetailsForm", async function (event) {
    event.preventDefault()
    params = {
        startdate: this.querySelector("#substartdate").value,
        enddate: this.querySelector("#subenddate").value
    }
    subscriberName = this.querySelector("input[name='subscriber']").value
    if (subscriberName !== '') params.name = subscriberName
    url = '/subscription?' + (new URLSearchParams(params)).toString();
    $(".wrapper[style='']").hide()
    $(".lds-roller").show()
    await getSubscriptionDetails(url, this)
});

async function getSubscriptionDetails(url, element){
    response = await fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ' + authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    $(".lds-roller").hide()
    if (response.status === 200) {
        var jsonResponse = await response.json()
        parentWrapper = element.parentNode
        parentWrapper.replaceChild(showsubscriptionTable(jsonResponse), element)
        $(parentWrapper).show()
        // document.querySelector().insertAdjacentElement('afterbegin', )
        adjustCSSProperty(parentWrapper)
    } else {
        await displayMessageBox("குறிப்பிட்ட விவரத்தில்  சந்தாக்கள் பதிவாகவில்லை, வேறு  தேதிகளை / சந்தாதாரரை முயற்சிக்கவும் ", "Info")
        $("#view_subscription").fadeIn()
    }
}

$(document).on("click", ".showAllSubscriptions", async function(event) {
    console.log(event.target)
    event.preventDefault()
    $(".wrapper[style='']").hide()
    $(".lds-roller").show()
    await getSubscriptionDetails("/subscription", this)
})


$(document).on("submit", "#subsriptionDetailsForm", async function (event) {
    event.preventDefault()
    $(".wrapper[style='']").hide()
    $(".lds-roller").show()
    response = await fetch("/subscription", {
        method: "POST",
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ' + authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arrayOfPayload)
    })
    $(".lds-roller").hide()
    if (response.status === 201) {
        await displayMessageBox("சந்தா வெற்றிகரமாக சேர்க்கப்பட்டது", "Success")
    } else {
        await displayMessageBox("சந்தாவைச் சேர்க்க முடியவில்லை. சிறிது நேரம் கழித்து முயற்சிக்கவும்", "Failure")
    }
    $("#menuitems").fadeIn()
});


function showsubscriptionTable(jsonArray) {
    div = document.createElement("div")
    jsonArray.forEach(subscription => {
        table = document.createElement("table")
        Object.entries(subscription).forEach(([key, value]) => {
            tr = document.createElement("tr")
            td = document.createElement("td")
            td.appendChild(document.createTextNode(key))
            tr.appendChild(td)
            if (key === "date") value = moment(value).format("DD/MM/YYYY")
            td = document.createElement("td")
            td.appendChild(document.createTextNode(value))
            tr.appendChild(td)
            table.appendChild(tr)
        })
        div.insertAdjacentElement('afterbegin', table)

    })
    console.log(div)
    return div
}