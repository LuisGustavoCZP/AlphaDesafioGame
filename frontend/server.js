const express = require('express');
const app = express();

const port = 8080;

app.use('/aplicacao1', express.static('./src/aplicacao1'));
app.use('/aplicacao2', express.static('./src/aplicacao2'));
app.use('/aplicacao3',express.static('./src/aplicacao3'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));