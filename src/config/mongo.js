const { default: mongoose } = require("mongoose")

const mongo = async() => {
    return mongoose.connect("mongodb://localhost:27017/2-dars")
}

module.exports = mongo