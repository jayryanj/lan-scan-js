const express = require('express');
const controller = require('./server/controller');
const port = require('./config/config').port;
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Pass API calls to the controller
app.use('/api/', controller);

// Serve static React build at *



app.listen(port, () => console.log(`Listening on port: ${port}`));

