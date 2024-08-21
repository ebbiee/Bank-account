//business logic
function Bank() {
    this.accounts = {};
    this.currentId = 2209146835;
  }
  Bank.prototype.assignID = function () {
    this.currentId += 1268;
    return this.currentId;
  };
  Bank.prototype.addAccount = function (account) {
    account.id = this.assignID();
    this.accounts[account.id] = account
  }
  Bank.prototype.deleteAccount = function (id) {
    if (this.accounts[id] === undefined) {
      return false;
    }
    delete this.accounts[id];
    return true;
  };
  Bank.prototype.findAccount = function (id) {
    if (this.accounts[id] != undefined) {
      return this.accounts[id];
    }
    return false;
  };








//user iterface
$(document).ready(function(){
const loginBtn = $('#login-btn');
const signupBtn =$('#signup-btn');
const loginForm = $('#login-form');
const signupForm = $('#signup-form');

loginBtn.click(function() {
    loginForm.addClass('active');
    signupForm.removeClass('active');
    loginBtn.addClass('active');
    signupBtn.removeClass('active');
});

signupBtn.click( function(){
    signupForm.addClass('active');
    loginForm.removeClass('active');
    signupBtn.addClass('active');
    loginBtn.removeClass('active');
});
const modal = $("#myModal");
$(".openModalBtn").on("click", function() {
    modal.fadeIn();
});
$(".close").on("click", function() {
    modal.fadeOut();
});
$(window).on("click", function(event) {
    if ($(event.target).is($modal)) {
        modal.hide();
    }
});

})