const express = require('express');
const routes = require('../routes/routes');
const testRoutes = require('../tests/routes');

const server = express();

server.use(express.json());
server.use(routes);
server.use(testRoutes);

server.listen(3000);
