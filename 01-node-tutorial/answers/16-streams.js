const { createReadStream } = require('fs')

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./content/big.txt', {
    encoding: "utf8",
    highWaterMark: 200
});

let chunkCount = 0;

stream.on("data", (chunk) => {
    chunkCount++;
    console.log(`Received chunk: ${chunk}`);
});

stream.on("end", () => {
    console.log(`Stream ended. Total chunks: ${chunkCount}`);
});

stream.on("error", (error) => {
    console.log("An error occurred:", error);
});