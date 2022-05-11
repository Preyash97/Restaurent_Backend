const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

const initializing = (connectionString) => {
    return mongoose.connect(connectionString);
}

const addNewRestaurant = (newRestaurant) => {
    return Restaurant.create(newRestaurant);
};

const getAllRestaurants = (page, perPage, borough) => {
    let query = {};
    if (borough) {
        query.borough = borough;
    }
    return Restaurant.find(query).sort({ restaurant_id: 1 }).collation({ locale: "en_US", numericOrdering: true }).skip(perPage * page).limit(perPage);
};

const getRestaurantById = (_id) => Restaurant.findById(_id);

const updateRestaurantById = (updatedRestaurantData, _id) => Restaurant.findByIdAndUpdate(_id, updatedRestaurantData);

const deleteRestaurantById = (_id) => Restaurant.deleteOne({ _id });


module.exports = { initializing, addNewRestaurant, getAllRestaurants, getRestaurantById, updateRestaurantById, deleteRestaurantById }