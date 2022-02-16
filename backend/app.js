const port = 3001;
//const path = __dirname;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const database = require("./scripts/database")

app.get("/", (req, res) => 
{
    console.log(`Conexão ${req.ip} iniciada...`);
   
});

app.get("/:fase", (req, res) => 
{
    console.log(req.params);
    res.json({markets:markets});
});

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})
