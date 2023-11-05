import Questions from "../models/questionsSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js';
/* Get All Questions*/
export async function getQuestions(req, res) {
    try {
        const q = await Questions.find();
        res.json(q);
    } catch (error) {
        res.json({ error })
    }
}

/* insert all questions */
export async function insertQuestion(req, res) {
    try {
        await Questions.insertMany([{ questions, answers }]).then(function () {
            res.json({ msg: "Save successfully...!" })  // Success 
        }).catch(function (error) {
            res.json({ msg: error })     // Failure 
        });
    } catch (error) {
        res.json({ error })
    }
}

/* delete all questions */
export async function deleteQuestion(req, res) {
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions deleted successfully...!" });
    } catch (error) {
        console.log(error)
    }
}

/* Get All Results*/
export async function getResults(req, res) {
    try {
        const r = await Results.find();
        res.json(r);
    } catch (error) {
        console.log(error)
    }
}

/* insert all Results */
export async function insertResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username && !result) throw new Error("Data not provided...!");
        await Results.create({ username, result, attempts, points, achived }).then(function () {
            res.json({ msg: "Result save successfully...!" })  // Success 
        }).catch(function (error) {
            res.json({ msg: error })     // Failure 
        });
    } catch (error) {
        res.json({ error })
    }
}

/* delete all Results */
export async function deleteResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ msg: "Results deleted successfully...!" });
    } catch (error) {
        console.log(error)
    }
}