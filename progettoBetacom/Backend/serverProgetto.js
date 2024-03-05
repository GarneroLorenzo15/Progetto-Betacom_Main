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

const secretKey = '1234';


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
 * Returns a list of all users in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/utenti/:id', async (req, res) => {
    const userid = req.params.id;

    try{
        const rows = await new Promise((resolve, reject) =>{
            connection.query('SELECT * FROM utente WHERE id_Utente = ?', [userid], (err, rows) =>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows); 
                } 
            });   
        });  

        res.status(200).json({message: 'OK', rows});
    } catch(err){
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
 * Returns a list of all users in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.put('/api/utenti/update/:id', async (req, res) => {
    const userid = req.params.id;
    const updateData = req.body;
    console.log(updateData, 'qui');
    try{
        const response = await connection.query('UPDATE utente SET ? WHERE id_Utente = ?', [updateData, userid]);

        res.status(200).json({message: 'ok'});
    }catch(err){ 
        console.error(err); 
        res.status(500).json({message: 'errore del server'});
    } 
 
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

    const { id_Utente, nome, cognome, email, password } = req.body;
    console.log(req.body);

    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO utente (id_Utente, nome, cognome, email, password) VALUES (?,?,?,?,?)',[id_Utente, nome, cognome, email, password], (err, rows)=>{
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


//login 



/**
 * Returns the rendered HTML for the events page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {string} The rendered HTML for the events page.
 */
app.get('/api/account', async (req, res) => {  
    return res.render('http://localhost:8080/eventi');
});

/**
 * Returns a JSON Web Token (JWT) that can be used to authenticate the user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/api/login', async (req, res) => { 
    console.log(req.body);
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({ error: 'campo obbligatorio' });
    }

    try {
        const rows = await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM utente WHERE email = ? AND password = ?', [email, password], (err, rows) => {
            if(err) {
                reject(err);
            } else if(rows){ 
                resolve(rows);
            }
        })
    });
     
    console.log(rows);

    if(rows.length > 0) {
        const token = jwt.sign({ id: rows[0].id_Utente }, secretKey , { expiresIn: '1h' });
        return res.status(200).json({ token: token, admin: rows[0].admin, utente: rows[0].id_Utente });
    } else if(rows.length <= 0){
        res.status(404).json({ error: 'Utente non trovato' });
    }
 

   } catch (error) {
        console.error('Error fetching users:', error);
         if( res.statusCode === 500) { 
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    } 

});


/* app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Campo obbligatorio' });
        }

        connection.query('SELECT * FROM utente WHERE email = ? AND password = ?', [email, password], (err, result) => {
            if (err) {
                console.error('Errore nel recupero dell\'utente:', err);
                return res.status(500).json({ error: 'Errore del server' });
            }
            
            if (result.length === 0) {
                return res.status(404).json({ error: 'Utente non trovato' });
            }

            // L'utente è stato trovato, genera un token JWT
            const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });
            res.status(200).json({token: token});
            // Reindirizza alla pagina degli eventi
            res.redirect(200, 'http://localhost:8080/eventi');
        });
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ error: 'Errore del server' });
    }
}); */

  


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
/* app.post('/api/eventi/add', (req, res) => {
    connection.query('INSERT INTO evento (id_Evento, titolo, data, descrizione, luogo, immagine_evento) VALUES (?, ?, ?, ?, ?, ?)',[5, 'piscina', '2024-04-21', 'Luogo molto divertente ma anche rilassante.', '', ''], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
}); */
/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 *//* 
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
 */
/**
 * Adds a new event to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/eventi/add', async (req, res) => {
    try {
        console.log(req.body); 
        const { titolo, data, descrizione, luogo, immagine_evento } = req.body;

        if(!titolo || !descrizione  ){ 
            res.status(400).json({ error: 'Il campo fornito è obbliogatorio' });
        }
  
 
    
        const rows = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO evento ( titolo, data, descrizione, luogo, immagine_evento) VALUES (?, ?, ?, ?, ?)', [ titolo, data, descrizione, luogo, immagine_evento], (err, rows) => {
                if (err) { 
                    reject(err);       
                } else {
                    resolve(rows);
                }
            });
        });
 
         
        if(res.length > 0) {
            res.status(200).json(rows);
        } else if(res.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        } 

    } catch (err) {
        console.error('Errore durante l\'inserimento dell\'evento:', err);
        if (err.code === 'ER_BAD_FIELD_ERROR') {
            res.status(400).json({ error: 'Il campo fornito non è valido' });
        } else {
            res.status(500).json({ error: 'Si è verificato un errore durante l\'elaborazione della richiesta' });
        }
    } 
});

/* app.post('/api/eventi/add', async (req, res) => {
    try {
        const { titolo, data, descrizione, luogo, immagine_evento } = req.body;

        if (!titolo || !descrizione) {
            return res.status(400).json({ error: 'Il campo fornito è obbligatorio' });
        }

        // Query per ottenere l'ID autoincrementato minore disponibile
        const getMinAvailableIdQuery = 'SELECT MIN(id + 1) AS next_id FROM evento WHERE NOT EXISTS (SELECT 1 FROM evento AS t WHERE t.id = evento.id + 1)';

        const [minIdRows,] = await connection.query(getMinAvailableIdQuery);

        const nextId = minIdRows[0].next_id || 1; // Se non c'è alcun record, inizia da 1

        // Inserisci il nuovo record con l'ID autoincrementato minore disponibile
        const insertQuery = 'INSERT INTO evento (id, titolo, data, descrizione, luogo, immagine_evento) VALUES (?, ?, ?, ?, ?, ?)';
        const insertValues = [nextId, titolo, data, descrizione, luogo, immagine_evento];
 
        const [rows,] = await connection.query(insertQuery, insertValues);

        res.status(200).json({ id: nextId, message: 'Evento inserito correttamente' });

    } catch (err) {
        console.error('Errore durante l\'inserimento dell\'evento:', err);
        if (err.code === 'ER_BAD_FIELD_ERROR') {
            res.status(400).json({ error: 'Il campo fornito non è valido' });
        } else {
            res.status(500).json({ error: 'Si è verificato un errore durante l\'elaborazione della richiesta' });
        }
    }
}); */


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
        console.error('Error fetching votes:', err);
        if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});

app.post('/api/voti/add/:id', async (req, res) => {

   

    try{
        const rows = await new Promise((resolve, reject) => {
            connection.query('INSET INTO voti (id_Evento, voto)  VALUES (?, ?)', [eventid, 1], (err, rows) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(rows);
                }
            });
        });

        if(rows.length > 0) {
            res.status(200).json({message: 'voto inserito correttamente!'});
        } else if (rows.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }
    }catch(err){
        console.error('Error adding votes:', err);
        if( res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' }); 
        }else if (res.statusCode === 400){
            res.status(400).json({ error: 'Bad Request' }); 
        }
    }
})


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