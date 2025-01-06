const {Router} = require(`express`)
const register_rout = require("../modules/user_registeration/routes")
const category_rout = require("../modules/prava_categories/routes")
const questionRouter = require("../modules/questions/rout")
const answerRouter = require("../modules/answers/rout")
const rout = Router()

rout.use("/user", register_rout)
rout.use("/categories", category_rout)
rout.use("/questions", questionRouter)
rout.use("/answers", answerRouter)
module.exports = rout