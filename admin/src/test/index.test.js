const request = require('supertest');
const server = require('../index');

beforeAll((done) => {
  done()
})

afterAll((done) => {
  server.close()
  done()
})


describe('Test API requests', () => {
    it('Test Get investments by id', (done) => {
      const expectedResponse = [
        {
          "id": "3",
          "userId": "1",
          "firstName": "Billy",
          "lastName": "Bob",
          "investmentTotal": 1300,
          "date": "2020-02-01",
          "holdings": [
            {
              "id": "2",
              "investmentPercentage": 1
            }
          ]
        }
      ]
        request(server)
        .get('/admin/investments/3')
        .expect(200)
        .end((err, res) => {
            expect(res.body).toEqual(expectedResponse)
            console.log("get error", err)
            done();
        })
    })
    it('Test post CSV Report To Export Route', (done) => {
        request(server)
        .post('/admin/users/report')
        .expect(200)
        .end((err, res) => {
            console.log("post error", err)
            done();
        })
    })
  })