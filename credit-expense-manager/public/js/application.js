const loadedJavascriptFiles = []
const idPlaceholderMap = {}
subscriptionForm = document.getElementById("subscriptionForm")
const subscriptionFormInnerHTML = subscriptionForm.innerHTML
subsriptionDetailsForm = document.getElementById("subsriptionDetailsForm")
const subscriptionDetailsFormInnerHTML = subsriptionDetailsForm.innerHTML
creditsExpenseForm = document.getElementById("creditExpenseForm")
const creditsExpenseFormInnerHTML = creditsExpenseForm.innerHTML
creditExpenseDetailsForm = document.getElementById("creditExpenseDetailsForm")
const creditsExpenseDetailsFormInnerHTML = creditExpenseDetailsForm.innerHTML

// Open Navigation Menu
$(document).on("click", "#navigationMenu", function () {
    document.getElementById("sidenav").style.width = "250px";
    observeClickToCloseNav()
});

// Close Navigation Menu
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    $("body").off("click")

}

$(document).on("click", "#menuitems button", function (event) {
    innerHTML = document.body.innerHTML
    var targetValue = event.target.value
    $("#menuitems").fadeOut(()=>{
        loadJavascriptFileBasedonWrapper(targetValue)
        $("div[id='" + targetValue + "']").fadeIn()
        $("#navigationMenu").fadeIn()
    })
    
});

$(document).on("click", "div[id='sidenav'] span:not(span[class='closebtn'])", function () {
    var targetValue = $(this).attr("value")
    $(".wrapper[style='']:not(#menuitems)").fadeOut(()=>{
        loadJavascriptFileBasedonWrapper(targetValue)
        subsriptionDetailsForm.innerHTML = subscriptionDetailsFormInnerHTML
        creditExpenseDetailsForm.innerHTML = creditsExpenseDetailsFormInnerHTML
        $("div[id='" + targetValue + "']").fadeIn()
    })
});

$(document).on("change input", "input[name='startdate'], input[name='startdate']", function () {
    startdateValue = this.value
    formNode = this.parentNode.parentNode.parentNode
    enddate = formNode.querySelector("input[name='enddate']")
    enddate.min = startdateValue
});

$(document).on("change", "input[name='enddate'], input[name='enddate']", function () {
    enddateValue = this.value
    formNode = this.parentNode.parentNode.parentNode
    startdate = formNode.querySelector("input[name='startdate']")
    startdate.max = enddateValue
    startdate.value = enddateValue
    this.min = enddateValue
});


$(document).on("click", "#logout", async function () {
    $(".wrapper[style='']").fadeOut({
        complete: function () {
            $(".lds-roller").show()
        }
    })
    await logoutUser()
})




function observeClickToCloseNav() {
    $("body").on("click", function (event) {
        clickTargetID = event.target.id
        if (clickTargetID !== "navigationMenu" && clickTargetID !== "sidenav" && event.target.parentNode != "sidenav") {
            closeNav()
        }
    });
}

function loadJavascriptFileBasedonWrapper(targetValue) {
    var script
    switch (targetValue) {
        case "subscription":
        case "view_subscription":
            script = "js/subscription.js"
            subscriptionForm.innerHTML = subscriptionFormInnerHTML
            break;
        case "creditExpense":
        case "view_creditExpense":
            script = "js/credits_expense.js"
            creditsExpenseForm.innerHTML = creditsExpenseFormInnerHTML
        default:
            break;
    }
    setDate()
    if (!loadedJavascriptFiles.includes(script)) {
        $.getScript(script);
        loadedJavascriptFiles.push(script)
    }

}

async function logoutUser() {
    authToken = sessionStorage.getItem("authToken")
    if (authToken) {
        response = await fetch("/user/logout", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authToken")
            }
        })
        $(".lds-roller").hide()
        if (response.status === 200) {
            await displayMessageBox("பயனர் வெற்றிகரமாக வெளியேறினார்", "Success")
        } else {
            await displayMessageBox("பயனர் வெளியேற முடியவில்லை. தயவுசெய்து காத்திருக்கவும்", "Failure")
        }
        $(".lds-roller").show()
        sessionStorage.removeItem("authToken");
        location.reload();
    }
}