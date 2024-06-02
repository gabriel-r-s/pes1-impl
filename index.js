const express = require("express");
const path = require("path");
const feedback = require("./routes/feedback.js")

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

app.get("/", (req, res) =>  {
    res.render("home")
});

app.get("/admin", (req, res) => {
    res.render("admin")
});

app.get("/update", (req, res) => {
    res.render("update")
});

app.route("/feedback")
    .get((req, res) => {
        feedback.get(req, res);
    })
    .post((req, res) => {
        feedback.post(req, res);
    })
    .put((req, res) => {
        feedback.put(req, res);
    })
    .delete((req, res) => {
        feedback.del(req, res);
    })

app.get("*", (req, res) => {
    res.render("404");
});

