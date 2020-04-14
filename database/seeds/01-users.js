const csvFilePath = './data/users.csv';
const csv = require('csvtojson');
exports.seed = async function(knex, Promise){
    const jsonData = await csv().fromFile(csvFilePath);
    return knex('users').insert(jsonData);
};




