exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.string('id').primary();

        
    });
};

exports.down = function(knex) {
  
};
