const http = require("node:http");
const myselfJson = require("../json/myself.json");

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    // metodo GET para la peticion
    case `GET`: {
      switch (url) {
        case `/myself`:
          res.setHeader = (`Content-Text`, `application/json; charset:utf-8`);
          return (res.end = JSON.stringify(myselfJson));

        // en caso tal haya algun error
        default:
          res.statusCode = 404;
          res.setHeader = (`Content-Text`, `text/html; charset:utf-8`);
          res.end(`<h1>404 no encontrado</h1>`);
      }
    }
    // metodo POST para la creacion
    case `POST`: {
      switch (url) {
        case `yourSelf`:
      }
    }
  }
};

const server = http.createServer(processRequest);

server.listen("3000", () => {
  console.log("el puerto esta en 3000");
});
