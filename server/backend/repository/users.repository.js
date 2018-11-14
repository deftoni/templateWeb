const User = require('../models/user');

module.exports.getByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email })
        .then( existedUser => {
            resolve(existedUser);
        }) 
        .catch( err => {
            reject(err);
        })
    });
};

module.exports.addUser = function (user) {
    return new Promise(function (resolve, reject) {
        user.save()
        .then(createdUser => {
            resolve(createdUser);
        })
        .catch( err => {
            reject(err);
        })
    });
};