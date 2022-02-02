const express = require("express");
const app = express();
const port = 3000;
const friendsArr = require("./db");

// console.log(friendsArr);

app.use(express.static("public"));

app.get("/friends", (req, res) => {
  let htmlData = `<ul>`;
  for (let friend of friendsArr) {
    htmlData += `<li>
    <a href="/friends/${friend.handle}">${friend.name}</a>
    </li>`;
  }
  htmlData += `</ul>`;

  res.send(htmlData);
});

app.get("/friends/:handle", (req, res) => {
  const { handle } = req.params;
  console.log("Handle is", handle, req.params);
  const friend = friendsArr.find((friend) => friend.handle === handle);
  console.log(friend);

  if (friend) {
    let htmlData = ``;
    htmlData += `<h1>${friend.name}</h1>`;
    htmlData += `<h2>${friend.handle}<h2>`;
    res.send(htmlData);
  } else {
    res.status(404).send(`No friend with handle ${handle}`);
  }
});

app.get("/getget", (req, res) => {
  res.send("I have no idea what's going on");
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`put this link in the browser http://localhost:${port}`);
});
