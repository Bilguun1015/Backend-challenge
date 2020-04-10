const Users = require('./users-model.js');
const db = require('../database/db-config.js');

describe('users model', () => {
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('find', () => {
        it('should find all the users', async () => {
            const saved = await db('users');
            const find = await Users.find()
            expect(find).toHaveLength(saved.length);
        })
        it('Testing users table seed data', async () => {
            const firstUser = await db('users').where({id : 1}).first();
            const middleUser = await db('users').where({id : 25}).first();
            const lastUser = await db('users').where({id:50}).first();
            expect(firstUser['name']).toBe('John Justice Wheeler');
            expect(middleUser['created_at']).toStrictEqual("2017-11-21 00:40:16.025961")
            expect(lastUser['github_username']).toHaveLength(0);
        })
        it('findById from users model', async () => {
            const middleUser = await db('users').where({id : 25}).first();
            const findById = await Users.findById(25);
            expect(middleUser).toStrictEqual(findById)
        })
    })
})