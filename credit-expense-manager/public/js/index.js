const loginInnerHTML = document.getElementById("loginForm").innerHTML
const forgotPasswordInnerHTML = document.getElementById("forgotPasswordForm").innerHTML
const registerInnerHTML = document.getElementById("registerForm").innerHTML

// Login

$(document).on("submit", "#loginForm", function (event) {
    event.preventDefault();
    loginForm = this,
        eField = loginForm.querySelector(".email"),
        eInput = eField.querySelector("input"),
        pField = loginForm.querySelector(".password"),
        pInput = pField.querySelector("input");

    //if email and password is blank then add shake class in it else call specified function
    (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail(eInput, eField);
    (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

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
        loginUser({
            email: eInput.value,
            password: pInput.value
        })
    }
});

$(document).on("click", "#togglePassword", function (event) {
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

// Forgot Password
$(document).on("click", "#forgotPasswordLink", function (event) {
    event.preventDefault()
    $("#login").fadeOut(() => {
        document.getElementById("forgotPasswordForm").innerHTML = forgotPasswordInnerHTML
        $("#forgotPassword").fadeIn(() => pushMyhistory())
    })
});


$(document).on("click", ".showRegisterForm", function (event) {
    event.preventDefault()
    $("#login").fadeOut(() => {
        registerForm.innerHTML = registerInnerHTML
        $("#register").fadeIn(() => pushMyhistory())
    })
})

$(document).on("submit", "#forgotPasswordForm", function (event) {
    event.preventDefault()
    forgotPasswordForm = document.getElementById("forgotPasswordForm"),
        eField = forgotPasswordForm.querySelector(".email"),
        eInput = eField.querySelector("input");
    (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail(eInput, eField);
    removeShakeClass(eField);
    eInput.onkeyup = () => { checkEmail(eInput, eField); }
});

// Register
$(document).on("submit", "#registerForm", function (event) {
    event.preventDefault()
    registerForm = this,
        registerUserField = registerForm.querySelector(".name"),
        registerUserInput = registerUserField.querySelector("input"),
        registerEmailField = registerForm.querySelector(".email"),
        registerEmailInput = registerEmailField.querySelector("input"),
        registerPasswordField = registerForm.querySelector(".password"),
        registerPasswordInput = registerPasswordField.querySelector("input"),
        registerConfirmPasswordField = registerForm.querySelector(".confirm-password"),
        registerConfirmPasswordInput = registerConfirmPasswordField.querySelector("input");

    (registerUserInput.value == "") ? registerUserField.classList.add("shake", "error") : checkInputs(registerUserInput, registerUserField);
    (registerEmailInput.value == "") ? registerEmailField.classList.add("shake", "error") : checkEmail(registerEmailInput, registerEmailField);
    (registerPasswordInput.value == "") ? registerPasswordField.classList.add("shake", "error") : checkPass();
    (registerConfirmPasswordInput.value == "") ? registerConfirmPasswordField.classList.add("shake", "error") : checkConfirmPass();

    removeShakeClass(registerUserField, registerEmailField, registerPasswordField, registerConfirmPasswordField);

    registerUserInput.onkeyup = () => { checkInputs(registerUserInput, registerUserField); }
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
    fields = [registerUserField, registerEmailField, registerPasswordField, registerConfirmPasswordField]
    var isAnyInValidField = fields.find(field => field.classList.contains("error"))
    if (!isAnyInValidField) {
        createUser({
            name: registerUserInput.value,
            email: registerEmailInput.value,
            password: registerPasswordInput.value
        })
    }
});


function checkEmail(eInput, eField) { //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-zA-Z]{2,3}$/; //pattern for validate email
    if (!eInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
        eField.classList.add("error");
        eField.classList.remove("valid");
        let errorTxt = eField.querySelector(".error-txt");
        //if email value is not empty then show please enter valid email else show Email can't be blank
        (eInput.value != "") ? errorTxt.innerText = "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்" : errorTxt.innerText = "மின்னஞ்சல் தேவை";
    } else { //if pattern matched then remove error and add valid class
        eField.classList.remove("error");
        eField.classList.add("valid");
    }
}

// Backend API Functions
async function createUser(data) {
    $(".wrapper[style='']").hide()
    $(".lds-roller").show()
    response = await fetch("/user", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    var jsonResponse = await response.json()
    $(".lds-roller").hide()
    if (response.status === 201) {
        await displayMessageBox("பயனர் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது", "Success")
        await displayMessageBox("தயவுசெய்து காத்திருக்கவும் <b>" + jsonResponse.name + "</b>. நீங்கள் முக்கிய பயன்பாட்டிற்கு அனுப்பப்படுவீர்கள்", "Success")
        sessionStorage.setItem("authToken", response.headers.get('x-access-token'))
        await fetchApplication(response.headers.get('x-access-token'))
    } else {
        if (response.status === 409) {
            await displayMessageBox("இந்த மின்னஞ்சல் ஏற்கனவே பயன்பாட்டில் உள்ளது . <br/>வேறு மின்னஞ்சலைப் பயன்படுத்தவும்", "Failure")
        } else {
            await displayMessageBox("மன்னிக்கவும், பதிவு செய்ய முடியவில்லை, சிறிது நேரம் கழித்து முயற்சிக்கவும்.<br/>மேலும் தகவலுக்கு: " + jsonResponse.reasons, "Error")
        }
        $("#register").fadeIn()
    }
}

function showLoader() { }


async function loginUser(data) {
    $(".wrapper[style='']").hide()
    $(".lds-roller").show()
    response = await fetch("/user/login", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    var jsonResponse = await response.json()
    $(".lds-roller").hide()
    if (response.status === 200) {
        await displayMessageBox("தயவுசெய்து காத்திருக்கவும் <b>" + jsonResponse.name + "</b>. நீங்கள் முக்கிய பயன்பாட்டிற்கு அனுப்பப்படுவீர்கள்", "Success")
        sessionStorage.setItem("authToken", response.headers.get('x-access-token'))
        await fetchApplication(response.headers.get('x-access-token'))
    } else {
        if (jsonResponse.reasons === "User unable to login") {
            await displayMessageBox("மன்னிக்கவும், உள்நுழைய முடியவில்லை, சரியான உள்ளீட்டுடன் முயற்சிக்கவும்", "Failure")
        } else {
            await displayMessageBox("மன்னிக்கவும், உள்நுழைய முடியவில்லை. சிறிது நேரம் கழித்து முயற்சிக்கவும்.<br/>மேலும் தகவலுக்கு: " + jsonResponse.reasons, "Error")
        }
        $("#login").fadeIn()
    }
}

async function fetchApplication(authToken) {
    response = await fetch('/application', {
        headers: {
            Authorization: 'Bearer ' + authToken
        }
    })
    if (response.status === 200) {
        responseText = await response.text()
        var newHTML = document.open("text/html", "replace");
        newHTML.write(responseText);
        newHTML.close();
        $(".lds-roller").hide()
        $("#menuitems").fadeIn()
        pushMyhistory(document.body.innerHTML)
    } else {
        sessionStorage.removeItem("authToken");
        location.reload();
    }

}


window.onload = function () {
    loadContent()
}

loadContent = function () {
    $(".lds-roller").fadeOut(async () => {
        authToken = sessionStorage.getItem("authToken")
        if (authToken) {
            await fetchApplication(authToken)
        } else {
            $("#login").fadeIn(() => {
                history.replaceState({ data: document.body.innerHTML }, null, null)
            })
        }
    })
}
