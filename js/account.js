// // Business logic
// function Bank() {
//   this.accounts = {};
//   this.currentId = 2209146835;
// }

// Bank.prototype.assignID = function() {
//   this.currentId += 1268;
//   return this.currentId;
// };

// Bank.prototype.addAccount = function(account) {
//   account.id = this.assignID();
//   this.accounts[account.id] = account;
// };

// Bank.prototype.deleteAccount = function(id) {
//   if (this.accounts[id] === undefined) {
//     return false;
//   }
//   delete this.accounts[id];
//   return true;
// };

// Bank.prototype.findAccount = function(id) {
//   if (this.accounts[id] != undefined) {
//     return this.accounts[id];
//   }
//   return false;
// };

// function AccountHolder(username, password, emailAddress) {
//   this.username = username;
//   this.password = password;
//   this.emailAddress = emailAddress;
//   this.balance = 0;
//   this.transactionHistory = [];
// }

// AccountHolder.prototype.getUsername = function() {
//   return this.username;
// };

// AccountHolder.prototype.getPassword = function() {
//   return this.password;
// };

// AccountHolder.prototype.getEmailAddress = function() {
//   return this.emailAddress;
// };

// AccountHolder.prototype.getBalance = function() {
//   return this.balance;
// };

// AccountHolder.prototype.addTransaction = function(amount, accountNumber) {
//   this.transactionHistory.push(new TransactionHistory(amount, accountNumber));
// };

// function TransactionHistory(amount, accountNumber) {
//   this.amount = amount;
//   this.accountNumber = accountNumber;
// }

// // User interface
// $(document).ready(function() {
//   const bank = new Bank();

//   $("form").submit(function(event) {
//     event.preventDefault();
//     loginAndSignUp($(this));
//   });

//   function loginAndSignUp(form) {
//     const formId = form.attr("id");
//     if (formId === "signup-form") {
//       const username = $("#signup-username").val();
//       const password = $("#signup-password").val();
//       const email = $("#exampleFormControlInput1").val();

//       const newAccount = new AccountHolder(username, password, email);
//       bank.addAccount(newAccount);
//       alert("Account created successfully!");
//       form[0].reset();
//     } else if (formId === "login-form") {
//       const accountNumber = $("#account-number").val();
//       const password = $("#login-password").val();

//       const account = bank.findAccount(accountNumber);
//       if (account && account.getPassword() === password) {
//         alert("Login successful!");
//         // Display account dashboard
//         displayAccountDashboard(account);
//       } else {
//         alert("Invalid account number or password");
//       }
//     }
//   }

//   function displayAccountDashboard(account) {
//     $(".body2").show();
//     $(".account-holder").text(account.getUsername());
//     $(".accountnumber").text(account.id);
//     $(".money").text(account.getBalance());

//     // Display transaction history
//     const transactionHistory = account.transactionHistory;
//     $(".offcanvas-body").html("");
//     transactionHistory.forEach((transaction) => {
//       const html = `
//         <p>
//           Transferred <span class="price">&#8358; ${transaction.amount} to </span
//           ><span class="account-number">${transaction.accountNumber}</span>
//         </p>
//       `;
//       $(".offcanvas-body").append(html);
//     });
//   }

//   const loginBtn = $("#login-btn");
//   const signupBtn = $("#signup-btn");
//   const loginForm = $("#login-form");
//   const signupForm = $("#signup-form");

//   loginBtn.click(function() {
//     loginForm.addClass("active");
//     signupForm.removeClass("active");
//     loginBtn.addClass("active");
//     signupBtn.removeClass("active");
//   });

//   signupBtn.click(function() {
//     signupForm.addClass("active");
//     loginForm.removeClass("active");
//     signupBtn.addClass("active");
//     loginBtn.removeClass("active");
//   });

//   const modal = $("#myModal");
//   $(".openModalBtn").on("click", function() {
//     modal.fadeIn();
//   });

//   $(".close").on("click", function() {
//     modal.fadeOut();
//   });

//   $(window).on("click", function(event) {
//     if ($(event.target).is(modal)) {
//       modal.hide();
//     }
//   });

//   // Transfer money functionality
//   $("#transferForm").submit(function(event) {
//     event.preventDefault();
//     const recipientAccountNumber = $("#recipient-account-number").val();
//     const amount = $("#transfer-amount").val();

//     const account = bank.findAccount(recipientAccountNumber);
//     if (account) {
//       const currentAccount = bank.findAccount($(".account-holder").text());
//       if (currentAccount.getBalance() >= amount) {
//         currentAccount.addTransaction(-amount, recipientAccountNumber);
//         account.addTransaction(amount, currentAccount.id);
//         alert("Transfer successful!");
//         displayAccountDashboard(currentAccount);
//       } else {
//         alert("Insufficient balance");
//       }
//     } else {
//       alert("Recipient account not found");
//     }
//   });

// // Add money functionality
// $("#add-money-form").submit(function(event) {
//   event.preventDefault();
//   const amount = $("#add-money-amount").val();

//   const currentAccount = bank.findAccount($(".account-holder").text());
//   if (currentAccount) {
//     currentAccount.addTransaction(amount, "Deposit");
//     alert("Money added successfully!");
//     displayAccountDashboard(currentAccount);
//   } else {
//     alert("Error adding money");
//   }
// });

// // Display account dashboard
// function displayAccountDashboard(account) {
//   $(".body2").show();
//   $(".account-holder").text(account.getUsername());
//   $(".accountnumber").text(account.id);
//   $(".money").text(account.getBalance());

//   // Display transaction history
//   const transactionHistory = account.transactionHistory;
//   $(".offcanvas-body").html("");
//   transactionHistory.forEach((transaction) => {
//     const html = `
//       <p>
//         ${transaction.amount > 0 ? "Deposited" : "Transferred"} <span class="price">&#8358; ${Math.abs(transaction.amount)} ${transaction.accountNumber ? "to " + transaction.accountNumber : ""}</span>
//       </p>
//     `;
//     $(".offcanvas-body").append(html);
//   });
// }
// });