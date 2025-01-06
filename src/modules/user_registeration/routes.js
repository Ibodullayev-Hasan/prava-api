const {Router} = require(`express`)
const { get_registered_user, create_user, exam_post } = require("./users_ctrl")

const register_rout = Router()

register_rout.get("/get", get_registered_user)
register_rout.post("/register", create_user)
register_rout.post("/exam", exam_post)

module.exports = register_rout