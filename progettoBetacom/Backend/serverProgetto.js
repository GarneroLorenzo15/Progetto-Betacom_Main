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


//utenti

/**
 * Returns a list of all users in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/utenti', (req, res) => {
    connection.query('SELECT * FROM utente', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});


/**
 * Returns a list of all users in the database who are available
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/utenti/partecipanti', (req, res) =>{
    connection.query('SELECT * FROM utente WHERE disponibile = ?',[1],  (err, rows) =>{
        if(err) throw err;
        res.json(rows);
    });
});


/**
 * Deletes a user from the database based on the specified user ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/utenti/delete/:id', (req, res) => {
    const userid = req.params.id; // extract the user ID from the request parameter

    connection.query('DELETE FROM utente WHERE id_Utente = ?', [userid], (err, rows) => {
        if (err) throw err;
        res.json({message: `l'utente ${userid} è stato rimosso`});
    });
});



/**
 * Adds a new user to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/utenti/add', (req, res) => {
    connection.query('INSERT INTO utente (id_Utente, nome, cognome, email, password) VALUES (?, ?, ?, ?, ?)',[1, 'Sandro', 'Maffiodo', 's.maffiodo', 'sandro'], (err, rows)=>{
        if(err) throw err;
        res.json({message: 'Utente inserito correttamente!'});
    });
});



//eventi

/**
 * Returns a list of all events in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/eventi', (req, res) => {
    connection.query('SELECT * FROM evento', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

/**
 * Deletes a user from the database based on the specified user ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/eventi/delete/:id', (req, res) => {
    const eventid = req.params.id;
    connection.query('DELETE FROM evento WHERE id_Evento = ?', [eventid], (err, rows) => {
        if (err) throw err;
        res.json({message: `l'evento ${eventid} è stato rimosso`}); 
    });
});


/**
 * Adds a new event to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/eventi/add', (req, res) => {
    connection.query('INSERT INTO evento (id_Evento, titolo, data, descrizione, luogo, immagine_evento) VALUES (?, ?, ?, ?, ?, ?)',[5, 'piscina', '2024-04-21', 'Luogo molto divertente ma anche rilassante.', '', ''], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});


//proposte

/**
 * Returns a list of all propostas in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/proposte', (req, res) => {
    connection.query('SELECT * FROM proposte', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
});


/**
 * Deletes a proposta from the database based on the specified proposta ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/proposte/delete/:id', (req, res) => {
    const proposteid = req.params.id;
    connection.query('DELETE FROM proposte WHERE id_Proposta = ?', [proposteid],  (err, rows) => {
        if (err) throw err;
        res.json({message: `la proposta ${proposteid} è stato rimosso`});
    })
});

/**
 * Adds a new proposta to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/proposte/add', (req, res) => {
    connection.query('INSERT INTO proposte (id_Proposta, titolo, data, descrizione, luogo, immagine_evento) VALUES (?, ?, ?, ?, ?, ?)',[5, 'piscina', '2024-04-21', 'Luogo molto divertente ma anche rilassante.', '', ''], (err, rows) => {
        if (err) throw err; 
        res.json({message: 'proposta inserita correttamente!'});
    });
});



/**
 * Starts the server and listens for incoming requests
 */
app.listen(port, () =>{
    /**
   * Logs a message to the console indicating that the server is running on the specified port
   * @param {number} port - The port on which the server is listening
   */
    console.log(`Server is running on port ${port}`)
});;