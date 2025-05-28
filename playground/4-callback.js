// setTimeout(() => {
//     console.log("2 seconds up");
// }, 2000)

// getLocationCode = (address, callback) => {
//     if (address === "Chennai")
//         callback("10001")
//     else
//         callback("20002")
// }


// getLocationCode = (address, callback) => {
//     setTimeout(() => {
//         if (address === "Chennai")
//             callback("10001")
//         else
//             callback("20002")
//     }, 2000)
// }

// getLocationCode("Chennai", (data) => {
//     console.log(data);
// }) // 2 time call also wait for 2 seconds not 4 seconds

// getLocationCode("Chennai", (data) => {
//     console.log(data);
// })

add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum)
})