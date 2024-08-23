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
  this.accounts[account.id] = account;
};

Bank.prototype.deleteAccount = function (id) {
  if (this.accounts[id] === undefined) {
    return false;
  }
  delete this.accounts[id];
  return true;
};

Bank.prototype.findAccount = function (id) {
  return this.accounts[id] || false;
};

function accountHolder(username, password, emailAddress) {
  this.username = username;
  this.password = password;
  this.emailAddress = emailAddress;
  this.balance = 0;
  this.transactionHistory = [];
}

function TransactionHistory(type, amount, accountNumber) {
  this.type = type;
  this.amount = amount;
  this.accountNumber = accountNumber;
}

accountHolder.prototype.addTransaction = function (type, amount, accountNumber = null) {
  const transaction = new TransactionHistory(type, amount, accountNumber);
  this.transactionHistory.push(transaction);
};

accountHolder.prototype.depositMoney = function (amount) {
  let deposit = parseInt(amount);
  this.balance += deposit;
  this.addTransaction("Credit", amount);
  return this.balance;
};

accountHolder.prototype.makeTransfers = function (amount) {
  if (amount > this.balance) {
    alert("INSUFFICIENT FUNDS!!!!!");
    return false;
  } else {
    this.balance -= parseInt(amount);
    this.addTransaction("Debit", amount);
    return true;
  }
};


$(document).ready(function(){

  let bank = new Bank();
  let loggedInAccount = null;

  $("form").submit(function (event) {
      event.preventDefault();
      const formId = $(this).attr("id");

      if (formId === "signup-form") {
          $(".signup").click(function(){
              $(".body2").hide(); // This hides body2 during signup
          })
          const username = $("#signup-username").val();
          const password = $("#signup-password").val();
          const email = $("#exampleFormControlInput1").val();

          const newAccount = new accountHolder(username, password, email);
          bank.addAccount(newAccount);

          $(".account-holder").html(username);
          $(".accountnumber").html(newAccount.id);

          alert("Account created successfully! Your Account Number is " + newAccount.id + " you can now use this account number to log in.");

          $(this)[0].reset();
      } 
      else if (formId === "login-form") {
          const accountNumber = $("#account-number").val();
          const password = $("#login-password").val();

          const account = bank.findAccount(accountNumber);

          if (account && account.password === password) {
              loggedInAccount = account;
              $(".body2").fadeIn(); // Make sure body2 is visible after login
              alert("Login successful!");
              showAccountDetails(loggedInAccount);
              updateTransactionHistory(loggedInAccount);
          } else {
              alert("Login failed. Please check your account number and password.");
          }
      }
      // ... Other form handling code
  });

  // Functions to show account details and transaction history
  function showAccountDetails(account) {
      $(".account-holder").html(account.username);
      $(".accountnumber").html(account.id);
      $(".money").html(account.balance.toFixed(2));
  }

  function updateTransactionHistory(account) {
      const historyContainer = $(".offcanvas-body");
      historyContainer.html(""); // Clear the existing history

      account.transactionHistory.forEach(transaction => {
          const type = transaction.type === "Credit" ? "Credited" : "Debited";
          const transactionElement = `
              <p>${type}: <span class="price">&#8358;${transaction.amount}</span></p>
          `;
          historyContainer.append(transactionElement);
      });
  }

  // Login and Signup button toggle
  const loginBtn = $('#login-btn');
  const signupBtn = $('#signup-btn');
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

  // Modal handling
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
});

