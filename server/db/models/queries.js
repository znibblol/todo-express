const knex = require('../server'); // The connection!
const { update } = require('../server');

module.exports = {
    getAll() {
        return knex('todos');
    },
    getOne(id) {
        return knex('todos').where('id', id).first();
    },
    create(todo) {
        return knex('todos').insert(todo);
    },
    update(id, todo) {
        return knex('todos').where('id', id).update(todo);
    },
    delete(id) {
        return knex('todos').where('id', id).del();
    }
}