import fs from "fs"; // fs - file system

// fs is a core module

// sync.... - blocking requst
//fs.writeFileSync("./newCreation.txt", 'hi there');

// async -- non blocking request
fs.writeFile("./newCreation.txt", "hello world async", (err) => {});

const str = fs.readFileSync("./contact.txt", "utf-8");
console.log(str);

// using readFileSync will return the result

// using readFile will not return anything
// this async file reading expects a call back funtion that will either return result or error
fs.readFile("./contact.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error : ", err);
  } else {
    console.log(result);
  }
});

// appending
fs.appendFileSync("./contact.txt", " this is my only contact number ");

fs.cpSync("./contact.txt", "newCopiedFile.txt");
fs.unlinkSync("./newCopiedFile.txt"); // it will delete the file

const status = fs.statSync("./filehandle.txt");
console.log(status);

// fs.mkdirSync("./newDir");
// fs.mkdirSync("./my-docs/a/b", { recursive: true });
