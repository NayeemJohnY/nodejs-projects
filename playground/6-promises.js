// 1)
// const docallback = () => {
//     console.log("Hello Normal Function call");
// }

// docallback()

// 2)
// const docallback = (param1, param2) => {
//     console.log("Param1", param1);
//     console.log("Param2", param2);
// }


// docallback({ name: "nayeem", age: 25 })
// docallback(undefined, "Nothing")
// docallback("Nothing")
// docallback()


// 3)
// const docallback = (param1 = "Without", param2 = "Params in Me", callback) => {
//     callback(param1 + "hhhh", param2 + "ssss")
// }

// function fun1(param1, param2) {
//     console.log("Params in F1 :", param1, param2);
// }

// fun2 = (param1, param2) => {
//     console.log("Params in F2:", param1, param2);
// }

// docallback(1, 2, fun1)
// docallback("hello", "John", fun2)

// docallback("Hello", "John", (param1, param2) => {
//     console.log("Callback  pattern ", param1, param2);
// })

// // without argumnents
// docallback(undefined, undefined, (param1, param2) => {
//     console.log("Callback  pattern ", param1, param2);
// })

// const docallback = (callback) => {
//     setTimeout(() => {
//         callback("This is error", undefined)
//         callback(undefined, [1, 2, 3])
//         console.log("dddd");
//     }, 2000)
// }

// docallback((error, result) => {
//     if (error) {
//         return console.log("Error : ", error);
//     }
//     console.log(result);
// })



// promises
// Ps $ node 6-promises.js
// Result { type: 'Resolved' }
// PS $ node 6-promises.js
// Error Rejected
const doWorkPormise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({ type: "Resolved" })
        reject("Rejected")
    }, 2000)
})

doWorkPormise.then((result) => {
    console.log("Result", result);
}).catch((error) => {
    console.log("Error", error);
})