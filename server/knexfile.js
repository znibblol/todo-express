// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'hejsan123',
      database: 'todo_express'
    },
    test: {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'hejsan123',
        database: 'test_todo_express'
      }
    }
  },
};
