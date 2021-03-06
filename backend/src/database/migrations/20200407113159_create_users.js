exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.string('id').primary();

        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();

        table.string('whatsapp');
        table.date('birthday');
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
