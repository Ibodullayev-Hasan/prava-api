const { my_sign_mtd } = require("../../utils/jwt");
const users_table = require(`./model_users`);
const category_table = require(`../prava_categories/categorys_model`);
let examUser = require("./model_exam");
const answers_table = require("../answers/answer_model");
// get user
const get_registered_user = async (req, res) => {
  try {
    let users = await users_table.find().populate("prava_category");

    res.send({
      message: "Site users",
      success: true,
      data_users: users,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// post user
const create_user = async (req, res) => {
  try {
    let { full_name, email, password, prava_category, role } = req.body;

    // avval qo'shilganmi
    const existsUser = await users_table.findOne({ email });
    if (existsUser) {
      return res.status(403).send({
        success: false,
        message: "Siz avval ro'yxatdan o'tkansiz",
      });
    }

    const find_category = await category_table.find();
    const check_category = await find_category
      .map((el) => el.toObject())
      .filter((el) => el._id == prava_category);

    if (check_category.length == 0) {
      return res.send({
        success: false,
        message: `Diqqat! Siz mavjud bo'lmagan ${prava_category} categorydagi pravaga ro'yxatdan o'tmoqchisiz.Prava categorylari jadvalini qarab chiqing`,
      });
    }

    // agar rolega hech narsa yozmasa avtomatik user sifatida register qilish
    if (role === "" || role === " ") {
      role = "user";
      let user = await users_table.create({
        full_name,
        email,
        password,
        prava_category,
        role,
      });
      let token = my_sign_mtd({ id: user._id });

      res.send({
        success: true,
        message: "Siz registratsiyadan o'tdingiz!",
        data: user,
        token: token,
      });
      return;
    }

    // role ga istagan(w, akang, o,23,tru...) kabi narsalarni yozib tashlamaslik uchun oldini olish.
    if (role !== "admin" && role !== "user") {
      return res.send({
        success: false,
        message: `Siz registratsiyadan ${role} rolida o'ta olmaysiz! User yoki admin deb kiriting`,
      });
    }

    // siteda faqat 2 ta admin bo'lishi mumkin!

    const user_role = await users_table.find();
    const exists_user_role_admin = await user_role
      .map((el) => el.toObject())
      .filter((el) => el.role == "admin");

    if (exists_user_role_admin.length > 1) {
      return res.send({
        success: false,
        message: "Site adminlari 2 tadan ortiq bo'la olmaydi",
      });
    }

    if (exists_user_role_admin.length < 2) {
      let user = await users_table.create({
        full_name,
        email,
        password,
        prava_category,
        role,
      });
      let token = my_sign_mtd({ id: user._id });

      res.send({
        success: true,
        message: "Siz registratsiyadan o'tdingiz!",
        data: user,
        token: token,
      });
      return;
    }

    let user = await users_table.create({
      full_name,
      email,
      password,
      prava_category,
      role,
    });
    let token = my_sign_mtd({ id: user._id });

    res.send({
      success: true,
      message: "Siz registratsiyadan o'tdingiz!",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// exam post

let count = 0;
let your_result = 0;

const exam_post = async (req, res) => {
  try {
    let { userId, questionId, My_answer } = req.body;

    // Check if this is the first question for the user
    let check_question = await examUser.find({ questionId });
    console.log(check_question);
    
    if (check_question.length > 0) {
      return res.send({
        message: "Keyingi savolga o'ting",
      });
    }

    if (count == 0) {
      await examUser.deleteMany({});
    }
    if (count == 10) {
      count = 0;
      if (your_result >= 8) {
        return res.send({
          message: `imtihon tugadi ${your_result}`,
          you: `Siz imtihondan o'tdingiz! `,
        });
      }

      if (your_result <= 8) {
        return res.send({
          message: `imtihon tugadi ${your_result}`,
          you: `Afsus siz imtihondan o'ta olmadingiz! `,
        });
      }
    }

    // Create the new exam entry and populate the questionId
    let data = await examUser.create({ userId, questionId, My_answer });
    data = await data.populate("questionId");

    // Retrieve the correct answer from the answers table
    let correct_answer = await answers_table.findOne({ questionId });
    console.log(correct_answer);
    
    if (correct_answer.answer === My_answer) {
      your_result++;
    }

    // Increment the count
    count++;

    res.send({
      message: `${count} - savol`,
      data: data,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  get_registered_user,
  create_user,
  exam_post,
};
