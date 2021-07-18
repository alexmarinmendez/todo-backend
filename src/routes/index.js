const { Router } = require('express');
const router = Router();
// The data in a JSON File
const todos = require('../data.json');

// GET all TODO's in the database
// GET localhost:400/api/todos
router.get('/', (req, res) => {
    res.json(todos);
});

// GET only one TODO
// for example: GET localhost:4000/api/todos/1
// If the TODO required is not found, this returns an empty array
router.get('/:id', (req, res) => {
    var newTodos = todos.filter(todo => todo.id === parseInt(req.params.id));
    res.json(newTodos);
});

// POST a new TODO
// POST localhost:4000/api/todos
// Sending an object with the format {title, place, status} is required
router.post('/', (req, res) => {
    const { title, place, status } = req.body;
    if (title && place && status) {
        const id = (todos.length === 0) ? 1 : todos[todos.length-1].id + 1;
        const newTodo = {id, ...req.body};
        todos.push(newTodo);
        res.json(todos);
    } else {
        res.status(500).json({
            error: "There was an error"
        });
    }
});

// DELETE an specific TODO
// for example: DELETE localhost:4000/api/todos/1
router.delete('/:id', (req, res) => {
    let indexToDelete;
    todos.forEach((todo, index) => {
        if (todo.id === parseInt(req.params.id)) {
            indexToDelete = index;
        }
    });
    if (indexToDelete !== undefined) {
        todos.splice(indexToDelete, 1);
        res.json(todos);
    } else {
        res.status(500).json({
            error: "There was an error"
        });        
    }
});

// UPDATE an specific TODO
// for example: UPDATE localhost:4000/api/todos/1
// Sending an object with the format {title, place, status} is required
router.put('/:id', (req, res) => {
    const { title, place, status } = req.body;
    let indexToUpdate;
    if (req.params.id && title && place && status) {
        todos.forEach((todo, index) => {
            if (todo.id === parseInt(req.params.id)) {
                todo.title = title;
                todo.place = place;
                todo.status = status;
                indexToUpdate = index;
            }
        });
        if (indexToUpdate !== undefined) {
            res.json(todos);
        } else {
            res.status(500).json({
                error: 'Movie not found'
            });            
        }
    } else {
        res.status(500).json({
            error: 'There was an error.'
        });
    }
});

module.exports = router;