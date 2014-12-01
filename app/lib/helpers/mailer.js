var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
var templatesDir = path.join(__CONFIG__.app_base_path, 'templates');
var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');

var transport = nodemailer.createTransport(smtpPool({
  'host': __CONFIG__.server,
  'port': __CONFIG__.port,
  'auth': {
    user: __CONFIG__.username,
    pass: __CONFIG__.password
  },
  maxConnections: __CONFIG__.maxCon,
  maxMessages: __CONFIG__.maxMsgPerCon
}));
var mailer = function() {
  var sendMails = function(arrObjEmails, cb) {
    var allEmailsLen = arrObjEmails.length;
    if (!allEmailsLen) {
      return;
    }
    var errMails = [];
    var succMails = [];
    var processResponse = function(isSuccess, respObj) {
      if (isSuccess) {
        succMails.push(respObj);
      } else {
        errMails.push(respObj);
      }
      if (allEmailsLen >= (errMails.length + succMails.length)) {
        cb(null, {
          success: succMails,
          error: errMails
        });
      }
    };    
    emailTemplates(templatesDir, function(err, template) {
      if (err) {
        return cb(new AppError(that.getStatusCode('i'),
          'There was an error while reading the templates', {}));
      }
      for (var i = 0; i < allEmailsLen; ++i) {
        if (!arrObjEmails[i].templateName) {
          mailer.sendNormalMail(arrObjEmails[i], processResponse);
        } else {
          mailer.sendTemplateMail(arrObjEmails[i], processResponse);
        }
      }
    });    
  };

  var sendTemplateMail = function(mailObj, cb) {
    if (!mailObj.templateName) {
      return cb(false, {
        'id': mailObj.emailID,
        'error': 'No template provided'
      });
    }
    template(templateName, mailObj.data, function(err, html, text) {
      if (err) {
        return cb(false, {
          'id': mailObj.emailID,
          'error': 'Couldn\'t load the template file - ' + templatesName
        });
      }
      transport.sendMail({
        to: mailObj.toEmail,
        cc: mailObj.ccEmail,
        bcc: mailObj.bccEmail,
        text: text,
        html: html,
        subject: mailObj.subject,
        from: mailObj.fromEmail
      }, function(err, responseStatus) {
        if (err) {
          return cb(false, {
            'id': mailObj.emailID,
            'error': JSON.stringify(err)
          });
        } else {
          return cb(true, {
            'id': mailObj.emailID,
            'error': responseStatus.message
          });
        }
      });
    });
  };
  
  var sendNormalMail = function(mailObj, cb) {
    if(!mailObj.data) {
      mailObj.data = '';
    }
    transport.sendMail({
      to: mailObj.toEmail,
      cc: mailObj.ccEmail,
      bcc: mailObj.bccEmail,
      text: mailObj.data,
      html: mailObj.data,
      subject: mailObj.subject,
      from: mailObj.fromEmail
    }, function(err, responseStatus) {
      if (err) {
        return cb(false, {
          'id': mailObj.emailID,
          'error': JSON.stringify(err)
        });
      } else {
        return cb(true, {
          'id': mailObj.emailID,
          'error': responseStatus.message
        });
      }
    });
  };
  
  return {
    sendMails: sendMails
  };
};
module.exports = mailer();