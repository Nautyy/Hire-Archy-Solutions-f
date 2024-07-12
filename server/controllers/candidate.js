import Candidate from "../schema/candidates.schema.js";
import { dataUri } from "../middleware/upload.js";
import { uploader } from "cloudinary";

export const applyForm = async (req, res) => {
    try {
        const { firstName, lastName, email, college, city, state, dob } =
            req.body;
        console.log(
            `Creating new form for candidate: user ${firstName} ${lastName} from ${college}.`
        );

        const checkEmail = await Candidate.findOne({ email: email });
        if (checkEmail) {
            return res.status(400).json({
                message: "Email already exists.",
                status: "error",
            });
        }

        if (
            !firstName ||
            !lastName ||
            !email ||
            !college ||
            !city ||
            !state ||
            !dob
        ) {
            return res.status(400).json({
                message: "Please fill all the fields.",
                status: "error",
            });
        }

        if (req.file) {
            const file = dataUri(req).content;
            uploader
                .upload(file, {
                    resource_type: "image",
                })
                .then(async (result) => {
                    const resumeUrl = result.url;
                    console.log("Resume uploaded successfully! : ", resumeUrl);
                    const form = new Candidate({
                        firstName,
                        lastName,
                        email,
                        college,
                        city,
                        state,
                        dob,
                        resume: resumeUrl,
                    });
                    await form.save();
                    console.log("Successfully submitted your form!✅\n");
                    res.status(200).json({
                        message: "Successfully submitted your form!✅",
                        data: {
                            form,
                        },
                        status: "success",
                    });
                })
                .catch((err) => {
                    console.log(
                        "Something went wrong while uploading the resume"
                    );
                    res.status(400).json({
                        message:
                            "Something went wrong while uploading your resume.",
                        data: {
                            err,
                        },
                    });
                });
        } else {
            console.log("Resume not uploaded.");
            return res.status(400).json({
                message: "Please upload your resume.",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Some error occurred while submitting your form.",
            status: "error",
        });
    }
};

export const getForms = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const forms = await Candidate.find().limit(limit).skip(startIndex);
        const totalRows = await Candidate.countDocuments();
        console.log("Successfully fetched all forms.\n");
        res.status(200).json({
            message: "Successfully fetched all forms.",
            data: {
                forms,
                totalRows,
            },
            status: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Some error occurred while fetching all forms.",
            status: "error",
        });
    }
};

export const getAllForms = async (req, res) => {
    try {
        const forms = await Candidate.find();
        console.log("Successfully fetched all forms.\n");
        res.status(200).json({
            message: "Successfully fetched all forms.",
            data: forms,
            total: forms.length,
            status: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Some error occurred while fetching all forms.",
            status: "error",
        });
    }
};
