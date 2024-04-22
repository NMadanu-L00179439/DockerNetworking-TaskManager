const mongoose = require('mongoose')

const connectionString = ''

const connectDB = (url) => {
    return mongoose
            .connect(url, {
                ssl: false,
            })
}

module.exports = connectDB;

