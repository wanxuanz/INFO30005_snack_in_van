// include supertest to be able to send HTTP reuests to app
const supertest = require('supertest');
// require app
const app = require('../../app');

// if the server takes a long time to process
// DB reuests that we could wait for longer
// than the default timeout value of 5 seconds
jest.setTimeout(10000);

describe('integration - van', function() {
    describe('updateVanStatus', function() {
        test('check if we can update van status', async function() {
            // create a dummy van
            let newVan = {vanId:'Niceday', status: 'open'};

            // send a HTTP POST request th van route
            // with the dummy van
            const res = await supertest(app)
            .post('/vender/vans/home/updateVanStatus')
            .send(newVan);
            // expect server to say everything is OK
            expect(res.statusCode).toBe(200);
            // I expect the author controller to return the new author
            // object back, and I'm doing a partial match of the
            // author properties that I have as the dummy value
            // QUESTION: what's different between res.body and newAuthor
            // that requires a partial match, and what are  other
            // ways to test?

            //expect(res.body).toEqual(expect.objectContaining(newAuthor));
 })
 })
})