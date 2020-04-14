const Timeline = require('./timeline-model.js');
const db = require('../database/db-config.js');

describe('posts model', () => {
    // beforeEach(async () => {
    //     await db('posts').truncate();
    // });
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('GET', () => {
        it("should return average of a user's rating", async () => {
            const avgRating = await Timeline.findUserRating(5).first();
            console.log(avgRating);
        })
        it("should return data for user's timeline activities", async () => {
            const data = await Timeline.finalQuery(1);
            console.log(data)
        })
    });
});