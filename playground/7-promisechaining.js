const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

add(1, 2).then((sum) => {
    console.log("Sum ", sum);
    add(sum, 7).then((sum2) => {
        console.log("Sum-2 ", sum2);
    }).catch((err) => {
        console.log("Error sum2 ", error);
    })
}).catch(err => {
    console.log("Error ", err);
})

// promise chaining
add(1, 2).then((sum) => {
    console.log("Sum ", sum);
    return add(sum, 7)
}).then((sum2) => {
    console.log("Sum-2", sum2);
}).catch(err => {
    console.log("Error ", err);
})