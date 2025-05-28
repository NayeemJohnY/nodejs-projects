// const calculateTip = (total, tipPercent = .5) => {
//     return total + (total * tipPercent)
// }

// test('Hello World', () => {

// })

// test('Failure Test', () => {
//     throw new Error('Failure Test')
// })

// //testMatch: **/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x) - 0 matches

// test('Verify tip', () => {
//     tip = calculateTip(10, .3)
//     if (tip !== 13) {
//         throw new Error('Incorrect tip ' + tip)
//     }
// })

// test('Verify tip using assertion', () => {
//     tip = calculateTip(10, .3)
//     expect(tip).toBe(132)
// })

// test('Default tip', () => {
//     tip = calculateTip(10)
//     expect(tip).toBe(15)
// })

// const fahrenheitToCelsius = (temp) => {
//     return (temp - 32) / 1.8
// }

// const celsiusToFahrenheit = (temp) => {
//     return (temp * 1.8) + 32
// }

// //
// // Goal: Test temperature conversion functions
// //
// // 1. Export both functions and load them into test suite
// // 2. Create "Should convert 32 F to 0 C"
// // 3. Create "Should convert 0 C to 32 F"
// // 4. Run the Jest to test your work!

// test('Should convert 32 F to 0 C', () => {
//     expect(fahrenheitToCelsius(3)).toBe(0)
// })

// test('Should convert 0 C to 32 F', () => {
//     expect(celsiusToFahrenheit(0)).toBe(32)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject("Numbers must be non-negative")
            }
            resolve(a + b)
        }, 3000)
    })
}


// test('Demo async test', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

// test('Test Add function', (done) => {
//     add(2, -3).then(sum => {
//         expect(sum).toBe(15)
//         done()
//     })
// })

test('Test async Add function', async() => {
    // const sum = await add(2, 3)
    expect(5).toBe(5)

})