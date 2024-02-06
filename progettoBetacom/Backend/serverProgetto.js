const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const port = 3000;

const app = express();

app.use(cors());
app.use(morgan('tiny')); //stampa nel terminale le richieste che arrivano nel server
app.use(express.json()); //per tradurre i json in arrivo nei pacchetti destinati al nostro server


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'databasebetacomgioco'
});


app.get('/', (req, res) =>{
    res.send('works');
});;

app.get('/api/utenti', (req, res) => {
    connection.query('SELECT * FROM utente', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});


app.get('/api/utenti/delete/:id', (req, res) => {
    const userid = req.params.id;
    connection.query('DELETE FROM utente WHERE id_Utente = ?', [userid], (err, rows) => {
        if (err) throw err;
        res.json({message: `l'utente ${userid} è stato rimosso`});
    });
});

app.post('/api/utenti/add', (req, res) => {
    connection.query('INSERT INTO utente (id_Utente, nome, cognome, email, password) VALUES (?, ?, ?, ?, ?)',[1, 'Sandro', 'Maffiodo', 's.maffiodo', 'sandro'], (err, rows)=>{
        if(err) throw err;
        res.json({message: 'Utente inserito correttamente!'});
    });
});

app.get('/api/eventi', (req, res) => {
    connection.query('SELECT * FROM evento', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});
app.get('/api/eventi/delete/:id', (req, res) => {
    const eventid = req.params.id;
    connection.query('DELETE FROM evento WHERE id_Evento = ?', [eventid], (err, rows) => {
        if (err) throw err;
        res.json({message: `l'evento ${eventid} è stato rimosso`});
    });
});
app.post('/api/eventi/add', (req, res) => {
    connection.query('INSERT INTO evento (id_Evento, titolo, data, descrizione, luogo, immagine_evento) VALUES (?, ?, ?, ?, ?, ?)',[5, 'piscina', '2024-04-21', 'Luogo molto divertente ma anche rilassante.', '', ''], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});;