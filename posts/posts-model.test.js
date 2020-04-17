const Posts = require('./posts-model.js');
const db = require('../database/db-config.js');

describe('posts model', () => {
    beforeEach(async () => {
        await db('posts').truncate();
    });
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('find', () => {
        it('should find all the posts', async () => {
            const saved = await db('posts');
            const find = await Posts.find()
            expect(saved).toHaveLength(find.length);
        })
        it('should find posts by user_id', async () => {
            // let user_id = Math.floor((Math.random() * 50) + 1)
            let user_id = 50
            const posts = await db('posts').where({user_id})
            const postsSame = await Posts.findByUserId(user_id)
            expect(posts).toStrictEqual(postsSame)
        })
    });
    describe('add', () => {
        it('should add a new post to the database', async () => {
            const body = {title: 'This is a test', body: 'It is a great day. Go hiking!', user_id:50};
            const [newPost] = await Posts.add(body.user_id, body.title, body.body);
            const posts = await db('posts');
            const next_id = posts.length;
            expect(newPost['id']).toEqual(next_id);
            expect(newPost['body']).toStrictEqual('It is a great day. Go hiking!')
        })
    });
});