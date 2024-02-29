const express = require("express");
const app = express();
let users = {
  name: "Arun Panwar",
  kidney: [
    {
      healthy: true,
    },
    {
      healthy: true,
    },
  ],
};
console.log(users.kidney[1]);
app.use(express.json());
//this is used to parse the data that is being send
app.get("/", function (req, res) {
  // res.send("Hi there");
  //we have to the total number of kidney and how many of them are healhy
  let heal = 0,
    tot = 0;
  console.log(users.kidney);
  tot = users.kidney.length;
  for (let i = 0; i < users.kidney.length; i++) {
    if (users.kidney[i].healthy) {
      heal++;
    }
  }
  res.json({ kidneys: users.kidney, heal, tot });
});
app.post("/", (req, res) => {
  let h = req.body.isHealthy;
  users.kidney.push({
    healthy: h,
  });
  res.json({
    message: "kidney added successfully",
  });
});
//suppose the update works in following manner it takes an index and alter the state of the kidney
app.put("/", (req, res) => {
  console.log(req.body);
  let i = parseInt(req.body.in);
  console.log(i);
  if (i < 0 || i >= users.kidney.length) {
    res.json({
      message: "invalid index",
    });
  } else {
    if (users.kidney[i].healthy) {
      users.kidney[i].healthy = false;
    } else users.kidney[i].healthy = true;
    res.send("The requested kidney toggled successfully.");
  }
});
app.delete("/", (req, res) => {
  let i = req.body.in;
  console.log(users.kidney.length);
  if (i < 0 || i >= users.kidney.length) {
    res.json({
      message: "invalid index",
    });
  } else {
    // Remove the kidney at the specified index
    users.kidney.splice(i, 1);
    res.json({ msg: "The kidney is removed successfully" });
  }
});

app.listen(3000);
