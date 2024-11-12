const { writeFile, readFile } = require("fs").promises;
const writer = async () => {
    try {
        await writeFile("temp.txt", "Line 1\n");
        await writeFile("temp.txt", "Line 2\n", { flag: 'a' });
        await writeFile("temp.txt", "Line 3\n", { flag: 'a' });
        console.log("Writing completed");
    } catch (error) {
        console.log("An error occurred during writing:", error);
    }
};

const reader = async () => {
    try {
        const data = await readFile("temp.txt", "utf8");
        console.log("File contents:\n", data);
    } catch (error) {
        console.log("An error occurred during reading:", error);
    }
};

const readWrite = async () => {
    await writer();
    await reader();
};

readWrite();