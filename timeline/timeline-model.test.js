const Timeline = require('./timeline-model.js');
const db = require('../database/db-config.js');

describe('posts model', () => {
    // beforeEach(async () => {
    //     await db('posts').truncate();
    // });
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('get rating', () => {
        it("should find average of a user's rating", async () => {
            const avgRating = await Timeline.findUserRating(5).first();
            console.log(avgRating);
        })
    });
});