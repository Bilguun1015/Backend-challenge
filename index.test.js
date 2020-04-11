const request = require('supertest');
const app = require('./posts/posts-router.js');

describe('POST /add a post', () => {
    // it('should return port', async () => {
    //     const res = await request
    // })

    it('should create a new post', () => {
        request(app)
            .post('/add')
            .type('json')
            .send({
                user_id:100,
                title: 'One fish two fish',
                body: 'No!!!!!!!!'
            })
            .set('Content-Type','application/json')
            .expect(111000)
            .end(function(err, res) {
                if (err) return done(err);
                done();
      });
    });
});