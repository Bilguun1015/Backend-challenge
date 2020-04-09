
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('email').notNullable().unique();
        tbl.string('name').notNullable();
        tbl.string('github_username');
        tbl.timestamp('registered_at').defaultTo(knex.fn.now());
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
        tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};
