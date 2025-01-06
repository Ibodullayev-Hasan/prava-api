const answers = require("./answer_model");

// get
const get_answers = async (req, res) => {
  try {
    let all_answers = await answers.find().populate("questionId");

    res.send({
      success: true,
      message: "Test javoblari",
      data_answers: all_answers,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

// get id
const get_answers_byId = async (req, res) => {
  try {
    let { id } = req.params;
    let answer_byid = await answers.findById(id).populate("questionId");

    res.send({
      success: true,
      data_answers: answer_byid,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

// creat
const creat_answers = async (req, res) => {
  try {
    let { questionId, answer } = req.body;

    // check space
    if (questionId.charCodeAt() == 32) {
      return res.send({
        success: false,
        message: " Bo'sh maydon bo'lishi mumkin emas",
      });
    }

    const check_answers_name = await answers.findOne({ answer, questionId });

    // exists answers
    if (check_answers_name) {
      return res.status(404).send({
        success: false,
        message: "Bu javob mavjud",
      });
    }

    let data_answers = await answers.create({
      questionId,
      answer,
    });
    res.send({
      success: true,
      message: "Successfully created answer",
      data: data_answers,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

// update
const update_answer = async (req, res) => {
  try {
    let { answer } = req.body;
    const { id } = req.params;

    const update_answer = await answers.findById(id);
    if (!update_answer) {
      return res.status(404).send({
        success: false,
        message: "Siz mavjud bo'lmagan id ni update qilmoqchisiz",
      });
    }

    update_answer.answer = answer;
    await update_answer.save();

    res.send({
      success: true,
      message: "Successfully updated",
      data: update_answer,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

// delete
const delete_answer = async (req, res) => {
  try {
    const { id } = req.params;

    const delete_answer = await answers.findById(id);

    if (delete_answer) {
      await answers.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "answer deleted successfully",
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Mavjud bo'lmagan id ni delete qila olmaysiz",
      });
    }
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  get_answers,
  get_answers_byId,
  creat_answers,
  update_answer,
  delete_answer,
};
