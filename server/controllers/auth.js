import User from "../schema/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const addAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        console.log(`Creating new ${role} with email: ${email}.`);
        // check if admin/superadmin already exists
        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                message: `${
                    role.charAt(0).toUpperCase() + role.slice(1)
                } with given email already exists.`,
                status: "error",
            });
        }

        // hash password
        const hash = await bcrypt.hash(password, saltRounds);
        const user = new User({
            name,
            email,
            password: hash,
            role,
        });
        await user.save();
        console.log(`Successfully created new ${role}.\n`);
        res.status(200).json({
            message: `Successfully created new ${role}.`,
            status: "success",
        });
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({
            message: `Some error occurred while creating ${role}.`,
            status: "error",
            error: err,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(
            `Admin/SuperAdmin with email: ${email} is trying to login.`
        );
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return res.status(400).json({
                message: "Admin/SuperAdmin with given email does not exist.",
                status: "error",
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                message: "Incorrect password.",
                status: "error",
            });
        }
        // Generate token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log(`Successfully logged in ${user.role}.\n`);
        res.status(200).json({
            message: `Successfully logged in ${user.role}.`,
            status: "success",
            token,
            data: {
                name: user.name,
                email: user.email,
            },
            role: user.role,
        });
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({
            message: "Some error occurred while logging in admin/superAdmin.",
            status: "error",
            error: err,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, originalPassword, newPassword } = req.body;
        console.log(req.body);
        console.log(req.user);
        console.log(
            `${req.user.role} with email: ${email} is trying to reset password.`
        );
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return res.status(400).json({
                message: `${req.user.role} with given email does not exist.`,
                status: "error",
            });
        }
        if (email !== req.user.email) {
            return res.status(400).json({
                message: "You can only reset your own password.",
                status: "error",
            });
        }

        const match = await bcrypt.compare(originalPassword, user.password);
        if (!match) {
            return res.status(400).json({
                message: "Incorrect password.",
                status: "error",
            });
        }
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
        await User.updateOne({ email }, { password: newPasswordHash });
        console.log(`Successfully reset password for ${user.role}.\n`);
        res.status(200).json({
            message: `Successfully reset password for ${user.role} (${email}).`,
            status: "success",
        });
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({
            message:
                "Some error occurred while resetting password for admin/superAdmin.",
            status: "error",
            error: err,
        });
    }
};

export { addAdmin, login, resetPassword };
