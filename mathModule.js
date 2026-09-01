function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// module.exports = { add, sub }; // multiple exports

// so math.js is a module , where we have a function "add" is defined
// we need to export the add function if want to use it in the other files

// we can also directly export any fucntion :
export function mul(a, b) {
  return a * b;
}

// module.exports = "yash"; // even any random data can be exported
