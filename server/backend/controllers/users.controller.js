var userWorker = require('../workers/users.worker');

module.exports.signup = function (req, res, next) {
    userWorker.create(req.body)
    .then(userData => {
        res.status(201).json({
            message: 'User created',
            result: userData
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Signup failed!',
            error: err
        })
    });
}

module.exports.login = function(req, res, next) {
    userWorker.login(req.body.email, req.body.password)
    .then(token => {
        res.status(200).json({
            message: 'Login Success',
            token: token,
            expireIn: 3600
        });
    })
    .catch(err => {
        res.status(401).json({
            message: 'Auth Failed!',
            error: err
        })
    });
}