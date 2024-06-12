const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`mongoDB connected with server : ${data.connection.host} `);
    }).catch((err) => {
        console.log(err);
    })

}
module.exports = connectDB;