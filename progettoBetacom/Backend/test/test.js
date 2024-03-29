const axios = require('axios');
const assert = require('assert');


const API_URL = "http://localhost:3000";




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
        username: 'invalid_username',
        password: 'invalid_password'
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

  it('should return a 500 error if there is an internal server error', async () => {
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
  });

});

describe('GET /api/eventi', () => {
  it('should return a list of events', async () => {
    try {
      const response = await axios.get(`${API_URL}/api/eventi`);
      assert.strictEqual(response.status, 200);
      assert.ok(Array.isArray(response.data)); 
    } catch (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
  });
});


