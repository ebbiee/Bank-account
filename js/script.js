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
  accountHolder.prototype.addTransaction = function(amount, accountNumber = null) {
    this.transactionHistory.push(new transactionHistory(amount, accountNumber));
  };
  accountHolder.prototype.depositMoney = function (amount) {
    let initial = parseInt(this.balance);
    let deposit = parseInt(amount);
    this.balance = deposit + initial;
    return this.balance;
}
 accountHolder.prototype.makeTransfers = function (amount) {
  if (amount > this.balance) {
    alert("INSUFFICIENT FUNDS!!!!!")
  } else {
    this.balance -= parseInt(amount);
  }
  return this.balance
}







//user iterface
$(document).ready(function(){

let bank = new Bank();
let loggedInAccount = null;

$("form").submit(function (event) {
  event.preventDefault();
  const formId = $(this).attr("id");

  if (formId === "signup-form") {
    $(".signup").click(function(){
      $(".body2").hide()
    })
    const username = $("#signup-username").val();
    const password = $("#signup-password").val();
    const email = $("#exampleFormControlInput1").val();

    // Create a new account and add it to the bank
    const newAccount = new accountHolder(username, password, email);
    bank.addAccount(newAccount);

    // Display the username and account number on the screen
    $(".account-holder").html(username);
    $(".accountnumber").html(newAccount.id);

    alert("Account created successfully! Your Account Number is " + newAccount.id + " you can noww use the acccount number to login to access your account"
    );
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
      $(".body2").fadeIn()
      $(".body").hide()
      $(".img").hide()
      showAccountDetails(loggedInAccount);
      updateTransactionHistory(loggedInAccount);
    } else {
      alert("Login failed. Please check your account number and password.");
    }
  }
  if (formId === "addMoneyForm") {
    const amount = parseInt($(".amountToAdd").val());
    console.log('Logged in account during add money:', loggedInAccount);
    if (loggedInAccount && typeof loggedInAccount.depositMoney === "function") {
      let result = loggedInAccount.depositMoney(amount);
      loggedInAccount.addTransaction(amount, null);
      $(".money").html(result); //
      updateTransactionHistory(loggedInAccount);
      console.log('Deposited amount:', amount, 'New balance:', result);
    } else {
      console.log("No account is logged in or depositMoney method is missing");
    }
    $(this)[0].reset();

  }
  if (formId === "transferForm") { 
    const amount = parseInt($("#transferAmount").val()); 
    if (loggedInAccount && typeof loggedInAccount.makeTransfers === "function") {
      let success = loggedInAccount.makeTransfers(amount);
      if (success) {
        loggedInAccount.addTransaction(-amount, "Transfer");
        $(".money").html(loggedInAccount.balance.toFixed(2));
        updateTransactionHistory(loggedInAccount);
        console.log("Transfer successful. New balance: " + loggedInAccount.balance);
      } else {
        console.log("Transfer failed.");
      }
    } else {
      console.log("No account is logged in or makeTransfers method is missing");
    }
  }
});

function showAccountDetails(account) {
  $(".account-holder").html(account.username);
  $(".accountnumber").html(account.id);
  $(".money").html(account.balance.toFixed(2));
}

function updateTransactionHistory(account) {
  const historyContainer = $("#off");
  historyContainer.html("");

  account.transactionHistory.forEach(transaction => {
    let transactionType;
    if (transaction.accountNumber === null) {
      transactionType = "Credit";
    } else {
      transactionType = "Debit";
    }
    const transactionElement = `
      <p>${transactionType}: <span class="price">&#8358;${transaction.amount}</span></p>
    `;
    historyContainer.append(transactionElement);
    console.log(`  Amount: ${transaction.amount}`);
  });
}
$(".logoutbtn").click(function(){
  $(".body2").hide()
  $(".body").fadeIn()
  $(".img").show()
})
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
