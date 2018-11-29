var contactWorker = require('../workers/contact.worker');

module.exports.sendEmail = function (req, res, next) {
    contactWorker.sendEmail(req)
    .then( () => {
        res.status(201).json({
            message: 'Email sent successfully'
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'Email NOT sent ! probably due to connection refuse to email server',
            error: err
        })
    });
}