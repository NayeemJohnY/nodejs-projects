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
$("#navigationMenu").on("click", function() {
    document.getElementById("sidenav").style.width = "250px";
    observeClickToCloseNav()
});

// Close Navigation Menu
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    $("body").off("click")

}

$("#menuitems button").click(function(event) {
    var targetValue = event.target.value
    $("#menuitems").hide()
    $("div[id='" + targetValue + "']").fadeIn("slow")
    $("#navigationMenu").fadeIn("slow")
    loadJavascriptFileBasedonWrapper(targetValue)

});

$("div[id='sidenav'] span:not(span[class='closebtn'])").click(function() {
    var targetValue = $(this).attr("value")
    $(".wrapper").hide()
    subsriptionDetailsForm.innerHTML = subscriptionDetailsFormInnerHTML
    creditExpenseDetailsForm.innerHTML = creditsExpenseDetailsFormInnerHTML
    $("div[id='" + targetValue + "']").fadeIn("slow")
    loadJavascriptFileBasedonWrapper(targetValue)
});

function observeClickToCloseNav() {
    $("body").on("click", function(event) {
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
            script = "./scripts/subscription.js"
            subscriptionForm.innerHTML = subscriptionFormInnerHTML
            break;
        case "creditExpense":
        case "view_creditExpense":
            script = "./scripts/credits_expense.js"
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

$("input[name='startdate'], input[name='startdate']").on("change input", function() {
    startdateValue = this.value
    formNode = this.parentNode.parentNode.parentNode
    enddate = formNode.querySelector("input[name='enddate']")
    enddate.min = startdateValue
});

$("input[name='enddate'], input[name='enddate']").on("change", function() {
    enddateValue = this.value
    formNode = this.parentNode.parentNode.parentNode
    startdate = formNode.querySelector("input[name='startdate']")
    startdate.max = enddateValue
    startdate.value = enddateValue
    this.min = enddateValue
});

$('#cmd').click(function() {

});