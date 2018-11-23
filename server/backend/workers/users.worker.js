const bcrypt = require('../../../templateWeb/node_modules/bcrypt');
const jwt = require('jsonwebtoken');

var userRepo = require('../repository/users.repository');
const User = require('../models/user');

module.exports.create = function (user) {
    return new Promise(function (resolve, reject) {
    
        userRepo.getByEmail(user.email)
          .then(function (duplicateUser) {
            if (duplicateUser) {
              // mail already exists
              reject('Email "' + user.email + '" is already taken');
            } else {
              bcrypt.hash(user.password, 10)
              .then(hash => {
                const cleanUser = new User({
                    email: user.email,
                    password: hash
                });
                userRepo.addUser(cleanUser).then(createdUser => {
                    const newUserData = {id: createdUser._id, email: createdUser.email};
                    resolve(newUserData);
                  })
                  .catch(function (err) {
                     reject(err);
                  });
              })   
            }
        })
    })
}

module.exports.login = function(email, password) {
    return new Promise(function (resolve, reject) {
        let fetchedUser; 
        userRepo.getByEmail(email)
        .then( user => {
            if (!user) {
                // authentication failed
                reject('Invalid email');
            }
            fetchedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(result => {
            if (!result) {
                reject('Invalid password');
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id }, 
                process.env.JWT_KEY,
                { expiresIn: '1h' }     
            );
            resolve(token);
        })
        .catch(function (err) {
            reject(err);
          });
    })
}