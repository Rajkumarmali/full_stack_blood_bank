const mongoose = require('mongoose');


const invantorySchema = new mongoose.Schema({
    invantoryType: {
        type: String,
        required: [true, 'invantory type required'],
        enm: ['in', 'out'],
    },
    bloodGroup: {
        type: String,
        required: [true, 'blood group is required'],
        enm: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
    },
    quantity: {
        type: Number,
        required: [true, 'blood quantity is required'],
    },
    email: {
        type: String,
        required: true,
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'organisation is required'],
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.invantoryType === "out"
        }
    },
    doner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.invantoryType === 'in'
        }

    },


}, { timestamps: true })

const Invantory = mongoose.model('Invantory', invantorySchema);
module.exports = Invantory;