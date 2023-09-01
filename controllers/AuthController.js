const Users = require("../models/Users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const registerController = async (req, res) => {
    try {
        const exisituser = await Users.findOne({ email: req.body.email });
        if (exisituser) {
            return res.status(200).send({
                success: false,
                message: 'user already exists'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const newuser = new Users(req.body);
        await newuser.save();
        return res.status(200).send({
            success: true,
            message: 'Users Register successfully',
            newuser
        })


    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Error',
            err
        })
    }

}

const loginController = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        if (user.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                message: 'role dosent match '
            })
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRE, { expiresIn: "1d" });
        return res.status(200).send({
            success: true,
            message: 'successful login',
            token,
            user
        })



    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'error in login',
            err,
        })
    }
}

const currentControllerUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.body.userId })
        return res.status(200).send({
            success: true,
            message: 'User fetched successful',
            user
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "unable to get current user",
            err
        })
    }
}

module.exports = { registerController, loginController, currentControllerUser }