const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs"); // fs imported so that new data "POSTED" can be added to mock_data.json
const PORT = 8000;
// we need to user middleware - can be understood as a plugin , app.use()-> registers a middleware in our express server

app.use(express.urlencoded({ extended: false }));
// express.urlencoded() → built-in Express middleware used to parse URL-encoded data sent by HTML forms.

app.use((req, res, next) => {
  // next() is the reference to the next middleware/router in the whole stack or process

  console.log("Hello from middleware 1");
  fs.appendFile(
    "log.txt",
    `${Date.now()}:${req.ip} ${req.method} : ${req.path}\n`,
    (err, data) => {
      next();
    },
  );
  // return res.json({ msg: "Hello from middleware 1 " });

  // req.myUserName = "yashkothari"; // we created a "myUsername" and can access it anywhere in the req-res cycle
});

// if we neither call the next() or end the response , the whole process will be stopped that must be done after this middleware

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

app.get("/", (req, res) => {
  return res.send("This is home page");
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`)}
  </ul>`;
  res.send(html);
});

// routes API points - for json format

//-----------------------------------------------------------------------------------------------------------------------

app.get("/api/users", (req, res) => {
  // setting http header
  res.setHeader("x-myName", "yashkothari"); // this is the response header field that will be returned with the response
  // custom header , and always add "x" with custom header as a good practice to let other know that its a custom header
  console.log(req.headers); // this header is added to the req , on postman by ourselves
  console.log("I am in get route");
  return res.json(users);
}); // getting all users

app.post("/api/users", (req, res) => {
  // TODO - create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "all fields are required" }); // adding a status code message for incomplete payload of data while creating a new user
  }
  const newUser = {
    // id: users.length + 1,
    id: Math.max(...users.map((user) => user.id)) + 1,
    ...body,
  };
  users.push(newUser);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to save user",
      });
    }
    return res.status(201).json({ status: "success", user: newUser });
  }); // used to update the mockdata.json file
});

// ------------------------------------------------------------------------------------------------------------------

// // getting users by their ids
// app.get("/api/users/:id", (req, res) => {
//   // first we need to get the id
//   const id = Number(req.params.id);
//   // req.params.id is a string , so we need to first convert it into number
//   // finding the appropriate user whose id matches with the requested id
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// app.patch("/api/users/:id", (req, res) => {
//   //TODO : edit the user with given id
//   return res.json({ status: "pending" });
// }); // we use id for patch , and no need of id for put

// app.delete("/api/users/:id", (req, res) => {
//   //TODO : deleting a user with given id
//   return res.json({ status: "pending" });
// });

// ------------------------------------------------------------------------------------------------------------------

// this is a hybrid server - a good practice where json as well as html response can be returned
// ------------------------------------------------------------------------------------------------------------------

// we can see that in the above snippet , get , patch and delete methods are using same route : /api/users/id
// so we can write these in one single snippet as well

//--------------------------------------------------------------------------------------------------------------------
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) {
      // if the user is not found , 404 error will be thrown
      return res.status(404).json({ error: "user not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // merge only provided fields
    Object.assign(user, req.body);

    // persist to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save" });
      return res.status(200).json(user);
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "user not found" });
    }

    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "failed to save" });
      }
      // null - means no replacer , no filtering and 2 - means indent of 2 spaces per nexting level
      return res.status(200).json({ status: "success" });
    });
  });

//--------------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on : ${PORT}`);
});
