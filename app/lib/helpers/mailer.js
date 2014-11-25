var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var mailer = {
	send : function(toEmail) {
		if(toEmail === undefined){
			return null;
		}
		var emailConfig = __CONFIG__.email;
		var transport = nodemailer.createTransport(smtpTransport({
			host : emailConfig.server,
			port : emailConfig.port,
			auth : {
				user : emailConfig.username,
				pass : emailConfig.password
			}
		}));
		var email = {
			from : emailConfig.fromName + '<' + emailConfig.username + '>',
			to : toEmail,
			subject : 'Hello',
			text : 'Hello world',
			html : '<b>Hello Abhijeet, Hi how are you, yeah again me  but this time I am from MODULE.</b>'
		};
		transport.sendMail(email, function(err, info) {
			if (err) {
				// Email sending error
			} else {
				// Email sent successfully.
			}
		});
	}
};
module.exports = mailer;
