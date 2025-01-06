const { Schema, model, Types } = require("mongoose");

// Schema
const exam_user = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    questionId: [
      {
        type: Types.ObjectId,
        ref: "questions",
      },
    ],
    My_answer: [
      {
        type: String,
      },
    ],
  },
  { collection: "exam_table" }
);

module.exports = model("exam", exam_user);
