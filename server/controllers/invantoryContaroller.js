const mongoose = require("mongoose");
const Invantorys = require("../models/Invantorys");
const Users = require("../models/Users");

const creatInvantory = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        // if (invantoryType === "in" && user.role !== 'doner') {
        //     throw new Error("Not a doner account");
        // }

        if (req.body.invantoryType === 'out') {
            const requesedBloodGroup = req.body.bloodGroup;
            const requesedQuantity = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId);
            const totalInOfRequesedBlood = await Invantorys.aggregate([
                {
                    $match: {
                        organisation,
                        invantoryType: 'in',
                        bloodGroup: requesedBloodGroup,
                    }
                }, {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ])
            // console.log("Total In ", totalInOfRequesedBlood)
            const totalIn = totalInOfRequesedBlood[0]?.total || 0;

            const totalOutOfRequestedBlood = await Invantorys.aggregate([
                {
                    $match: {
                        organisation,
                        invantoryType: 'out',
                        bloodGroup: requesedBloodGroup,
                    }
                }, {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ])

            const totalOut = totalOutOfRequestedBlood[0]?.total || 0;
            const availableQuantityOfBloodGroup = totalIn - totalOut;

            if (availableQuantityOfBloodGroup < requesedQuantity) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requesedBloodGroup.toUpperCase()} is available `
                })
            }
            req.body.hospital = user?._id;
        } else {
            req.body.doner = user?._id
        }


        const invantory = new Invantorys(req.body);
        await invantory.save();
        return res.status(201).send({
            success: true,
            message: 'New Blood recored Added'
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            massarge: 'Error in create Invantory',
            err,
        })
    }
}

const getInvantoryController = async (req, res) => {
    try {
        const invantory = await Invantorys.find({ organisation: req.body.userId })//.populate('doner').populate('hospital').sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "get all record",
            invantory
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: 'Error in get Invantory ',
            err
        })
    }
}
const getInvantoryHospitalController = async (req, res) => {
    try {
        const invantory = await Invantorys.find(req.body.filters)//.populate('doner').populate('hospital').sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "get Hospital comsumer record",
            invantory
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: 'Error in get comsumer Invantory ',
            err
        })
    }
}

const getDonarController = async (req, res) => {
    try {
        const organisation = req.body.userId;
        const donerId = await Invantorys.distinct("doner", { organisation });
        //  console.log(donerId);
        const doners = await Users.find({ _id: { $in: donerId } })
        return res.status(200).send({
            success: true,
            message: "Doner Record Fetched Successfully",
            doners,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error in Donar records"
        })
    }
};

const getHospitalController = async (req, res) => {
    try {
        const organisation = req.body.userId;
        const hospitalId = await Invantorys.distinct("hospital", { organisation });
        const hospitals = await Users.find({ _id: { $in: hospitalId } });
        return res.status(200).send({
            success: true,
            message: 'Hospital Record Fetched Successfully',
            hospitals,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'Error in Hospital API'
        })
    }
}

const getOrganizationController = async (req, res) => {
    try {
        const doner = req.body.userId;
        const orgId = await Invantorys.distinct("organisation", { doner });
        const organisations = await Users.find({ _id: { $in: orgId } });
        return res.status(200).send({
            success: true,
            message: 'Org Data Fetched Successfully',
            organisations,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'Error in ORG API',
            err
        })
    }
}
const getOrganizationForHospitalController = async (req, res) => {
    try {
        const hospital = req.body.userId;
        const orgId = await Invantorys.distinct("organisation", { hospital });
        const organisations = await Users.find({ _id: { $in: orgId } });
        return res.status(200).send({
            success: true,
            message: 'Hospital Org Data Fetched Successfully',
            organisations,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'Error in Hospital ORG API',
            err
        })
    }
}



module.exports = { creatInvantory, getInvantoryController, getDonarController, getHospitalController, getOrganizationController, getOrganizationForHospitalController, getInvantoryHospitalController };