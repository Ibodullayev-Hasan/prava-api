const { Router } = require(`express`);
const verify_token = require("../../middlewares/verifyToken");
const verifyRole = require("../../middlewares/verify_role");
const { get_answers, creat_answers, update_answer, delete_answer, get_answers_byId } = require("./answer_ctrl");

const answerRouter = Router();

answerRouter.get("/get_all", verify_token(), verifyRole("admin"), get_answers);
answerRouter.get("/get_byId/:id", verify_token(), verifyRole("admin"), get_answers_byId);
answerRouter.post("/creat_answers",  verify_token(), verifyRole("admin"), creat_answers) ;
answerRouter.put("/update/:id", verify_token(), verifyRole("admin"),update_answer);
answerRouter.delete("/delete/:id", verify_token(), verifyRole("admin"),delete_answer);

module.exports = answerRouter;
