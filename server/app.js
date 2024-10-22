const express = require("express");
const app = express();
const z = require("zod");
const countrys = require("../json/country.json");

app.disable("x-powered-by");

app.use(express.json());

// para filtrar movies
app.get("/country", (req, res) => {
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

app.post("/country", (req, res) => {
  const countrySchema = z.object({
    name: z.string(),
    age: z.number().int(),
    population: z.string(),
    region: z.enum([
      "norteamarica",
      "suramerica",
      "europa",
      "africa",
      "asia",
      "oceania",
    ]),
  });
  const { name, age, population, region } = req.body;

  //  sirve para buscar el elemento con la mayor id
  // const country = countrys.reduce((prev, current) => {
  //   return (prev.id > current.id) ? prev : current;
  // }).id;

  const nextid = countrys[countrys.length - 1].id;
  const newCountry = {
    id: nextid + 1,
    name,
    age,
    population,
    region,
  };

  countrys.push(newCountry);
  res.status(201).json(newCountry);
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
