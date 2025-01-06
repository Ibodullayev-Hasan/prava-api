const {Router} = require(`express`)
const { get_category, create_category, update, delete_category } = require("./categorys_ctrl")
const verify_token = require("../../middlewares/verifyToken")
const verifyRole = require("../../middlewares/verify_role")

const category_rout = Router()

category_rout.get("/get", get_category)
category_rout.post("/create", verify_token(), verifyRole("admin"), create_category)
category_rout.put("/update/:id", verify_token(), verifyRole("admin"), update)
category_rout.delete("/delete/:id", verify_token(), verifyRole("admin"), delete_category)
module.exports = category_rout