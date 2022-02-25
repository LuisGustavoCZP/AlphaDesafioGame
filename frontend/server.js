const express = require('express');
const https = require('https');

const app = express();
const path = __dirname;
const port = 8080;

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync(`${__dirname}/frontend.key`),
    cert: fs.readFileSync(`${__dirname}/frontend.crt`)
};

/* app.use('/aplicacao1', express.static(path+'/src/aplicacao1'));
app.use('/aplicacao2', express.static(path+'/src/aplicacao2')); */
app.use('/', express.static(path+'/src/'));

https.createServer(options, app).listen(port, () => {console.log(`Servidor iniciado em ${port}`)});
//app.listen(port, () => console.log(`Example app listening on port ${port}!`));