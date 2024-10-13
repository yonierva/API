const express = require("express");
const myself = require("../json/myself.json");
const app = express();

app.disable("x-powered-by");

const port = process.env.port ?? 3000;

// metodo GET
app.get("/me", (req, res) => {
  res.status(200).json(myself);
});

// metodo post
app.post("/you", (req, res) => {
  const body = `{
        "name": "yonier",
        "type": "vasquez"
      }`;

  req.on(`data`, (chunk) => {
    body += chunk.toString();
  });

  req.on(`end`, () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    res.status(201).json(data);
  });
});

app.use((req, res) => {
  res.status(404).send(`<h1>404 no encontrado</h1>`);
});

app.listen(port, () => {
  console.log(`puerto: ${port}`);
});
