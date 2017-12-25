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
        var confirmationUrl = "http://localhost:4400/usrmgt/approve_admin/" + uniqueIdentifier;
        return {
            from: 'biljecki.dejan@gmail.com',
            to: email || 'cdf53@live.ca',
            subject: username + ' requested to become admin.',
            html: 'To approve ' + username + '\'s request to become admin click <a href="' + confirmationUrl + '">here</a>.'
        };
    }

    transporter.sendReqAdminMail = function(username, email, uniqueIdentifier){
        console.log("SENDING MAIL" + username + " " + email + " " + uniqueIdentifier);
        transporter.sendMail (this.getOptions(username, email, uniqueIdentifier), function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

module.exports = transporter;