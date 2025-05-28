// async function hello() {
//     let valid = false;
//     return new Promise ((resolve, reject) => {
//         setTimeout(() => {
//             valid = true;
//             console.log(valid)
//             resolve()
//         }, 3000)
//     })
// };
// async function dowork() {
//     let value = await hello();
//     console.log(value, "value")
// }

// function removeShakeClass(...fields) {
//     fields.forEach(async(field) => {
//         await hello(500)
//         field.classList.remove("shake");
//     })
// }

  


// removeShakeClass(["ssss", "sss"])

console.log("start")

function dummmy (callback){
    console.log("indummy")
    callback()
}

function timeoutPromiseResolve(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("Timeout");
        }, interval);
    });
};

async function displaym(){
    console.log("in display start")
    dummmy(async ()=> {
       console.log("ss")
    })
    console.log("inside dummy callback before timeout")
    await timeoutPromiseResolve(10000)
    console.log("inside dummy callback after timeout")
    console.log("in display end")
}

async function secondcall(){
    await displaym()
    console.log("end")
}

secondcall()

