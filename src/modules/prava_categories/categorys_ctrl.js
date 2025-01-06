const categorys_table = require(`./categorys_model`);

// get user
const get_category = async (req, res) => {
  try {
    let category = await categorys_table.find();

    res.send({
      message: "Prava categorys",
      success: true,
      data_category: category,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// create category
const create_category = async (req, res) => {
  try {
    let { category_name } = req.body;

    const exists_category = await categorys_table.findOne({ category_name });
    if (exists_category) {
      return res.status(403).send({
        success: false,
        message: "Bu kategoriya avval qo'shilgan, boshqa nom kiriting",
      });
    }

    if (category_name.charCodeAt(32) || category_name == "") {
      return res.send({
        success: false,
        message: "category_name maydoni bo'sh bo'lishi mumkin emas",
      });
    }

    let user = await categorys_table.create({ category_name });

    res.send({
      success: true,
      message: "muvaffaqiyatli yaratildi",
      data: user,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message,
    });
  }
};

// update category

const update = async (req, res) => {
  try {
    const { category_name } = req.body;
    const { id } = req.params;

    // category_name = ""
    if (category_name.charCodeAt() == 32 ) {
      return res.send({
        success: false,
        message: "category_name maydoni bo'sh bo'lishi mumkin emas",
      });
    }

    const update_category = await categorys_table.findById(id);
    const exist_category_name = await categorys_table.findOne({
      category_name,
    });

    if (update_category) {
      if (!exist_category_name) {
        update_category.category_name = category_name;
        await update_category.save();

        res.send({
          success: true,
          message: "Successfully updated",
          data: update_category,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Siz hozirgina bu nom bilan update qildingiz!",
        });
      }
    } else {
      res.status(404).send({
        success: false,
        message: "Siz mavjud bo'lmagan id ni update qilmoqchisiz",
      });
    }
  } catch (error) {
    res.status(error.status || 403).send({
      success: false,
      message: error.message,
    });
  }
};

// delete
const delete_category = async (req, res) => {
  try {
    const { id } = req.params;

    const delete_category = await categorys_table.findById(id);

    if (delete_category) {
      await categorys_table.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category deleted successfully",
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
  get_category,
  create_category,
  update,
  delete_category,
};
