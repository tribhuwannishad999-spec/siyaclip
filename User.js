const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { 
        type: String, 
        enum: ['Free', 'Pro Lite', 'Pro Max'], 
        default: 'Free' 
    },
    credits: { type: Number, default: 3 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
