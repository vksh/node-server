const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/user-info.route'); // Imports routes for the products
const app = express();
var delay = require('express-delay');
const MongoClient = require('mongodb').MongoClient;
let db_url = 'mongodb+srv://vkshkr:74258Vksh@cluster0-edd37.mongodb.net/test?retryWrites=true';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(delay(1000));
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
const PORT = process.env.PORT || 5000;

MongoClient.connect(db_url, { useNewUrlParser: true })
    .then(client => {
        const db = client.db('user');
        const collection = db.collection('userDetails');
        app.locals.collection = collection;
        app.listen(PORT, () => console.info(`REST API running on PORT ${PORT}`));
    }).catch(error => console.error(error));