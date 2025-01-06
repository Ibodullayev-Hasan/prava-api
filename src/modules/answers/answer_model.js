const { Schema, model, Types } = require("mongoose");

const answer_schema = new Schema(
  {
    questionId: {
      type: Types.ObjectId,
      ref:"questions"
    } ,
    answer: {
      type: String,
    }
  },

  { collection: "answer_table" }
);

module.exports = model("answers", answer_schema);
