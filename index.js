var express = require("express"),
cors = require("cors"),
secure = require("ssl-express-www");
const PORT = process.env.PORT || 3000;
var path = require("path");
var { color } = require("./color.js");

var apirouter = require("./New 2/api");

var app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "New 2", "index.html"));
});

app.use("/api", apirouter);

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT, "green"));
});

module.exports = app;
