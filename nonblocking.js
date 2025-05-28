function getUser(id) {
    if (id == 1) {
        console.log({ "id": 1, "name": "nayeem" })
    } else {
        console.log({ "id": 2, "name": "John" })
    }
}
console.log("Start: ", new Date().getMilliseconds());
getUser(getUser(1), )
getUser(2)
console.log(5 + 9)
console.log("End: ", new Date().getMilliseconds());