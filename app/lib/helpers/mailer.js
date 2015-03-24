var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
var templatesDir = path.join(__CONFIG__.app_base_path, 'templates');
var emailTemplates = require('email-templates');
var AppError = require(__CONFIG__.app_base_path + 'lib/app-error');
var async = require('async');
var fs = require('fs');
var getStatus = require(__CONFIG__.app_base_path + 'lib/status');

var transport = nodemailer.createTransport(smtpTransport({
  'host': __CONFIG__.email.server,
  'port': __CONFIG__.email.port,
  'auth': {
    user: __CONFIG__.email.username,
    pass: __CONFIG__.email.password
  },
  maxConnections: __CONFIG__.email.maxCon,
  maxMessages: __CONFIG__.email.maxMsgPerCon
}));
var mailer = function() {
  /**
   * Public : This is the primary method that is called
   * from outside to send the mails.
   */
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
      if (allEmailsLen <= (errMails.length + succMails.length)) {
        cb(null, {
          success: succMails,
          error: errMails
        });
      }
    };

    emailTemplates(templatesDir, function(err, template) {
      if (err) {
        return cb(new AppError(getStatus('internalError'),
          'There was an error while reading the templates', {}));
      }
      for (var i = 0; i < allEmailsLen; ++i) {
        processAttachments(arrObjEmails[i], processAttachmentCb);
      }

      function processAttachmentCb(err, mailObj) {
        if (err) {
          return processResponse(false, {
            'id': mailObj.emailID,
            'error': 'Error while performing file system checks.'
          });
        }
        if (!mailObj.templateName) {
          sendNormalMail(mailObj, processResponse);
        } else {
          sendTemplateMail(mailObj, template, processResponse);
        }
      }
    });
  };

  /**
   * Sends a mail that has a template attached.
   */
  var sendTemplateMail = function(mailObj, template, cb) {
    if (!mailObj.templateName) {
      return cb(false, {
        'id': mailObj.emailID,
        'error': 'No template provided'
      });
    }
    template(mailObj.templateName, JSON.parse(mailObj.data), function(err,
      html, text) {
      if (err) {
        return cb(false, {
          'id': mailObj.emailID,
          'error': 'Couldn\'t load the template file - ' + mailObj.templateName
        });
      }
      transport.sendMail({
        to: mailObj.toEmail,
        cc: mailObj.ccEmail,
        bcc: mailObj.bccEmail,
        text: text,
        html: html,
        subject: mailObj.subject,
        from: mailObj.fromEmail,
        attachments: mailObj.attachments
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

  /**
   * Sends a mail that does not have a template set.
   */
  var sendNormalMail = function(mailObj, cb) {
    if (!mailObj.data) {
      mailObj.data = '';
    } else {
      mailObj.data = JSON.parse(mailObj.data);
    }
    transport.sendMail({
      to: mailObj.toEmail,
      cc: mailObj.ccEmail,
      bcc: mailObj.bccEmail,
      text: mailObj.data,
      html: mailObj.data,
      subject: mailObj.subject,
      from: mailObj.fromEmail,
      attachments: mailObj.attachments,
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

  /**
   * Checks if the attachments are present on the
   * filesystem.
   */
  function processAttachments(mailObj, cb) {
    try {
      mailObj.attachments = JSON.parse(mailObj.attachments);
    } catch (err) {
      return cb(err, mailObj);
    }
    if (mailObj.attachments && mailObj.attachments.length === 0) {
      delete mailObj.attachments;
      return cb(null, mailObj);
    }
    async.filter(mailObj.attachments, function(attachment, next) {
      fs.exists(attachment.path, next);
    }, function(results) {
      mailObj.attachments = results;
      return cb(null, mailObj);
    });
  }

  return {
    sendMails: sendMails
  };
};

module.exports = mailer();