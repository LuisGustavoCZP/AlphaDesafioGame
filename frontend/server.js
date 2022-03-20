const express = require('express');
const https = require('https');
const rPath = require('path');
const app = express();
const path = __dirname;
const root = rPath.dirname(path);
const port = 80;
const fs = require('fs');

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync(`${root}/security/cert.key`),
    cert: fs.readFileSync(`${root}/security/cert.pem`)
};

const p = path+"/src/";
app.use('/static', express.static(p+"static/"));


app.get("/modules/*", (req, res)=>
{ 
    let relativePath = req.params[0];
    if(relativePath.endsWith("/")) relativePath += "index.html";
    console.log(relativePath);

    let origin = rPath.resolve(p, "modules", `${relativePath}`);   
    res.sendFile(origin);
});

app.get("/images/*", (req, res)=>
{
    let relativePath = req.params[0];
    console.log(relativePath);
    const origin = rPath.resolve(p, "images", `${relativePath}`);
    res.sendFile(origin);
});
// /audios/../../user.js
app.get("/audios/*", (req, res)=>
{
    let relativePath = req.params[0];
    console.log(relativePath);
    const origin = rPath.resolve(p, "audios", `${relativePath}`);
    res.sendFile(origin);
});

app.get("/*", (req, res)=>
{
    const origin = rPath.resolve(p, "index.html");
    res.sendFile(origin);
});

https.createServer(options, app).listen(port, () => {console.log(`Servidor iniciado em ${port}`)});
//app.listen(port, () => console.log(`Example app listening on port ${port}!`));