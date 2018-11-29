const email = require('emailjs/email');

module.exports.sendEmail = function (req) {
    return new Promise(function (resolve, reject) {

        var server = email.server.connect({
            user: "ndubourg1991@gmail.com",
            password: process.env.EMAIL_CONNECTION_PWD,
            host: "smtp.gmail.com",
            ssl: true
        });
        
        server.send({
            text: req.body.message,
            from: req.body.email,
            to: "ndubourg1991@gmail.com",
            subject: "Info requested",
        }, function(err, message) { 
            if(err)
            reject(err);
            else
            resolve();
         });
    });
};