const { Router } = require('express');
const router = Router();
const todos = require('../data.json');

router.get('/', (req, res) => {
    res.json(todos);
});

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

// Update an item
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