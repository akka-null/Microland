async function isAdmin(req, res, next) {
    try {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json({ "errorMsg": "you must be an admin to do that " });
        }
    } catch (error) {
        res.json({ error });
    }
};
export default isAdmin;
