const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "Line 1\n")  // line 1
    .then(() => {  
        console.log("Finished writing Line 1");
        return writeFile("temp.txt", "Line 2\n", { flag: 'a' });  // line 2
    })
    .then(() => {  
        console.log("Finished writing Line 2");
        return writeFile("temp.txt", "Line 3\n", { flag: 'a' });  // line 3
    })
    .then(() => {  
        console.log("Finished writing Line 3");
        return readFile("temp.txt", "utf8");  // read file content
    })
    .then((data) => {  
        console.log("File read successfully. File contents:\n", data);  // log data to the screen
    })
    .catch((error) => {  
        console.log("An error occurred:", error);  // handle any errors
    });
