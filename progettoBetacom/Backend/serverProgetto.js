const express = require('express');
const mysql = require('mysql');
const port = 3000;

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lollo9090!',
    port: '3306',
    database: 'prgettobetacomdb'
});

app.set('view engine', 'ejs');


app.get('/', (req, res) =>{
    res.send('works');
});;

/* app.get('/utente', (req, res) =>{
    for(let i = 0; i < 27; i++){
        connection.query('SELECT * FROM prgettobetacomdb.utente (nome) VALUES (?)', [i],  (err, result) =>{
            if(err) throw err;
            res.render('../Frontend/views/utente', {utente: result});
        })
    }
    res.sendFile('../Frontend/views/utente', {utente: result});
});

 */
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});;