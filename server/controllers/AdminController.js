const Users = require("../models/Users");

const getDonerListController = async (req, res) => {
    try {
        const donerData = await Users.find({ role: 'doner' }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            Totalcount: donerData.length,
            message: 'Doner List Fetched Successfully',
            donerData,
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in Doner List API",
            err
        })
    }
};

const getHospitalListController = async (req, res) => {
    try {
        const hospitalData = await Users.find({ role: 'hospital' }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            Totalcount: hospitalData.length,
            message: 'Hospital List Fetched Successfully',
            hospitalData,
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in Hospital List API",
            err
        })
    }
};
const getOrgListController = async (req, res) => {
    try {
        const orgData = await Users.find({ role: 'organization' }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            Totalcount: orgData.length,
            message: 'Organization List Fetched Successfully',
            orgData,
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in Organization List API",
            err
        })
    }
};
const deletDataController = async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: 'Record deleted successfully'
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Error While deleting doner',
            err
        })
    }
}
module.exports = { getDonerListController, getHospitalListController, getOrgListController, deletDataController };