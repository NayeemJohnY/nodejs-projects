// const square = function(x) { return x * x }

// const square = (x) => {
//     return x * x
// }

const square = (x) => x * x
console.log(square(7));

const party = {
    name: 'It is Birthday party',
    guestLists: ["Nayeem", "John", "Mike"],
    printGuestList1: function() {
        this.guestLists.forEach(function(guest) {
            console.log("Guest " + guest + " is attending party : ", this.name)

        })
        console.log("==============================================");
    },
    printGuestList2() {
        this.guestLists.forEach(function(guest) {
            console.log("Guest " + guest + " is attending party : ", this.name)

        })
        console.log("==============================================");
    },
    printGuestList3: () => {
        console.log("Guest list for party - " + this.name + " is:  " + this.guestLists);
        console.log("==============================================");
    },
    printGuestList4() {
        this.guestLists.forEach((guest) => {
            console.log("Guest " + guest + " is attending party : ", this.name)

        })
        console.log("==============================================");
    }


}
party.printGuestList1()
party.printGuestList2()
party.printGuestList3()
party.printGuestList4()