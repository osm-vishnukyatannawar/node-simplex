'use strict';

function User () {
  this.username = '';
  this.password = '';
  this.emailAddress = '';
  this.country = '';
  this.state = '';
  this.city = '';
  this.gender = '';
  this.age = 0;
  this.occupation = '';
  this.education = '';
  this.profilePic = '';
}

User.prototype.isValid = function () {

};

User.prototype.bindValues = function () {

};

module.exports = new User();
