const Invantory = require("../models/Invantorys");
const mongoose = require('mongoose')
const bloodGroupDetailController = async (req, res) => {
    try {
        const bloodGroups = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'];
        const bloodGroupsData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            const totalIn = await Invantory.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        invantoryType: 'in',
                        organisation
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }
            ]);
            const totalOut = await Invantory.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        invantoryType: 'out',
                        organisation
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }
            ])
            const availabeBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
            bloodGroupsData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availabeBlood,
            })
        }))
        return res.status(200).send({
            success: true,
            message: 'Blood Group Data Fetch Successfully',
            bloodGroupsData,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'Error In BloodGroup Analutics',
            err
        })
    }
}


module.exports = { bloodGroupDetailController }