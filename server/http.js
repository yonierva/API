const http = require("node:http");

const desiredPort = process.env.Port ?? 1234; // eligiendo el puerto

// // proceso de creacion del req y res para el cracion del server
const processRequest = (req, res) => {
  if (req.url === `/`) {
    res.statusCode = 200;
    res.setHeader = (`Content-Text`, `text/html; charest:uft-8`);
    console.log(req.url);
    res.end(`hello`);
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`puerto utilizado en:${desiredPort}`);
});
