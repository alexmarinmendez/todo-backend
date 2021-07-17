const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

// Middlewares
app.use(express.json());

// Routes
app.use('/api/todos', require('./routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});