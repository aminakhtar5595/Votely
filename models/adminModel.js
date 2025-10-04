const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add candidate name']
    },
    email: {
        type: String,
        required: [true, 'Please add candidate email']
    },
    phone: {
        type: String,
        required: [true, 'Please add candidate phone']
    }
}, { timestamps: true });


module.exports = mongoose.model('Admin', adminSchema);