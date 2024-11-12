const EventEmitter = require("events");
const emitter = new EventEmitter();
/*
emitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
    emitter.emit("farewell", name);
});

emitter.on("farewell", (name) => {
    console.log(`Goodbye, ${name}!`);
});

setTimeout(() => {
    emitter.emit("greet", "Kris");
}, 3000);
*/

// Another way 

const waitForEvent = () => { // creates a function in memory
    return new Promise((resolve) => {
        emitter.on("specialEvent", (msg) => resolve(msg));
   });
};

const doWait = async () => { // shortcut for line 21
    const msg = await waitForEvent();
    console.log("Special Event received:", msg);
};

doWait();

setTimeout(() => {
    emitter.emit("specialEvent", "This is a special message!");
}, 5000);

emitter.on("dataReceived", (data) => {
    console.log("Data received:", data);
    emitter.emit("processingComplete", "Processing of data is complete");
});

emitter.on("processingComplete", (status) => {
    console.log(status);
});

setTimeout(() => {
    emitter.emit("dataReceived", { id: 1, message: "Hello, world!" });
}, 2000);
