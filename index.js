const fs = require("fs");
const { join } = require("path");

const DIR_DATA = "data/";

if(!fs.existsSync(DIR_DATA))
    fs.mkdirSync(DIR_DATA);

const joinData = path => join(DIR_DATA, path);

class DBFile {
    path = "";
    json = {};

    constructor(path) {
        this.path = path;
    }
    get dataPath() {
        return joinData(this.path);
    }

    read() {
        if(!validFile(this.path)) throw new Error("The file is not valid!");
        this.json = JSON.parse(fs.readFileSync(this.dataPath, "utf-8"));
    }
    save() {
        fs.writeFileSync(this.dataPath, JSON.stringify(this.json))
    }
};

const existsFile = path => fs.existsSync(joinData(path));
const validFile = path => {
    try {
        JSON.parse(fs.readFileSync(joinData(path)));
        return true;
    } catch(e) {
        return false;
    }
}
const newFile = (path, start = {}, overwrite = false) => {
    if(!overwrite && existsFile(path)) return;
    fs.writeFileSync(joinData(path), JSON.stringify(start));
    return new DBFile(path);
};
const openFile = path => new DBFile(path);

module.exports = {
    DBFile,
    existsFile,
    validFile,
    newFile,
    openFile
};