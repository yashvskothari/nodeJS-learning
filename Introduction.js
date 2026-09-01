// const math = require('./math');

// in modern js , dont use require , but use import
// but we must have "type" : "moddule" in package.json

// import {add} from "./math.js";
// import {sub} from "./math.js";
import {mul} from './math.js';
// we can even destructure it --> const {add, sub} = require.('./math') and then we dont need to use math.add or math.sub , instead , we could directly use math or sub

// console.log(math); // it will return an empty object if we didn't exported any functions from the math module
// if exported any function , it will return an object ---> " add : [function:add] "

// console.log(math.add(4,2));
// console.log(math.sub(4,3));
console.log(mul(4,5));
