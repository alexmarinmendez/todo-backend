const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);
const config = {
  application: {
      cors: {
          server: [
              {
                  origin: "localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                  credentials: true
              }
          ]
      }
  }
};

// Middlewares
app.use(cors(
    config.application.cors.server
  ));
app.use(express.json());

// Routes
app.use('/api/todos', require('./routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});