var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'biljecki.dejan@gmail.com',
            pass: 'eternalshine'
        }
    })); 


    transporter.getOptions = function(username, email, uniqueIdentifier){
        var activationUrl = "http://localhost:4400/usrmgt/activate/" + uniqueIdentifier;
        return {
            from: 'biljecki.dejan@gmail.com',
            to: email || 'cdf53@live.ca',
            subject: 'Activate account by confirming registration',
            html: "Hello " + username + '.<br>To activate your account, click <a href="' + activationUrl + '">here</a>.'
        };
    }

    transporter.sendRegistrationMail = function(username, email, uniqueIdentifier){
        transporter.sendMail (this.getOptions(username, email, uniqueIdentifier), function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

module.exports = transporter;