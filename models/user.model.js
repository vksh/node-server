const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

let UserInfoSchema = new Schema({
    email: { type: String, required: true, max: 50 },
    password: { type: String, required: true },
});

UserInfoSchema.methods.generateJwt = function (id) {
    const JWT_SECRET = "SECRET#123";
    const JWT_EXP = "10m";
    return jwt.sign({ _id: id },
        JWT_SECRET,
        {
            expiresIn: JWT_EXP
        });
}
// Export the model
module.exports = mongoose.model('UserInfo', UserInfoSchema);