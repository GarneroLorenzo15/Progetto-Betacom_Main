const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { addDays } = require('date-fns');
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

//login 
    



/**
 * Returns a JSON Web Token (JWT) that can be used to authenticate the user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'campo obbligatorio' });
    }

    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM utente WHERE email = ? AND password = SHA2( ?, 512)', [email, password], (err, rows) => {
                if (err) {
                    
                } else if (rows) {
                    resolve(rows);
                }
            })
        });

   

        if (rows.length > 0) {
            let user = rows[0];
            delete user.password;
            const token = jwt.sign({ ...user }, secretKey, { expiresIn: '10h' });
            return res.status(200).json({ token: token, admin: rows[0].admin, utente: rows[0].id_Utente });
        } else if (rows.length <= 0) {
            res.status(401).json({ error: 'Non autorizzato' });
        }


    } catch (error) {
        console.error('Error fetching users:', error);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
 
});



app.post('/api/login/google/:email', async (req, res) => {

    const { email } = req.params;
    
    try{
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM utente WHERE email = ?', [email], (err, rows) => {
                if (err) {
                    reject(err);
                } else if (rows) {
                    resolve(rows);
                }
            });
        });

        if (rows.length > 0) {
            let user = rows[0];
            delete user.password;
            const token = jwt.sign({ ...user, google: true }, secretKey, { expiresIn: '10h' });
            return res.status(200).json({ token: token, admin: rows[0].admin, utente: rows[0].id_Utente });
        } else if (rows.length <= 0) {
            res.status(401).json({ error: 'Non autorizzato' });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
});

/* 
 *   Creation session
 */
app.use(async (req, res, next) => {
    try {
        req.session = {
            user: jwt.verify(req.headers.authorization, secretKey)
        }        
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Non autorizzato' });
    }
    return next();

});





//utenti   


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

        rows.map((row) => {
            delete row.password;
        })

        res.status(200).json(rows);  
    } catch (err) {
        console.error('Error fetching users:', err);
        if (res.statusCode === 404) { 
            res.status(404).json({ error: 'Not Found' });
        } else if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
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

    if(req.session.user.id_Utente != userid && req.session.user.admin == 0){
        return  res.status(403).json('non autorizzato');       
    }


    let google = req.session.user.google;
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM utente WHERE id_Utente = ?', [userid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });


        rows.map((row) => {
            delete row.password;
        })

        res.status(200).json({ message: 'OK', rows , google: google});    
    } catch (err) {
        console.error('Error fetching users:', err);
        if (res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
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
    const {nome, cognome, email, password, disponibile} = req.body;
    const decoded = jwt.verify(req.headers.authorization, secretKey, (err, decoded) => {
        if (err) {
            console.error('Errore durante la verifica del token:', err);
            res.status(401).json('cojone')
            return;
        }
        
        return decoded
    });
    

 
    /* if(decoded.admin === 0 ){
        updateData.admin = decoded.admin;
    } */

    if(req.session.user.id_Utente != userid && req.session.user.admin == 0){
        return  res.status(403).json('non autorizzato');       
    } 
    

    try {
        const response = await connection.query('UPDATE utente SET nome= ? , cognome = ?, email = ?, password = SHA2(?, 512), disponibile = ?, admin = 0  WHERE id_Utente = ?', [nome, cognome, email, password, disponibile, userid]);

        res.status(200).json({ message: 'ok' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'errore del server'  });
    }

}); 


 
 


/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/utenti/partecipanti', async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM utente WHERE disponibile = ?', [1], (err, rows) => {
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
        if (res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    };
});



/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/utenti/delete/:id', async (req, res) => {
    const userid = req.params.id;

    if(req.session.user.id_Utente != userid && req.session.user.admin == 0){
        return  res.status(403).json('non autorizzato');       
    }

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

        res.status(200).json({ message: `l'utente ${userid} è stato rimosso`, rows });
    } catch (err) {
        console.error('Error fetching users:', err);
        if (res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' }); 
        }
    };
});




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
            connection.query('INSERT INTO utente (id_Utente, nome, cognome, email, password, admin) VALUES (?,?,?,?,SHA2( ?, 512), 0)', [id_Utente, nome, cognome, email, password], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        res.status(200).json({ message: 'Utente inserito correttamente!', rows });
    } catch (err) {
        console.error('Error fetching users:', err);
        if (res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    };
});






//eventi 


/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/eventi', async (req, res) => {
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
        if (res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    };
});




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

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else if (rows.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }


    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Server Error' });
        res.status(400).json({ error: 'Bad Request' });
    };
});



/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/eventi/delete/:id', async (req, res) => {
    const eventid = req.params.id;


    if (!req.session.user.admin) {
        return res.status(401).json({ error: 'Non autorizzato' });
    }
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

        res.status(200).json({ message: `l'evento ${eventid} è stato rimosso`, rows });
    } catch (err) {
        console.error('Error fetching users:', err);
        if (res.statusCode === 404) {
            res.status(404).json({ error: 'Not Found' });
        } else if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    };
});



/**
 * Adds a new event to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/eventi/add', async (req, res) => {
    try {
        console.log(req.body);
        const { titolo, descrizione, luogo, immagine_evento } = req.body;

        const urlCheck = /^(ftp|http|https):\/\/[^ "]+$/;



        if (!titolo || !descrizione) {
            res.status(400).json({ error: 'Il campo fornito è obbliogatorio' });
        } else if(luogo && !urlCheck.test(luogo)){
            res.status(400).json({ error: 'Il campo fornito non è un url valido' });
        } else if (immagine_evento && !urlCheck.test(immagine_evento)){
            res.status(400).json({ error: 'Il campo fornito non è un url valido' });
        } 
   
 

        const rows = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO evento ( titolo, descrizione, luogo, immagine_evento) VALUES (?, ?, ?, ?)', [titolo, descrizione, luogo, immagine_evento], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });


        if (rows.affectedRows > 0) {
            res.status(200).json(rows);
        } else if (rows.affectedRows <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }

    } catch (err) {
        console.error('Errore durante l\'inserimento dell\'evento:', err);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Si è verificato un errore durante l\'elaborazione della richiesta' });
        }
    }
});


//proposte 


/**
 * Using the try & catch block to handle errors
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/proposte', async (req, res) => {
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

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else if (rows.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }


    } catch (err) {
        console.error('Error fetching users:', err);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
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
    connection.query('DELETE FROM proposte WHERE id_Proposta = ?', [proposteid], (err, rows) => {
        if (err) throw err;
        res.json({ message: `la proposta ${proposteid} è stato rimosso` });
    });
});


/**
 * Deletes all rows from the proposte table
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/proposte/delete', (req, res) => {
    connection.query('TRUNCATE TABLE proposte', (err, rows) => {
        if (err) throw err;
        res.json({ message: `tabella svuotata` });
    });
});


/**
 * Adds a new proposta to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/proposte/add', (req, res) => {
    connection.query('INSERT INTO proposte (id_Proposta, titolo, data, descrizione, luogo, immagine_evento) VALUES (?, ?, ?, ?, ?, ?)', [5, 'piscina', '2024-04-21', 'Luogo molto divertente ma anche rilassante.', '', ''], (err, rows) => {
        if (err) throw err;
        res.json({ message: 'proposta inserita correttamente!' });
    });
});

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

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else if (rows.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        };
    } catch (err) {
        console.error('Error fetching votes:', err);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    };
});





/**
 * Adds a new vote to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/voti/add/', async (req, res) => {

    const { id_Utente, id_Evento } = req.body;

    try {
        // Check if the id_Evento is already associated with id_Utente in the database
        const existingVote = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM voti WHERE id_Evento = ? AND id_Utente = ?', [id_Evento, req.session.user.id_Utente], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if (existingVote.length > 0) {
            res.status(400).json({ error: 'Vote already exists for this user and event' });
            return; // Stop execution here if the vote already exists
        }

        const rows = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO voti (id_Evento, id_Utente, voto) VALUES (?, ?, ?)', [id_Evento, id_Utente, true], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.affectedRows > 0) {
            res.status(200).json({ message: 'Vote inserted successfully!' });
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (err) {
        console.error('Error adding votes:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});




/**
 * Returns a count of the number of unique votes for each event
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/voti/count', async (req, res) => {

    try {
        const query = `
      SELECT titolo, voti.id_Evento, COUNT(*) AS conteggio
      FROM voti INNER JOIN evento ON voti.id_Evento = evento.id_Evento
      GROUP BY voti.id_Evento 
    `;
        const rows = await new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {  
                    reject(err); 
                } else {
                    resolve(rows);  
                }
            });
        });

        if (rows.length > 0) {
            res.status(200).json({ message: 'count corretta', rows });
        } else if (rows.length <= 0) {
            res.status(404).json({ message: 'not found' });
        }

    } catch (err) {
        console.error(err);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
});
 


/**
 * Deletes all rows from the votes table
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.delete('/api/voti/delete', async (req, res) => {

    try{
        const rows = await new Promise((resolve, reject) => {
            connection.query('DELETE * FROM voti', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if(rows.length > 0) {
            res.status(200).json({ message: 'voti eliminati correttamente!' });
        } else if (res.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }

    } catch (err){
        console.error(err);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
})

//date

/**
 * Returns a list of all dates in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('api/date', async (req, res) => {

    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM seleziona_date', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

    } catch (err) {
        console.error('Error fetching votes:', err);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    }

});


/* SELECT d.date, COUNT(*) AS voti
FROM seleziona_date d
GROUP BY d.date
HAVING COUNT(*) = (
    SELECT MAX(cnt)
    FROM (
        SELECT COUNT(*) AS cnt
        FROM seleziona_date
        GROUP BY date
    ) AS counts
) */


app.get('/api/date/deciding', async (req, res) => {

    try{

        const rows = await new Promise ((resolve, reject) => {
            connection.query('SELECT d.date, COUNT(*) AS voti FROM seleziona_date d GROUP BY d.date HAVING COUNT(*) = (SELECT MAX(cnt) FROM ( SELECT COUNT(*) AS cnt FROM seleziona_date GROUP BY date) AS counts)', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });

        if(rows.length > 0) {
            res.status(200).json({ message: 'voti maxvoti!', rows });
        } else if (res.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }

    }catch (err) {
        console.error(err);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
})

/**
 * Adds a new vote to the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.post('/api/date/add', async (req, res) => {
    const { id_Utente, id_Evento, date } = req.body;
    console.log(req.body.date);
    try {
        const del = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM seleziona_date WHERE id_Utente = ?', [req.session.user.id_Utente], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const insertValues = date.map(date => [id_Utente, id_Evento, date]);



        /* const insertValues = date.map(date => {
            const nextDay = addDays(new Date(date), 1); // Aggiungi un giorno a ciascuna data
            return [id_Utente, id_Evento, nextDay];
        }); */


        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO seleziona_date (id_Utente, id_Evento, date) VALUES ?', [insertValues], (err, resp) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            }); 
        });

        if(result.affectedRows > 0) {
            res.status(200).json({ message: 'Dati inseriti correttamente!' });
        } else {
            res.status(404).json({ error: 'Non inserito' });
        }

    } catch (err) {
        console.error('Errore durante l\'aggiunta delle date:', err);
        if (err.statusCode === 500) {
            res.status(500).json({ error: 'Errore del server' });
        } else if (err.statusCode === 400) {
            res.status(400).json({ error: 'Richiesta non valida' });
        } else {
            res.status(500).json({ error: 'Errore sconosciuto' });
        }
    }
});


/**
 * Returns a list of all dates for a specific user in the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/date/:id', async (req, res) => {
    const userid= req.params.id;
    
    try{
        const rows = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM seleziona_date WHERE id_Utente = ?', [userid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        
        let response = []
        Object.values(rows).forEach(row => {response.push(row.date)})

        if(rows.length > 0) {
            res.status(200).json({ message: 'voti del utente ' + userid, date : response });
        }else if (rows.length <= 0) {
            res.status(404).json({ error: 'Not Found' });
        }

    }catch(err){
        console.error(err);
        if (res.statusCode === 500) {
            res.status(500).json({ error: 'Server Error' });
        } else if (res.statusCode === 400) {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
})





  
/**
 * Starts the server and listens for incoming requests
 */
app.listen(port, () => {
    /**
   * Logs a message to the console indicating that the server is running on the specified port
   * @param {number} port - The port on which the server is listening
   */
    console.log(`Server is running on port ${port}`)
});