const names = require("./04-names");
const greet = require("./05-utils");
const altFlavor = require("./06-alternative-flavor");
require("./07-mind-grenade");

greet(names.sarah);
greet(names.mary);
greet(names.peter);

console.log(altFlavor.value1);
console.log(altFlavor.value2);
console.log(altFlavor.value3);

