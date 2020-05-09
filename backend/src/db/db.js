const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/user", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})