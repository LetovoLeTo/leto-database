const db = require(".");

const p = "/test.json";
const f = db.newFile(p, {
    "hello": "world"
}, true);
f.read();
f.json.foo = "bar";
f.save();
console.log(db.existsFile(p) && db.validFile(p));