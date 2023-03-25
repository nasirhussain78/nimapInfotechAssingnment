import express from 'express';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import route from './routes/routes.js'
import dotenv from 'dotenv';
const app = express();


dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const sequelize = new Sequelize('nimap', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
  });


// Sync the models with the database
sequelize.sync().then(() => {
  console.log('Database synced');
});

// Define the route for creating a new user
app.use('/', route);


// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});