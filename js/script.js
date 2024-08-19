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

})