
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', (table) => {
      table.increments();
      table.text('task');
      table.text('participants')
      table.specificType('completed', 'TINYINT');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};
