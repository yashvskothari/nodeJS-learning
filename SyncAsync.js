import fs from "fs";

console.log("1");
// blocking
const result = fs.readFileSync("./workingOfNode.txt", "utf-8");
console.log(result);

console.log("2");


// non blocking : 

console.log("3");
fs.readFile("./modules.txt", "utf-8", (err, result)=>{
  if(err){
    console.log("Error : ", err);
  }
  else{
    console.log(result);
  }
})
console.log("4");