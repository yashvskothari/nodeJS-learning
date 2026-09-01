// http module will be used(a build in module)
// building http server in nodeJs
const url = require("url");
const http = require("http");
const fs = require("fs");

// we will create a log of the request , whenever we get any request

// now we must have a handler function , that processes the incoming requests

// the createServer() function takes a REQUEST LISTENER call back function that can be used as the handler function
// this callback function take two arguments - req and res - request and response

function myHandler(req, res) {
  if (req.url === "/favicon.ico") return res.end();
  // console.log(req.headers); // headers are the extra info of the req

  const log = `${Date.now()}: ${req.method} ${req.url} New request recieved\n`; // date.now will show the time request was made , url will show the path of the request
  const myUrl = url.parse(req.url, true);
  // true is passed for passing the query parameter(qp) strings --> it will create a "query" object having all the QPs passed in the url
  console.log(myUrl);
  fs.appendFile("./log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        // "/" means home page
        if (req.method === "GET") {
          res.end("HomePage");
        }
        break;
      case "/about":
        const username = myUrl.query.myname;
        if (req.method === "GET") res.end(`hi my name is ${username}`);
        break;
      case "/contact":
        const mob = myUrl.query.mobNo;
        if (req.method === "GET") res.end(`You can contact me on ${mob}`);
        break;
      case "/signup":
        if (req.method === "GET") res.end("This is a signup page");
        else if (req.method === "POST") {
          // dB query to check signup credentials
          res.end("Success");
        }
      default:
        res.end("404 Not Found");

      // this switch case depends on the url request , which the user made , and will get the response accordingly - this is for routing
    }
  });

}
const myServer = http.createServer(myHandler);

// we need a port to run the server
// one server can run on only one port
const PORT = 8000;
myServer.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
