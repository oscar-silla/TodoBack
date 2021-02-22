import * as mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema({
    title: String,
    todo: String,
    priority: String,
    done: Boolean
});