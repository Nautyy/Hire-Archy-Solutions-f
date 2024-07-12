import B2B from "../schema/b2b.schema.js";
export const newForm = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            companyName,
            phoneNo,
            officeEmail,
            channelPlaySolutions,
        } = req.body;
        console.log(
            `Creating new form for B2B: user ${firstName} ${lastName} from ${companyName}.`
        );
        const form = new B2B({
            firstName,
            lastName,
            companyName,
            phoneNo,
            officeEmail,
            channelPlaySolutions,
        });
        await form.save();
        console.log("Successfully submitted your form!✅\n");
        res.status(200).json({
            message: "Successfully submitted your form!✅",
            status: "success",
        });
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
        const forms = await B2B.find().limit(limit).skip(startIndex);
        const totalRows = await B2B.countDocuments();
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
        const forms = await B2B.find();
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
