console.log("Start");

// Sync - one by one

/* Async
main()
console.log("Start");
--------------------
main()
setTimeout(....2000) - not a js, node js implementation - register event nodeAPIs - callback to run a function; event to wait
--------------------

NodeAPI
=================
setTimeout(2 sec)
setTimeout(0 sec)
------------------ 
Callback Queue - Maintain list of  callback function to execute
0 sec function
----------------
Event loop  => Looks call stack  & calback Queue
Run once call stack is empty
All sync funtions after main function
*/
// main -> start  -> stop -> [0 sec -> 2 sec] <=NodeAPI Callback Queue EventLoop Callstack]
// non-blocking; single theaded; Async; event-driven
setTimeout(() => {
    console.log("2 seconds timer");
}, 2000)

// This will be after end execution
setTimeout(() => {
    console.log("0 Seconds timer");
}, 0)

console.log("End");

/*
 2 Questions
 1. Why 2 seconds timer not stopped program & end is printed
 2. Why 0 timer is printed next to end, even it has 0 seconds timer
*/

/*
Sync - Call stack main->log  remove => log-> main
*/

// const listLocations = (locations) => {
//     locations.forEach(location => {
//         console.log("location : ", location);
//     });
// }
// listLocations(["Chennai", "Bangalore"])

/*
Sync : Call Stack
main()
listLocations() - After 2 anonyms & console.log it will be removed from the stack
forEach()
anonyms()
console.log()
*/