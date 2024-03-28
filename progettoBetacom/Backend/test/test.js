/* var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
}); */
let axios = require('axios');

let assert = require('assert');

const API_URL = "http://localhost:3000";


describe('API testing', () => {
    it('should be eventi', async ()=> {
        try{

            const response = await axios.get(`${API_URL}/api/eventi`);
        } catch (err) {
            console.log(err);
            assert.equal(err.response.status , 401);
        }
    })
})

