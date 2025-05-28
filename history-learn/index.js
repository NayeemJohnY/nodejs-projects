
console.log("index.js")
console.log("1", window.history)
let count = 0
myHistory = []
innerhtml1 = document.body.innerHTML
history.replaceState({data : innerhtml1},null,null)
$(document).on("click", "button", function () {
    console.log("2", window.history)
    this.innerText = "Good to see you :" + count++
    innerhtml2 = document.body.innerHTML
    pushHistory(innerhtml2)
    console.log("3", window.history)

})

function pushHistory(html){
    if(myHistory.length === 0){
        history.pushState({data : html},null,null)
        myHistory.push(html)
    } else {
        history.replaceState({data : html},null,null)
    }
}

window.onpopstate = function (event) {
    console.log(event.state)
    document.body.innerHTML = history.state.data
}