const { setActiveWorkSpace, getActiveWorkSpace } = require("./activeWorkSpace");

setActiveWorkSpace(2);

console.log("Active WorkSpace:", getActiveWorkSpace());
