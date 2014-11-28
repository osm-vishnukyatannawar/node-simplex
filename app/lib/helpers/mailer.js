var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var mailer = {
  send: function(objSendEmail) {
    var toEmail = objSendEmail.toEmail;
    var template = objSendEmail.template;
    var cb = objSendEmail.cb;
    if (toEmail === undefined) { return null; }
    var emailConfig = __CONFIG__.email;
    var transport = nodemailer.createTransport(smtpTransport({
      host: emailConfig.server,
      port: emailConfig.port,
      auth: {
        user: emailConfig.username,
        pass: emailConfig.password
      }
    }));
    var email = {
      from: emailConfig.fromName + '<' + emailConfig.username + '>',
      to: toEmail,
      subject: 'Welcome to Emanate',
      text: 'Please confirm your registration here.',
      html: 'It\'s time to expect more from an RTLS tag. <br>'
              + '<h3>INTRODUCING THE POWERPATH™ AC-POWERED WIRELESS ASSET TAG.<h3>'
    };
    transport.sendMail(email, function(err, info) {
      if (err) {
        // Email sending error
        return cb(err);
      } else {
        // Email sent successfully.
        return cb(null, info);
      }
    });
  }
};
module.exports = mailer;
