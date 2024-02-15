const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
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
/* app.get('/api/utenti', (req, res) => {
    connection.query('SELECT * FROM utente', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
}); *
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/utenti', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM utente', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.status(200).json(rows); 
    } catch (err) {
        console.error('Error fetching users:', err);
        if(res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});



/**
 * Returns a list of all users in the database who are available
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.get('/api/utenti/partecipanti', (req, res) =>{
    connection.query('SELECT * FROM utente WHERE disponibile = ?',[1],  (err, rows) =>{
        if(err) throw err;
        res.json(rows);
    });
}); */
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/utenti/partecipanti', async(req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM utente WHERE disponibile = ?', [1],  (err, rows) =>{
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }); 
        });
        res.status(200).json(rows);

    } catch (err) {
        console.error('Error fetching users:', err);
        if(res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});



/**
 * Deletes a user from the database based on the specified user ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.delete('/api/utenti/delete/:id', (req, res) => {
    const userid = req.params.id; // extract the user ID from the request parameter

    connection.query('DELETE FROM utente WHERE id_Utente = ?', [userid], (err, rows) => {
        if (err) throw err;
        res.json({message: `l'utente ${userid} è stato rimosso`});
    });
}); */
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/utenti/delete/:id', async (req, res) => {
    const userid = req.params.id; 

    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM utente WHERE id_Utente =?', [userid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.status(200).json({message: `l'utente ${userid} è stato rimosso`, rows});
    } catch (err) {
        console.error('Error fetching users:', err);
        if(res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});


/**
 * Adds a new user to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.post('/api/utenti/add', (req, res) => {
    connection.query('INSERT INTO utente (id_Utente, nome, cognome, email, password) VALUES (?, ?, ?, ?, ?)',[1, 'Sandro', 'Maffiodo', 's.maffiodo', 'sandro'], (err, rows)=>{
        if(err) throw err;
        res.json({message: 'Utente inserito correttamente!'});
    });
}); */
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/utenti/add', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO utente (id_Utente, nome, cognome, email, password) VALUES (?,?,?,?,?)',[1, 'Sandro', 'Maffiodo','s.maffiodo','sandro'], (err, rows)=>{
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }); 
        });

        res.status(200).json({message: 'Utente inserito correttamente!', rows});
    } catch (err) {
        console.error('Error fetching users:', err);
        if(res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});


//eventi

/**
 * Returns a list of all events in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.get('/api/eventi', (req, res) => {
    connection.query('SELECT * FROM evento', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
}); */
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/eventi', async(req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM evento', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        if(res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});



/**
 * Returns a list of all events in the database based on the specified event ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.get('/api/eventi/:id', (req, res) =>{
    const eventid = req.params.id;

    connection.query('SELECT * FROM evento WHERE id_Evento = ?', [eventid], (err, rows) => {
        if (err) throw err;
        res.json(rows); 
    })
}) */
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/eventi/:id', async (req, res) => {
    const eventid = req.params.id;

    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM evento WHERE id_Evento = ?', [eventid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if(rows.length > 0){
            res.status(200).json(rows);
        }else if(rows.length <= 0){
             res.status(404).json({ error: 'Not Found' });
        }

        
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Server Error' }); 
        res.status(400).json({ error: 'Bad Request' }); 
    };
});



/**
 * Deletes a user from the database based on the specified user ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.delete('/api/eventi/delete/:id', (req, res) => {
    const eventid = req.params.id;
    connection.query('DELETE FROM evento WHERE id_Evento = ?', [eventid], (err, rows) => {
        if (err) throw err;
        res.json({message: `l'evento ${eventid} è stato rimosso`}); 
    });
}); */
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/eventi/delete/:id', async (req, res) => {
    const eventid = req.params.id;

    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM evento WHERE id_Evento = ?', [eventid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }); 
        
        res.status(200).json({message: `l'evento ${eventid} è stato rimosso`, rows});
    } catch (err) {
        console.error('Error fetching users:', err);
        if(res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
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
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/eventi/add', async (req, res) => {
    
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO evento (id_Evento, titolo, data, descrizione, luogo, immagine_evento) VALUES ( ?, ?, ?, ?, ?, ?)',[5, 'piscina', '2024-04-21', 'Luogo molto divertente ma anche rilassante.', '', ''], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        if(res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});


//proposte

/**
 * Returns a list of all propostas in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.get('/api/proposte', (req, res) => {
    connection.query('SELECT * FROM proposte', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    })
}); */
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/proposte', async (req, res)=> {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM proposte', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if(rows.length > 0) {
           res.status(200).json(rows); 
        } else if(rows.length <= 0){
             res.status(404).json({ error: 'Not Found' });
        }
        
        
    } catch (err) {
        console.error('Error fetching users:', err);
        if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});


/**
 * Deletes a proposta from the database based on the specified proposta ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/proposte/delete/:id', (req, res) => {
    const proposteid = req.params.id;
    connection.query('DELETE FROM proposte WHERE id_Proposta = ?', [proposteid],  (err, rows) => {
        if (err) throw err;
        res.json({message: `la proposta ${proposteid} è stato rimosso`});
    });
});
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.delete('/api/proposte/delete/:id', async (req, res) => {
    const proposteid = req.params.id;

    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM proposte WHERE id_Proposta = ?', [proposteid],  (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if(rows.length > 0) {
            res.status(200).json({message: `la proposta ${proposteid} è stato rimosso`, rows});
        } else if (rows.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }

    } catch (err) {
        console.error('Error fetching users:', err);
        if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
}); */


/**
 * Deletes all rows from the proposte table
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/proposte/delete', (req, res) => {
    connection.query('TRUNCATE TABLE proposte', (err, rows) => {
        if (err) throw err;
        res.json({message: `tabella svuotata`});
    });
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
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
/* app.post('/api/proposte/add', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO proposte (id_Proposta, titolo, data, descrizione, luogo, immagine_evento) VALUES (?,?,?,?,?,?)',[5, 'piscina', '2024-04-21', 'Luogo molto divertente ma anche rilassante.', '', ''], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        
        if(rows.length > 0) {
            res.status(200).json({message: 'proposta inserita correttamente!', rows});
        } else if (rows.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (err) {
        console.error('Error fetching users:', err);
        if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    }
}); */

//voti

/**
 * Returns a list of all votes in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/voti', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM voti', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if(rows.length > 0) {
           res.status(200).json(rows); 
        } else if(rows.length <= 0){
             res.status(404).json({ error: 'Not Found' });
        };
    } catch (err) {
        console.error('Error fetching users:', err);
        if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});

app.post('/api/voti/add')


/**
 * Starts the server and listens for incoming requests
 */
app.listen(port, () =>{
    /**
   * Logs a message to the console indicating that the server is running on the specified port
   * @param {number} port - The port on which the server is listening
   */
    console.log(`Server is running on port ${port}`)
});