const axios = require('axios');
const assert = require('assert');
const server = require('../serverProgetto.js')

const API_URL = "http://localhost:3000";




//login done

describe('POST /api/login', () => {
  it('should authenticate a user and return a token with valid credentials', async () => {
    try {
      const credentials = {
        email: 's.maffiodo@betacom.it',
        password: 'Sandro'
      };

      const response = await axios.post(`${API_URL}/api/login`, credentials);
      
      assert.strictEqual(response.status, 200);
      assert.ok(response.data.token); 
    } catch (error) {
      throw new Error(`Error authenticating user: ${error.message}`);
    }
  });

  it('should return a 401 error with invalid credentials', async () => {
    try {
      const credentials = {
        email: 'asdsads',
        password: 'asdasdasdasdasd'
      };

      await axios.post(`${API_URL}/api/login`, credentials);
      throw new Error('Expected request to fail with 401 error');
    } catch (error) {
      assert.strictEqual(error.response.status, 401);
    }
  });

  it('should return a 400 error if credentials are missing', async () => {
    try {
      await axios.post(`${API_URL}/api/login`);
      throw new Error('Expected request to fail with 400 error');
    } catch (error) {
      assert.strictEqual(error.response.status, 400);
    }
  });

  /* it('should return a 500 error if there is an internal server error', async () => {
    try {
      const credentials = {
        email: 's.maffiodo@betacom.it',
        password: 'Sandro',
      };

      await axios.post(`${API_URL}/api/login`, credentials);
      throw new Error('Expected request to fail with 500 error');
    } catch (error) {
      assert.strictEqual(error.response.status, 500);
    }
  }); */

});




//GET eventi done

describe('GET /api/eventi', () => {
  
  let AuthToken;

  before(async () => {
    try{
      const credentials = {
        email: 's.maffiodo@betacom.it',
        password: 'Sandro'
      };

      const response = await axios.post(`${API_URL}/api/login`, credentials);
      AuthToken = response.data.token;
    }catch (ERR) {
      console.log(ERR);
    }
  });


  it('should return a list of events', async () => {
    try {
      if (!AuthToken) {
        throw new Error('Authentication token not found');
      }
      const response = await axios.get(`${API_URL}/api/eventi`, {
        headers: {
          Authorization: `${AuthToken}`
        }
      });
      assert.strictEqual(response.status, 200);
      assert.ok(Array.isArray(response.data)); 
    } catch (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
  });


  it('should return a 401 error if not authenticated', async () => {
    try{
      const response = await axios.get(`${API_URL}/api/eventi`);
      throw new Error(`Expected request to fail with 401 error`);
    } catch (error) {
      assert.strictEqual(error.response.status, 401);
    }
  })
});



//GET eventi by id

describe('GET /api/eventi/:id', () => {
  let AuthToken;

  before(async () => {
    try{
      const credentials = {
        email: 's.maffiodo@betacom.it',
        password: 'Sandro'
      };

      const response = await axios.post(`${API_URL}/api/login`, credentials);
      AuthToken = response.data.token;
    }catch (ERR) {
      console.log(ERR);
    }
  });


  it('should return an event', async () => {
    try{
        if (!AuthToken) {
        throw new Error('Authentication token not found');
      }
      const response = await axios.get(`${API_URL}/api/eventi/36`, {
        headers: {
          Authorization: `${AuthToken}`
        }
      });
      assert.strictEqual(response.status, 200);
      assert.ok(response.data);
    } catch (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
  });

  it('should return a 401 error if not authenticated', async () => {
    try{
      const response = await axios.get(`${API_URL}/api/eventi/36`);
      throw new Error(`Expected request to fail with 401 error`);
    } catch (error) {
      assert.strictEqual(error.response.status, 401);
    }
  });
});


//lifecycle of an event done


describe('POST /api/eventi/add', () => {

  let AuthToken;
  let id;

  before(async () => {
    try{
      const credentials = {
        email: 's.maffiodo@betacom.it',
        password: 'Sandro'
      };

      const response = await axios.post(`${API_URL}/api/login`, credentials);
      AuthToken = response.data.token;
    }catch (ERR) {
      console.log(ERR);
    }
  });

  it('should add a new event', async () => {
    
    try {
      
      if (!AuthToken) {
        throw new Error('Authentication token not found');
      }
      
      
      const newevent = {
        titolo: "padel",
        data: "",
        descrizione: "gioco innovativo",
        luogo: "https://www.google.com/maps/place/Padelife+Settimo+Cielo/@45.142005,7.7335492,17z/data=!3m1!4b1!4m6!3m5!1s0x478871958011fdb9:0x1b57f1624344e251!8m2!3d45.142005!4d7.7335492!16s%2Fg%2F11l5k12dl6?hl=it&entry=ttu",
        immagine_evento: "https://www.sporteimpianti.it/wp-content/uploads/2023/11/Favaretti-Settimo-copertina.jpg",
      };
      
      const response = await axios.post(`${API_URL}/api/eventi/add`, newevent, {
        headers: {
          Authorization: `${AuthToken}`
        }
      });
      
      assert.strictEqual(response.status, 200);
      assert.ok(response.data);
      
      id = response.data.id_Evento;
      
    } catch (error) {
      throw new Error(`Error authenticating user: ${error.message}`);
    }
  });
  
  it('should return a 401 error if not authenticated', async () => {
    try{
      const response = await axios.get(`${API_URL}/api/eventi`);
      throw new Error(`Expected request to fail with 401 error`);
    } catch (error) {
      assert.strictEqual(error.response.status, 401);
    }
  });
  
  it('should return the same event added previuosly by his id', async () => {
    if(!AuthToken){
      throw new Error('Authentication token not found');
    }
    try{
      const response = await axios.get(`${API_URL}/api/eventi/${id}`, {
        headers: {
          Authorization: `${AuthToken}`
        }
      });
      assert.strictEqual(response.status, 200);
      assert.ok(response.data);
    } catch (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
  });

  it('should return a delete of the element added previuosly by his id', async () => {
    try{
      const response = await axios.delete(`${API_URL}/api/eventi/delete/${id}`, {
        headers: {
          Authorization: `${AuthToken}`
        }
      });
      assert.strictEqual(response.status, 200);
      assert.ok(response.data);
    } catch (error) {
      throw new Error(`Error deleting event: ${error.message}`);
    }
  });



});

/* describe('DELETE /api/eventi/delete/:id', () => {
  let AuthToken;

  before(async () => {
    try{
      const credentials = {
        email: 's.maffiodo@betacom.it',
        password: 'Sandro'
      };

      const response = await axios.post(`${API_URL}/api/login`, credentials);
      AuthToken = response.data.token;
    }catch (ERR) {
      console.log(ERR);
    }
  });

  it('should delete an event', async () => {
    try{

    } catch (error) {
      
    }
  });
}); */
