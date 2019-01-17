const User = require('../models/user.model');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectID;
exports.user_authenticate = function (req, res) {
    const collection = req.app.locals.collection;
    const user = new User();
    collection.find({ username: req.body.username }).
        toArray().then(response => {
            if (response.length > 0 && response[0].password === req.body.password) {
                res.status(200).json({
                    "token": user.generateJwt(response[0]['_id']),
                    "id": response[0]['_id']
                })
            } else if (response.length > 0 && response[0].password !== req.body.password) {
                res.status(400).json('Username or Password is not correct.');
            } else {
                res.status(400).json('Username doesnot exist.');
            }
        })
        .catch(error => console.error(error));
};

exports.get_user_details = (req, res, next) => {
    const collection = req.app.locals.collection;
    collection.findOne({ _id: ObjectId(req._id) },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['firstName', 'lastName', 'email', 'contact']) });
        }
    );
}