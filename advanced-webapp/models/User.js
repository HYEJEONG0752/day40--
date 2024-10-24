const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});

// 비밀번호 암호화
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);

    next();
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = function(candidatePassword) {
    return bycrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);