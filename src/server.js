const express = require("express");
const path = require("path");

const app = express();
const port = 80;
const compression = require("compression");

app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

// Default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/test", (req, res) => {
        res.sendFile(path.join(__dirname, "public/test.html"));
    }
)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});