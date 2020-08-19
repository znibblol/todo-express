const express = require('express');
const router = express.Router();
const query = require('../db/models/queries');
const queries = require('../db/models/queries');

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

function validTodo(todo) {
    const hasTask = typeof todo.body.task == 'string' && todo.body.task.trim() != '';
    const hasParticipants = typeof todo.body.participants == 'string' && todo.body.participants.trim() != '';
    const hasCompleted = !isNaN(todo.body.completed);
    return hasTask && hasParticipants && hasCompleted;
}


router.get('/', (req, res) => {
    query.getAll().then(todos => {
        res.json(todos);
    });
});

router.get('/:id', isValidId, (req, res, next) => {
    query.getOne(req.params.id).then(todo => {
        if(todo) {
            res.json(todo);
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    if(validTodo(req)) {
        queries.create(req.body).then(todo => {
            res.json(todo);
        });
    } else {
        next(new Error('Invalid todo'));
    }
});

router.put('/:id', isValidId, (req, res, next) => {
    if(validTodo(req)) {
        queries.update(req.params.id, req.body).then(todo => {
            if(todo == 1) {
                res.json({message: 'Record updated', status: 200})
            }
            // res.json(todo);
        });
    } else {
        next(new Error('Invalid todo'));
    }
});

router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id).then(() => {
        res.json({deleted: true});
    });
});

module.exports = router;