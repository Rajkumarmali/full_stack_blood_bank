const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    role: {
        type: String,
        required: true,
        enum: ['admin', 'doner', 'organization', 'hospital']
    },
    name: {
        type: String,
        required: function () {
            if (this.role === 'doner' || this.role === 'admin')
                return true

            return false
        }
    },

    organizationName: {
        type: String,
        required: function () {
            if (this.role === 'organization') return true

            return false
        }

    },

    hospitalName: {
        type: String,
        required: function () {
            if (this.role === 'hospital') return true
            return false
        }
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    webside: {
        type: String,

    },

    address: {
        type: String,
        required: [true, 'address is required']
    },
    phone: {
        type: String,
        required: [true, 'phone Number is required']
    }



}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
