// const express = require("express");
const myself = require("../../json/myself.json");
const app = express();

app.disable("x-powered-by");

const port = process.env.port ?? 3000;

// esto un middlawre: lo que haces que despues de la peticion empieza por aca y luego da la respuesta del get
// solo me deja ingresar el json atravez del postman
app.use(express.json());

// esto es lo mismo que lo de arriba

// app.use((req, res, next) => {
//   if (req.method !== `POST`) return next();
//   if (req.headers[`Content-Type`] === `application/json`) return next();

//   let body = `{
//   	"name": "yonier",
//   	"type": "vasquez",
//   	"timestamp": 1728876832726
// 	}`;

//   req.on(`data`, (chunk) => {
//     body += chunk.toString();
//   });

//   req.on(`end`, () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();
//     req.body = data;
//     next();
//   });
// });

// metodo GET
app.get("/me", (req, res) => {
  res.status(200).json(myself);
  myself.timestamp = Date.now();
});

// metodo post
app.post("/you", (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send(`<h1>404 no encontrado</h1>`);
});

app.listen(port, () => {
  console.log(`puerto: ${port}`);
});
