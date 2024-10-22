const z = require("zod");

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

function valideCountry(object) {
  return countrySchema.safeParse(object);
}

function parcialCountry(object) {
  return countrySchema.partial().safeParse(object);
}

module.exports = {
  valideCountry,
  parcialCountry,
};
