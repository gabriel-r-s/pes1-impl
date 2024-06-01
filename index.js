const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

let nums = [1, 2, 3];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/submit", (req, res) => {
    res.render("submit");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 50) + 1;
    res.render("rand", { num: num });
})

app.get("/rand/:lower,:upper", (req, res) => {
    // generate a random number between lower and upper
    let { lower, upper } = req.params;
    lower = parseInt(lower);
    upper = parseInt(upper);
    if (isNaN(lower)) { lower = 1; }
    if (isNaN(upper)) { upper = 20; }
    const num = Math.floor(Math.random() * upper) + lower;
    res.render("randrange", { lower, upper, num });
})

app.get("/add/:num", (req, res) => {
    let { num } = req.params;
    if (num == "clear") {
        nums = [];
        return
    }
    num = parseInt(num);
    if (isNaN(num)) return;
    nums.push(num);
    res.send(nums);
})

app.get("*", (req, res) => {
    res.render("404");
})

