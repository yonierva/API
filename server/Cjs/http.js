const http = require("node:http");
const fs = require("node:fs");

const desiredPort = process.env.Port ?? 1234; // eligiendo el puerto

// // proceso de creacion del req y res para el cracion del server
const processRequest = (req, res) => {
  if (req.url === `/`) {
    res.setHeader = (`Content-Text`, `text/html; charset:utf-8`);
    console.log(req.url);
    res.end(`hello world`);
    //url donde esta la imagen
  } else if (req.url === `/imagen`) {
    //error en caso no que algo salga mal
    fs.readFile(`../1357625.png`, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`<h1>error del server</h1>`);
      } else {
        res.statusCode = 200;
        res.setHeader(`Content-Text`, `image/png`);
        res.end(data);
      }
    });
  }
};

const server = http.createServer(processRequest);
// el puerto por el cual se va a conectar
server.listen(desiredPort, () => {
  console.log(`puerto utilizado en:${desiredPort}`);
});
