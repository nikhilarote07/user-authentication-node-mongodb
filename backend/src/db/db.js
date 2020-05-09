const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true
})