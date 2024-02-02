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

/* function inserisciID(){
    for (let i = 0; i < 30; i++){
        if(i === 1){
            console.log("posto occupato: " + i)
        }else{
            connection.query('INSERT INTO prgettobetacomdb.utente (idu) VALUES (?)' , [i], (err, res) =>{
                if(err) throw err;
                console.log("idu aggiornato con successo: " + i + res)
            })
        }
    } 
}

inserisciID();
 */

app.get('/', (req, res) =>{
    res.send('works');
});;

/* app.get('/utente', (req, res) =>{
    for(let i = 0; i < 27; i++){
        connection.query('SELECT * FROM prgettobetacomdb.utente (nome) VALUES (?)', [i],  (err, result) =>{
            if(err) throw err;
            res.sendFile('../Frontend/views/utente', {utente: result});
        })
    }
    res.sendFile('../Frontend/views/utente', {utente: result});
}); */


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});;