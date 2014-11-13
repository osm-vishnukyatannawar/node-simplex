var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var sendEmail = {
	emailSend : function(toEmail) {
		if(toEmail === undefined){
			return null;
		}
		var transport = nodemailer.createTransport(smtpTransport({
			host : 'mail.osmosys.asia',
			port : 25,
			auth : {
				user : 'bharadwaja.g@osmosys.asia',
				pass : 'B3stPr@c'
			}
		}));
		var email = {
			from : 'Emanate <bharadwaja.g@osmosys.asia>',
			to : toEmail,
			subject : 'Hello',
			text : 'Hello world',
			html : '<b>Hello Abhijeet, Hi how are you, yeah again me  but this time i am from MODULE.</b>'
		};
		transport.sendMail(email, function(err, info) {
			if (err) {
				console.log(err);
			} else {
				console.log('Message sent: ' + info.response);
			}
		});
	}
};
module.exports = sendEmail;
