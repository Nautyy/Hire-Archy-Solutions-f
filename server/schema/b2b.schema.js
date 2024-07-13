import mongoose from "mongoose";

const B2B = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    officeEmail: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    hirearchyOption: {
        type: String,
        enum: [
            "Visual Merchandising & Signage",
            "Sales Staffing & Management",
            "Mystery Shopping & Audits",
            "Loyalty Programs",
        ],
        required: true,
    },
});

export default mongoose.model("b2b", B2B);
