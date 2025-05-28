// const greet = (name, age) => {
//     console.log("hello ", name);
// }

greet = (name = "user", age) => {
    console.log("hello ", name);
}

greet()

greet("nayeem")


const product = {
    label: "Red Banana",
    price: 20,
    stock: 100,
    quality: 'A+',
    // rating: 4.5

}

// transcation = (type, { label, price, rating = 10 }) => {
//     console.log(type, label, price, rating);
// }

transcation = (type, { label, price, rating = 10 } = {}) => {
    console.log(type, label, price, rating);
}

transcation("order", product)
transcation("order")