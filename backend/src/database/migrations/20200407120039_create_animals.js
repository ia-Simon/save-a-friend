exports.up = function(knex) {
    return knex.schema.createTable('animals', table => {
        table.string('id').primary();

        table.string('name').notNullable();
        table.string('breed').notNullable();
        table.string('description').notNullable();

        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('animals');
};
