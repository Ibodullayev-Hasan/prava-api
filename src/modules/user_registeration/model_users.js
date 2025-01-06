const { Schema, Types, model } = require("mongoose");

// Schema
const users_table_schema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    prava_category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categorys",
      },
    ],
    role: {
      type: String,
    },
  },
  { collection: "users_table" }
);

module.exports = model("SiteUsers", users_table_schema);
