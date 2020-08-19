const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/server');
const app = require('../index');

const fixtures = require('./fixtures');

process.env.NODE_ENV = 'test';

describe('CRUD todos', () => {
    before((done) => {
        // run migrations
        knex.migrate.rollback(process.env.NODE_ENV)
        .then(() => {
            return knex.migrate.latest(process.env.NODE_ENV)
        })
        .then(() => {
            // run seeds
            return knex.seed.run();
        }).then(() => done());
    });
    
    it('Lists all records', (done) => {
        request(app)
            .get('/todos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                expect(response.body).to.deep.equal(fixtures.todos);
                done();
            }).catch(done);
    });

    it('Show one record by id', (done) => {
        request(app)
            .get('/todos/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.todos[0]);
                done();
            }).catch(done);
    });

    it('Show one record by id', (done) => {
        request(app)
        .get('/todos/5')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal(fixtures.todos[4]);
            done();
        }).catch(done);
    });

    it('Creates a record', (done) => {
        request(app)
            .post('/todos')
            .send(fixtures.todo)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                fixtures.todo = response.body;
                expect(response.body).to.be.deep.equal(fixtures.todo);
                done();
            });
    });

    it('Updates a record', (done) => {
        fixtures.todo = {task: "Phasellus tincidunt eleifend tellus in porta.",completed: 1,participants: "Lee,Penelope,Fletcher"};
        request(app)
            .put('/todos/11')
            .send(fixtures.todo)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.todo = response.body;
                expect(response.body).to.be.deep.equal(fixtures.todo);
                done();
            });
    });
    
    it('Updates a record', (done) => {
        fixtures.todo = {task: "qui ullam ratione quibusdam voluptatem quia omnis",completed: 1,participants: "Thomas,Charles"};
        request(app)
            .put('/todos/6')
            .send(fixtures.todo)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.todo = response.body;
                expect(response.body).to.be.deep.equal(fixtures.todo);
                done();
            });
    });

    it('Deletes a record', (done) => {
        request(app)
            .delete('/todos/5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal({deleted: true});
                done();
            });
    });
    it('Deletes a record', (done) => {
        request(app)
            .delete('/todos/10')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal({deleted: true});
                done();
            });
    });
});