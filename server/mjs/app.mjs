import express, { json } from "express";
const app = express();
import { valideCountry, parcialCountry } from "./schema.mjs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const countrys = require("../../json/country.json");

app.disable("x-powered-by");

app.use(json());

// para filtrar movies
app.get("/country", (req, res) => {
  // esto arregla el problema de cors
  res.header("Access-Control-Allow-Origen", "*");
  const { region } = req.query;
  if (region) {
    const filteredregion = countrys.filter((country) =>
      country.region.toLowerCase().includes(region.toLowerCase())
    );
    return res.json(filteredregion);
  }
  return res.json(countrys);
});

//para buscar por id
app.get("/country/:id", (req, res) => {
  const { id } = req.params;
  const country = countrys.find((country) => country._id === parseInt(id));
  if (country) return res.json(country);
  else {
    res.status(404).json({ message: "no encontrado" });
  }
});

// agragar un pais
app.post("/country", (req, res) => {
  // para validar datos con el meto zod
  const valide = valideCountry(req.body);

  if (valide.error) {
    res.status(404).json({ error: JSON.parse(valide.error.message) });
  }

  // se puede asi
  // const { name, age, population, region } = req.body;

  const findid = countrys.length > 0 ? countrys[countrys.length - 1]._id : null;
  const nextid = findid + 1;
  const newCountry = {
    _id: nextid,
    ...valide.data,
  };

  countrys.push(newCountry);
  res.status(201).json(newCountry);
});

// para borrar un pais
app.delete("/country/:id", (req, res) => {
  const { id } = req.params;
  const countryIndex = countrys.findIndex(
    (country) => country._id === parseInt(id)
  );
  if (countryIndex === -1) {
    res.status(404).json({ message: "no encontrado" });
  } else {
    countrys.splice(countryIndex, 1);
    return res.json({ message: "country delate" });
  }
});

// actualizacion de un pais
app.patch("/country/:id", (req, res) => {
  const { id } = req.params;
  const valide = parcialCountry(req.body);
  const countryIndex = countrys.findIndex(
    (country) => country._id === parseInt(id)
  );
  if (countryIndex === -1) {
    res.status(404).json({ error: JSON.parse(valide.error.message) });
  }

  const upadteCountry = {
    ...countrys[countryIndex],
    ...valide.data,
  };

  countrys[countryIndex] = upadteCountry;

  return res.json(upadteCountry);
});

// en caso que la peticion no se encuentre
app.use((req, res) => {
  res.status(404).send(`<h1>404 no encontrado</h1>`);
});

//llamada de puerto
const port = process.env.port ?? 3000;

app.listen(port, () => {
  console.log(`puerto: ${port}`);
});
