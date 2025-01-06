const { Schema, Types, model } = require("mongoose");

const question_schema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    variant_A: {
      type: String,
      required: true,
    },
    variant_B: {
      type: String,
      required: true,
    },
  },

  { collection: "question_table" }
);

module.exports = model("questions", question_schema);
