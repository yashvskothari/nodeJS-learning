import fs from "fs";
console.log("hello");

setTimeout(() => {
  fs.readFile("./modules.txt", "utf-8", (err, result) => {
    if(err){
      console.log("Error : " , err);
    }
    else{
      console.log(result);
    }
  });
},2000);

console.log("Bye");
