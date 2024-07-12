import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Candidate = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    resume: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
});

export default mongoose.model("candidates", Candidate);
