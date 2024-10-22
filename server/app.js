const express = require("express");
const app = express();
const { valideCountry } = require("./schema");
const { parcialCountry } = require("./schema");
const countrys = require("../json/country.json");

app.disable("x-powered-by");

app.use(express.json());

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
  const country = countrys.find((country) => country.id === parseInt(id));
  if (country) return res.json(country);
});

// agragar un pais
app.post("/country", (req, res) => {
  // pero para validar datos con el meto zod
  const valide = valideCountry(req.body);

  if (valide.error) {
    res.status(404).json({ error: JSON.parse(valide.error.message) });
  }

  // se puede asi
  // const { name, age, population, region } = req.body;

  //  sirve para buscar el elemento con la mayor id
  // const country = countrys.reduce((prev, current) => {
  //   return (prev.id > current.id) ? prev : current;
  // }).id;

  const nextid = countrys[countrys.length - 1].id;
  const newCountry = {
    id: nextid + 1,
    ...valide.data,
  };

  countrys.push(newCountry);
  res.status(201).json(newCountry);
});

// actualizacion de un pais
app.patch("/country/:id", (req, res) => {
  const { id } = req.params;
  const valide = parcialCountry(req.body);
  const countryIndex = countrys.findIndex(
    (country) => country.id === parseInt(id)
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
