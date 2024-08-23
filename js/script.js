//business logic
function Bank() {
    this.accounts = {};
    this.currentId = 220914683;
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
  function accountHolder(username,password,emailAddress){
    this.username = username;
    this.password = password;
    this.emailAddress = emailAddress;
    this.balance = 0;
    this.transactionHistory = [];
  }
  function transactionHistory(amount,  accountNumber){
    this.amount = amount;
    this.accountNumber = accountNumber; 
  }
  accountHolder.prototype.username = function(){
    return this.username;
  }
  accountHolder.prototype.getPassword = function() {
    return this.password;
  };
  accountHolder.prototype.getBalance = function() {
    return this.balance;
  };
  accountHolder.prototype.addTransaction = function(amount, accountNumber) {
    this.transactionHistory.push(new TransactionHistory(amount, accountNumber));
  };
  accountHolder.prototype.depositMoney = function (amount) {
    let initial = parseInt(this.balance);
    let deposit = parseInt(amount);
    this.balance = deposit + initial;
    return this.balance;
}








//user iterface
$(document).ready(function(){
let bank = new Bank();
let loggedInAccount = null;

$("form").submit(function (event) {
  event.preventDefault();
  const formId = $(this).attr("id");

  if (formId === "signup-form") {
    const username = $("#signup-username").val();
    const password = $("#signup-password").val();
    const email = $("#exampleFormControlInput1").val();

    // Create a new account and add it to the bank
    const newAccount = new accountHolder(username, password, email);
    bank.addAccount(newAccount);

    // Display the username and account number on the screen
    $(".account-holder").html(username);
    $(".accountnumber").html(newAccount.id); // Display the account number

    console.log("Account created successfully! Your Account Number is " + newAccount.id);
    $(this)[0].reset();
  } 
  else if (formId === "login-form") {
    const accountNumber = $("#account-number").val();
    const password = $("#login-password").val();
    console.log(accountNumber, password)

    // Find the account by ID
    const account = bank.findAccount(accountNumber);
    console.log(account)

    if (account && account.password === password) {
      loggedInAccount = account;
      alert("Login successful!");
      showAccountDetails(loggedInAccount);
    } else {
      alert("Login failed. Please check your account number and password.");
    }
  }
  if (formId === "addMoneyForm") {
    const amount = parseInt($(".amountToAdd").val());
    console.log('Logged in account during add money:', loggedInAccount);
    if (loggedInAccount && typeof loggedInAccount.depositMoney === "function") {
      let result = loggedInAccount.depositMoney(amount);
      $(".money").html(result); // Update the displayed balance
      console.log('Deposited amount:', amount, 'New balance:', result);
    } else {
      console.log("No account is logged in or depositMoney method is missing");
    }
    $(this)[0].reset();
  }
});

function showAccountDetails(account) {
  $(".account-holder").html(account.username);
  $(".accountnumber").html(account.id);
  $(".money").html(account.balance.toFixed(2));
  // Additional account details can be displayed here
}


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
    if ($(event.target).is(modal)) {
        modal.hide();
    }
});

})
