const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(path.join(__dirname, 'public')));

const HBS = exphbs.create({
    helpers: {
        arraySize: (arrayObject) => {
            return Object.keys(arrayObject).length + 1;
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    extname: ".hbs"
});

app.set('view engine', '.hbs');
app.engine('.hbs', HBS.engine);

const dbConString = process.env.CONN_STRING;


// Initializing Connection
db.initializing(dbConString).then((res) => {
    console.log("Database connection successfully!!");
}).catch((error) => {
    console.log(error)
})


app.get('/api/restaurants', async (req, res) => {
    try {
        let query = req.query;
        let result = await db.getAllRestaurants(query.page, query.perPage, query.borough);
            console.log(result)
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Result Not Found!!");

        }
    }
    catch (error) {
        res.status(401).send(error.message);
    }
});


app.get('/api/restaurants/:_id', async (req, res) => {
    try {
        let id = req.params._id;

        let result = await db.getRestaurantById(id);
        res.status(200).send(result);
    } catch (error) {
        res.status(401).send(error.message);
    }
});



app.post('/api/restaurants', async (req, res) => {
    try {
        let newRestaurantObject = {
            address: req.body.address,
            borough: req.body.borough,
            cuisine: req.body.cuisine,
            grades: req.body.grades,
            name: req.body.name,
            restaurant_id: req.body.restaurant_id
        }
        let result = await db.addNewRestaurant(newRestaurantObject);

        if (result) {
            res.status(200).send("Restaurant Added!")
        } else {
            res.status(401).send("Ooops Error!!")
        }
    }
    catch (error) {
        res.status(401).send(error.message);
    }

});

app.put('/api/restaurants/:_id', async (req, res) => {
    try {
        let id = req.params._id;
        let restaurantUpdatedData = {
            address: req.body.address,
            borough: req.body.borough,
            cuisine: req.body.cuisine,
            grades: req.body.grades,
            name: req.body.name,
            restaurant_id: req.body.restaurant_id
        }

        let result = await db.updateRestaurantById(restaurantUpdatedData, id);
        res.status(200).send(result);
    } catch (error) {
        res.status(401).send(error.message);
    }

});

app.delete('/api/restaurants/:_id', async (req, res) => {
    try {
        let id = req.params._id;
        let result = await db.deleteRestaurantById(id);

        if (result.deletedCount) {
            res.status(200).send("Restaurant Deleted!")
        } else {
            res.status(401).send("Restaurant Not Found!!")
        }
    }
    catch (error) {
        res.status(401).send(error.message);
    }
});

app.listen(port,()=>{
    console.log("App listening on port : " + port);
});
