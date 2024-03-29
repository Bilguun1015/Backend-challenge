const csvFilePath = './data/comments.csv';
const csv = require('csvtojson');
exports.seed = async function(knex, Promise){
    const jsonData = await csv().fromFile(csvFilePath);
    const chunkSize = 100;
    return knex.batchInsert('comments', jsonData, chunkSize)
        .then(function(ids){
            console.log(ids);
        })
        .catch(function(err) {
            console.log(err);
        });
};