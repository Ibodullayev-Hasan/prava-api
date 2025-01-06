const { Schema, model } = require("mongoose");

// Schema
const category_table_schema = new Schema({
    category_name:{
        type: String,
        required: true
    }
    
},
    {collection: "category_table"}

)

module.exports = model("Categorys", category_table_schema)