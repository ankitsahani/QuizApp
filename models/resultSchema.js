import mongoose from "mongoose";
const { Schema } = mongoose;

/** Result Models **/
const resultModel = new Schema({
    username: { type: String },
    result: { type: Array, default: 0 },
    attempts: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    achived: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now() }
});

export default mongoose.model('Result', resultModel);