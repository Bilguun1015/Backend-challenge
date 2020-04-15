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
            const avgRating = await Timeline.findUserRating(1).first();
            console.log(avgRating)
        })
        it("should return data for user's timeline activities", async () => {
            const data = await Timeline.finalQuery(1,10,2);
            console.log(data)
        })
        it('should return number of comments', async () => {
            const comments = await db('comments').where({post_id: 74});
            const data = await Timeline.finalQuery(1,10,2);
            const userPosts = data['user_posts'];
            expect(userPosts[1]['post_id']).toEqual(74);
            expect(comments).toHaveLength(userPosts[1]['comments']);
        })
        it('should return the count of user posts', async () => {
            const count = await Timeline.countPosts(1)
            console.log(count)
        })
    });
});