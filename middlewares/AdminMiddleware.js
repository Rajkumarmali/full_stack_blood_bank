const Users = require('../models/Users')
module.exports = async (req, res, next) => {
    try {
        const user = await Users.findById(req.body.userId);
        if (user?.role !== 'admin') {
            return res.status(401).send({
                success: false,
                message: 'Auth Failed'
            })
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            success: false,
            message: 'Auth Failed , ADMIN API',
            err
        })
    }
};