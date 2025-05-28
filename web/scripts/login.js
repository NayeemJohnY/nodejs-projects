const loginInnerHTML = document.getElementById("loginForm").innerHTML
const forgotPasswordInnerHTML = document.getElementById("forgotPasswordForm").innerHTML

$(document).on("submit", "#loginForm", function(event) {
    event.preventDefault();
    loginForm = document.getElementById("loginForm"),
        eField = loginForm.querySelector(".email"),
        eInput = eField.querySelector("input"),
        pField = loginForm.querySelector(".password"),
        pInput = pField.querySelector("input");

    //if email and password is blank then add shake class in it else call specified function
    (eInput.value == "") ? eField.classList.add("shake", "error"): checkEmail(eInput, eField);
    (pInput.value == "") ? pField.classList.add("shake", "error"): checkPass();

    removeShakeClass(eField, pField);

    eInput.onkeyup = () => { checkEmail(eInput, eField); } //calling checkEmail function on email input keyup
    pInput.onkeyup = () => { checkPass(); } //calling checkPassword function on pass input keyup

    function checkPass() { //checkPass function
        if (pInput.value == "") { //if pass is empty then add error and remove valid class
            pField.classList.add("error");
            pField.classList.remove("valid");
        } else { //if pass is empty then remove error and add valid class
            pField.classList.remove("error");
            pField.classList.add("valid");
        }
    }

    //if eField and pField doesn't contains error class that mean user filled details properly
    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
        displayMessageBox("Good", "Failure")
            // if (eInput.value == "njnayeem@gmail.com" && pInput == "12345") {
            //     createMessageBox("Good", "Success")
            // } else {

        // }
    }
});



$(document).on("click", "#togglePassword", function(event) {
    // toggle the type attribute
    password = this.parentNode.querySelector("input")
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    if (this.classList.contains('fa-eye-slash')) {
        this.classList.add('fa-eye');
        this.classList.remove('fa-eye-slash');
    } else {
        this.classList.add('fa-eye-slash');
        this.classList.remove('fa-eye');
    }

});

function checkEmail(eInput, eField) { //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!eInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
        eField.classList.add("error");
        eField.classList.remove("valid");
        let errorTxt = eField.querySelector(".error-txt");
        //if email value is not empty then show please enter valid email else show Email can't be blank
        (eInput.value != "") ? errorTxt.innerText = "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்": errorTxt.innerText = "மின்னஞ்சல் தேவை";
    } else { //if pattern matched then remove error and add valid class
        eField.classList.remove("error");
        eField.classList.add("valid");
    }
}

$(document).on("click", ".showLoginForm", function(event) {
    event.preventDefault()
    $(".wrapper").hide()
    loginForm.innerHTML = loginInnerHTML
    $("#login").fadeIn("slow")
});


$(document).on("click", "#forgotPasswordLink", function(event) {
    event.preventDefault()
    $("#login").hide()
    document.getElementById("forgotPasswordForm").innerHTML = forgotPasswordInnerHTML
    $("#forgotPassword").fadeIn("slow")
});

// To Reset Password
$(document).on("submit", "#forgotPasswordForm", function(event) {
    event.preventDefault()
    forgotPasswordForm = document.getElementById("forgotPasswordForm"),
        eField = forgotPasswordForm.querySelector(".email"),
        eInput = eField.querySelector("input");
    (eInput.value == "") ? eField.classList.add("shake", "error"): checkEmail(eInput, eField);
    removeShakeClass(eField);
    eInput.onkeyup = () => { checkEmail(eInput, eField); }
});