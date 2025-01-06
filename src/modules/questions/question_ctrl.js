const questions = require("./qustion_model");
const user = require(`../user_registeration/model_users`);

// get
const get_question = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.send({
        success: false,
        message: "Register qilgan emailingizni kiriting!",
      });
    }

    let check_user = await user.findOne({ email }).populate("prava_category");

    if (check_user == null || check_user.length == 0) {
      return res.send({
        success: false,
        message: "Avval register qiling va register qilgan emailni kiriting!",
      });
    }
    
    let infoUser = check_user.prava_category.map((el) => el);
    let all_questions = await questions.find();

    res.send({
      success: true,
      message: "Test savollari ",
      Your_selected_prava_category: infoUser,
      Test_questions: all_questions,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

// creat
const creat_question = async (req, res) => {
  try {
    let { question, variant_A, variant_B } = req.body;

    // check space
    if (
      question.charCodeAt() == 32 ||
      variant_A.charCodeAt() == 32 ||
      variant_B.charCodeAt() == 32
    ) {
      return res.send({
        success: false,
        message: " Bo'sh maydon bo'lishi mumkin emas",
      });
    }

    const check_question_name = await questions.findOne({ question });

    // exists question
    if (check_question_name) {
      return res.status(404).send({
        success: false,
        message: "Bu savol allaqachon mavjud",
      });
    }

    let data_question = await questions.create({
      question,
      variant_A,
      variant_B,
    });
    res.send({
      success: true,
      message: "Successfully created question",
      data: data_question,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

// update
const update_question = async (req, res) => {
  try {
    let { question, variant_A, variant_B } = req.body;
    const { id } = req.params;

    // check space
    if (
      question.charCodeAt() == 32 ||
      variant_A.charCodeAt() == 32 ||
      variant_B.charCodeAt() == 32
    ) {
      return res.send({
        success: false,
        message:
          " Variant yoki savolni bo'sh maydon ko'rinishida yangilay olmaysiz mumkin emas",
      });
    }

    const update_question = await questions.findById(id);
    if (!update_question) {
      return res.status(404).send({
        success: false,
        message: "Siz mavjud bo'lmagan id ni update qilmoqchisiz",
      });
    }

    update_question.question = question;
    update_question.variant_A = variant_A;
    update_question.variant_B = variant_B;
    await update_question.save();

    res.send({
      success: true,
      message: "Successfully updated",
      data: update_question,
    });
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

// delete
const delete_question = async (req, res) => {
  try {
    const { id } = req.params;

    const delete_question = await questions.findById(id);

    if (delete_question) {
      await questions.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "question deleted successfully",
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
  get_question,
  creat_question,
  update_question,
  delete_question,
};
