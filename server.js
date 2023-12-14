const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const UserRoutes = require('./routes/userRoutes.js');

const app = express();

const sequelize = require('./databaseConfig/db.js');
// Creating all the tables defined in user
sequelize.sync();

//sequelize.sync({force:true})

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(express.json());
app.use(cors());

const port = 5000;

app.get('/test', (req, res, next) => {
  res.json({
    success: true,
    message: 'Posted successfully ',
  });
});

app.use('/api', UserRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
