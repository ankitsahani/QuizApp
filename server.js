import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";

/**db**/
import connect from "./database/conn.js";

const app = express();


/** app middleware**/
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();


/** Env PORT **/
const port = process.env.PORT;

/** routes **/
app.use('/api', router); //api routes
app.get('/', (req, res) => {
    try {
        res.json("Get Response")
    } catch (error) {
        res.json(error);
    }
});

/** start server only when have a valid connection **/
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to database');
    }
}).catch(error => {
    console.log("Invalid database connection");
})
