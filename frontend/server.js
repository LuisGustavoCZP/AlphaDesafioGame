const express = require('express');
const https = require('https');

const app = express();
const path = __dirname;
const root = path.slice(0, path.lastIndexOf("/"));
const port = 80;
const fs = require('fs');

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync(`${root}/security/cert.key`),
    cert: fs.readFileSync(`${root}/security/cert.pem`)
};

/* app.use('/aplicacao1', express.static(path+'/src/aplicacao1'));
app.use('/aplicacao2', express.static(path+'/src/aplicacao2')); */
const p = `${path}/src/`;
console.log(p);
app.use('/', express.static(p));

https.createServer(options, app).listen(port, () => {console.log(`Servidor iniciado em ${port}`)});
//app.listen(port, () => console.log(`Example app listening on port ${port}!`));