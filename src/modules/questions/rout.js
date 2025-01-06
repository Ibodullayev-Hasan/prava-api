const { Router } = require(`express`);
const verify_token = require("../../middlewares/verifyToken");
const verifyRole = require("../../middlewares/verify_role");
const { get_question, creat_question, update_question, delete_question } = require("./question_ctrl");

const questionRouter = Router();

questionRouter.get("/get_all", get_question);
questionRouter.post("/creat_question",  verify_token(), verifyRole("admin"), creat_question) ;
questionRouter.put("/update/:id", verify_token(), verifyRole("admin"),update_question);
questionRouter.delete("/delete/:id", verify_token(), verifyRole("admin"),delete_question);
module.exports = questionRouter;
