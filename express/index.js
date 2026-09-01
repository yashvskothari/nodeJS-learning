const express = require("express");
const app = express(); // app initialized - this is a handler function
const PORT = 8000;

app.get("/", (req, res) => {
  return res.send("Hello from home");
}); // this particular handler function is for get method of a particular route (home page i.e "/")

app.get("/about", (req, res) => {
  return res.send(
    "This is about page" +
      " hey " +
      req.query.name +
      " , your assigned user name is : " +
      req.query.username,
  ); // we can use query parameter directly
});

app.get("/contact", (req, res) => {
  return res.send("This is the contact page");
});

// const myServer = http.createServer(app);

// app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// basic routing : 
// app.METHOD(PATH, HANDLER)