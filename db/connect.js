const mongoose = require('mongoose')

const connectionString = ''

const connectDB = (url) => {
    return mongoose
            .connect(url, {
                tls: true,
            })
}

module.exports = connectDB;

