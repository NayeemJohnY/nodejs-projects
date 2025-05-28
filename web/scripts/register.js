registerInnerHTML = document.getElementById("registerForm").innerHTML

$(document).on("submit", "#registerForm", function(event) {
    event.preventDefault()
    registerForm = document.getElementById("registerForm"),
        registerEmailField = registerForm.querySelector(".email"),
        registerEmailInput = registerEmailField.querySelector("input"),
        registerPasswordField = registerForm.querySelector(".password"),
        registerPasswordInput = registerPasswordField.querySelector("input"),
        registerConfirmPasswordField = registerForm.querySelector(".confirm-password"),
        registerConfirmPasswordInput = registerConfirmPasswordField.querySelector("input");

    //if email and password is blank then add shake class in it else call specified function
    (registerEmailInput.value == "") ? registerEmailField.classList.add("shake", "error"): checkEmail(registerEmailInput, registerEmailField);
    (registerPasswordInput.value == "") ? registerPasswordField.classList.add("shake", "error"): checkPass();
    (registerConfirmPasswordInput.value == "") ? registerConfirmPasswordField.classList.add("shake", "error"): checkConfirmPass();

    removeShakeClass(registerEmailField, registerPasswordField, registerConfirmPasswordField);

    registerEmailInput.onkeyup = () => { checkEmail(registerEmailInput, registerEmailField); } //calling checkEmail function on email input keyup
    registerPasswordInput.onkeyup = () => { checkPass(); } //calling checkPassword function on pass input keyup
    registerConfirmPasswordInput.onkeyup = () => { checkConfirmPass(); }

    function checkPass() { //checkPass function
        if (registerPasswordInput.value == "") { //if pass is empty then add error and remove valid class
            registerPasswordField.classList.add("error");
            registerPasswordField.classList.remove("valid");
        } else if (registerPasswordInput.value.length >= 8) {
            registerPasswordField.classList.remove("error");
            registerPasswordField.classList.add("valid");
            if (registerConfirmPasswordInput.value != "") {
                checkConfirmPass();
            }
        } else {
            registerPasswordField.classList.add("error");
            registerPasswordField.classList.remove("valid");
            let errorTxt = registerPasswordField.querySelector(".error-txt");
            errorTxt.innerText = "கடவுச்சொல் குறைந்தது 8 எழுத்துக்கள்/எண்களாக இருக்க வேண்டும்"
        }
    }

    function checkConfirmPass() {
        if (registerConfirmPasswordInput.value == "") {
            registerConfirmPasswordField.classList.add("error");
            registerConfirmPasswordField.classList.remove("valid");
        } else if (registerConfirmPasswordInput.value != "" && registerPasswordInput.value != registerConfirmPasswordInput.value) {
            registerConfirmPasswordField.classList.add("error");
            registerConfirmPasswordField.classList.remove("valid");
            let errorTxt = registerConfirmPasswordField.querySelector(".error-txt");
            errorTxt.innerText = "இரண்டு கடவுச்சொற்களும் ஒரே மாதிரியாக இருக்க வேண்டும்"
        } else {
            registerConfirmPasswordField.classList.remove("error");
            registerConfirmPasswordField.classList.add("valid");
        }

    }
    //if registerEmailField and registerEmailField doesn't contains error class that mean user filled details properly
    // if (!registerEmailField.classList.contains("error") && !registerPasswordField.classList.contains("error") && !registerConfirmPasswordField.classList.contains("error")) {
    //     window.location.href = registerForm.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
    // }
});



$(document).on("click", ".showRegisterForm", function(event) {
    event.preventDefault()
    $(".wrapper").hide()
    registerForm.innerHTML = registerInnerHTML
    $("#register").fadeIn("slow");
})