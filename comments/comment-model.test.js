const db = require('../database/db-config.js');
const Comments = require('./comments-model.js');


describe('posts model', () => {
    // beforeEach(async () => {
    //     await db('posts').truncate();
    // });
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('comment', () => {
        it('should return comments by post id', async () => {
            const comments = await Comments.findByPostId(3);
            expect(comments).toHaveLength(3)
        });

        it('should return added comment and delete it', async () => {
            const newComment = await Comments.add(1,1,'It is a test message!');
            expect(newComment['message']).toStrictEqual('It is a test message!');
            const delComment = await Comments.remove(newComment['id']);
            expect(delComment).toEqual(1)
        });
    });
});