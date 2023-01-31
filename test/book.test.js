const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;


const request = require('supertest');
const app = require('../App');

describe('GET /books', function () {
    it('return list of books', function (done) {
        request(app)
            .get('/books/all')
            .expect(200)
            .expect((res)=>{
                console.log('The book list'+JSON.stringify(res.body));
            }).end(done);
    });
});
