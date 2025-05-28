// Object property shorthand

const name = "John"
const userAge = 27

// const user = {
//     name: name,
//     age: userAge,
//     place: "Chennai"
// }

// const user = {
//     name,
//     age,
//     place: "Chennai"
// }
// console.log(user)

// object destructuring
const product = {
    label: "Red Banana",
    price: 20,
    stock: 100,
    quality: 'A+',
    // rating: 4.5

}

console.log(product);
// console.log(product.label, product.price, product.rating, );
// const { label, price, rating } = product;
// console.log(label, price, rating);
// const { label, price, rating = 5 } = product;
// console.log(label, price, rating);
// const { label: productLabel, price, rating = 5 } = product;
// console.log(productLabel, price, rating);


transcation = (type, { label, price, rating = 10 }) => {
    console.log(type, label, price, rating);
}

transcation("order", product)