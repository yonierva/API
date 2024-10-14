const express = require("express");
const app = express();

app.disable("x-powered-by");

// esto un middlawre
// app.use();

// metodo GET
app.get("/", (req, res) => {
  res.status(200).send("hola");
});

// metodo post
// app.post("/you", (req, res) => {
//   res.status(201).json(req.body);
// });

app.use((req, res) => {
  res.status(404).send(`<h1>404 no encontrado</h1>`);
});

const port = process.env.port ?? 3000;

app.listen(port, () => {
  console.log(`puerto: ${port}`);
});
