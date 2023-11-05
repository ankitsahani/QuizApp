import { Router } from "express";
const router = Router();
/*import controllers*/
import * as controller from "../controllers/controller.js";

/**question routes api **/
router.route('/questions')
    .get(controller.getQuestions)
    .post(controller.insertQuestion)
    .delete(controller.deleteQuestion);

/**result routes api **/
router.route('/results')
    .get(controller.getResults)
    .post(controller.insertResult)
    .delete(controller.deleteResult);

export default router;