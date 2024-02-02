const express = require('express');
const mysql = require('mysql');
const port = 3000;

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lollo9090',
    database: 'progettobetacomdb'
})


app.get('/', (req, res) =>{
    res.send('works');
})


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})