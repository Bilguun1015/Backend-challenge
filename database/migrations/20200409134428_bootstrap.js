
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
    .createTable('posts', tbl => {
      tbl.increments();
      tbl.text('title').notNullable();
      tbl.text('body').notNullable();
      tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      tbl.timestamp('posted_at').defaultTo(knex.fn.now());
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('comments', tbl => {
      tbl.increments();
      tbl.text('message').notNullable;
      tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      tbl.integer('post_id').unsigned().notNullable().references('id').inTable('posts');
      tbl.timestamp('commented_at').defaultTo(knex.fn.now());
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('ratings', tbl => {
      tbl.increments();
      tbl.integer('rating');
      tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      tbl.integer('rater_id').unsigned().notNullable().references('id').inTable('users');
      tbl.timestamp('rated_at').defaultTo(knex.fn.now());
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('ratings')
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
