// const doWork = async() => {
//     // return "John"
//     throw new Error("Error at")
// }

// simply return undefined when nothing returns
// when async added : Promise { undefined } :: aysnc always return Promise with return value
// when async added : Promise { "John" } :: aysnc always return Promise with return value
// console.log(doWork());

// doWork().then((result) => {
//     console.log("Result", result);
// }).catch((err) => {
//     console.log("Error", err);
// })

// wait operator with async

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject("numbers negative");
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async() => {
    const sum1 = await add(1, 2)
    const sum2 = await add(sum1, 5)
    const sum3 = await add(sum2, -1)
    return sum3
}

doWork().then((result) => {
    console.log("Result", result);
}).catch((err) => {
    console.log("Error", err);
})