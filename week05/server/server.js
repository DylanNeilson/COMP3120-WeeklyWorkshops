const express = require("express");

const app = express();
const cors = require("cors");

// app.use(express.static("build"));

const fs = require("fs");
const { stringify } = require("querystring");

app.use(cors());

app.get("/", (request, response) => {
    response.send("<p>Hello world</p>");
});

units = JSON.parse(fs.readFileSync("server/units.json")).units;

app.get("/units", (_, response) => {
    response.send(units);
});

app.use(express.json());

app.post("/units", (request, response) => {
    const maxId = units.length > 0 ? Math.max(...units.map((n) => n.id)) : 0;
    const unit = request.body;

    console.log("Received unit:", unit);

    units = units.concat(unit);

    console.log("Updated units array:", units);

    fs.writeFileSync("server/units.json", JSON.stringify({ units }, null, 2));
    response.json(unit);
});

app.delete("/units", (request, response) => {
    console.log(request.body);
    const id = request.body.id;
    let result = { status: "not found" };
    let newUnits = [];
    units.map((unit) => {
        if (unit.id === id) {
            result = { status: "success" };
        } else {
            newUnits.push(unit);
        }
    });
    units = newUnits;
    console.log("Unit Deleted");
    fs.writeFileSync("server/units.json", JSON.stringify({ units }, null, 2));
    response.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server running on PORT,", PORT);
});
