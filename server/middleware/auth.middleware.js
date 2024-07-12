import jwt from "jsonwebtoken";
const checkSuperAdmin = async (req, res, next) => {
    //retrieve jwtToken value from client's request header
    const authHeader = req.headers["authorization"];
    if (authHeader === null || authHeader === undefined) {
        return res
            .status(401)
            .json({ message: "Unauthorized", status: "error" });
    }
    try {
        const payload = jwt.verify(
            authHeader.split(" ")[1],
            process.env.JWT_SECRET
        );
        const id = payload.id;
        const role = payload.role;
        const email = payload.email;

        if (role !== "superadmin") {
            return res
                .status(401)
                .json({ message: "Unauthorized", status: "error" });
        } else {
            req.user = { id, role, email };
            next();
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error while verifying token of superAdmin",
            error,
            status: "error",
        });
    }
};

const checkAdmin = async (req, res, next) => {
    //retrieve jwtToken value from client's request header
    const authHeader = req.headers["authorization"];
    if (authHeader === null || authHeader === undefined) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const payload = jwt.verify(
            authHeader.split(" ")[1],
            process.env.JWT_SECRET
        );
        const id = payload.id;
        const role = payload.role;
        const email = payload.email;
        if (role !== "admin") {
            return res
                .status(401)
                .json({ message: "Unauthorized", status: "error" });
        } else {
            req.user = { id, role, email };
            next();
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error while verifying token of admin",
            status: "error",
            error,
        });
    }
};

const checkLoggedIn = async (req, res, next) => {
    //retrieve jwtToken value from client's request header
    const authHeader = req.headers["authorization"];
    if (authHeader === null || authHeader === undefined) {
        return res
            .status(401)
            .json({ message: "Unauthorized", status: "error" });
    }
    try {
        const payload = jwt.verify(
            authHeader.split(" ")[1],
            process.env.JWT_SECRET
        );
        const id = payload.id;
        const role = payload.role;
        const email = payload.email;
        req.user = { id, role, email };
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error while verifying token of admin/superadmin",
            status: "error",
            error,
        });
    }
};

export { checkAdmin, checkSuperAdmin, checkLoggedIn };
