class User {
    constructor(accountNumber, username, initialBalance = 0.00) {
      this.accountNumber = accountNumber;
      this.username = username;
      this.balance = initialBalance;
      this.transactions = [];
    }
  
    // Method to add money to the user's account
    addMoney(amount) {
      if (amount > 0) {
        this.balance += amount;
        return true;
      }
      return false;
    }
  
    // Method to transfer money to another account
    transferMoney(amount, recipient) {
      if (amount > 0 && amount <= this.balance) {
        this.balance -= amount;
        this.transactions.push({ recipient: recipient.accountNumber, amount: amount });
        recipient.receiveMoney(amount, this.accountNumber);
        return true;
      }
      return false;
    }
  
    // Method to receive money from another account
    receiveMoney(amount, senderAccountNumber) {
      this.balance += amount;
      this.transactions.push({ sender: senderAccountNumber, amount: amount });
    }
  
    // Method to get the transaction history
    getTransactionHistory() {
      return this.transactions;
    }
  }
  
  const userManager = (() => {
    const users = {};
  
    // Function to create a new user
    const createUser = (accountNumber, username, initialBalance = 0.00) => {
      if (!users[accountNumber]) {
        users[accountNumber] = new User(accountNumber, username, initialBalance);
        return users[accountNumber];
      }
      return null; // User already exists
    };
  
    // Function to get a user by account number
    const getUser = (accountNumber) => {
      return users[accountNumber] || null;
    };
  
    return {
      createUser,
      getUser,
    };
  })();
  $(document).ready(function() {
    // Initial Users for Demo
    userManager.createUser('2003685', 'Fabunmi Ebenezer Oluwarotimi', 0.00);
    userManager.createUser('2003686', 'John Doe', 1000.00);
  
    // Login functionality
    $('#login-form').on('submit', function(e) {
      e.preventDefault();
      const accountNumber = $('#login-username').val();
      const user = userManager.getUser(accountNumber);
      
      if (user) {
        updateUIForLoggedInUser(user);
        alert('Login successful!');
      } else {
        alert('Account not found.');
      }
    });
  
    // Show Transaction History
    $('.history').on('click', function() {
      const accountNumber = $('.accountnumber').text().trim();
      const user = userManager.getUser(accountNumber);
      
      if (user) {
        displayTransactionHistory(user.getTransactionHistory());
      } else {
        alert('No user logged in.');
      }
    });
  
    // Add Money functionality
    $('.add-money').on('click', function() {
      $('#offcanvasTop').on('submit', 'form', function(e) {
        e.preventDefault();
        const accountNumber = $('.accountnumber').text().trim();
        const user = userManager.getUser(accountNumber);
        const amountToAdd = parseFloat($(this).find('input[type="number"]').val());
        
        if (user && user.addMoney(amountToAdd)) {
          updateBalanceUI(user);
          alert('Money added successfully!');
          $(this).find('input[type="number"]').val('');
        } else {
          alert('Invalid amount or account not found.');
        }
      });
    });
  
    // Transfer Money functionality
    $('.openModalBtn').on('click', function() {
      $('#myModal').show();
    });
  
    $('.close').on('click', function() {
      $('#myModal').hide();
    });
  
    $('#transferForm').on('submit', function(e) {
      e.preventDefault();
      const accountNumber = $('.accountnumber').text().trim();
      const recipientAccountNumber = $(this).find('input[type="text"]').val().trim();
      const amountToTransfer = parseFloat($(this).find('input[type="number"]').val());
      const user = userManager.getUser(accountNumber);
      const recipient = userManager.getUser(recipientAccountNumber);
      
      if (user && recipient && user.transferMoney(amountToTransfer, recipient)) {
        updateBalanceUI(user);
        alert('Transfer successful!');
        $(this).find('input').val('');
        $('#myModal').hide();
      } else {
        alert('Invalid transfer amount, insufficient funds, or recipient not found.');
      }
    });
  
    // Helper function to update the UI after a successful login
    function updateUIForLoggedInUser(user) {
      $('.account-holder').text(user.username);
      $('.money').text(user.balance.toFixed(2));
      $('.accountnumber').text(user.accountNumber);
    }
  
    // Helper function to update the balance UI
    function updateBalanceUI(user) {
      $('.money').text(user.balance.toFixed(2));
    }
  
    // Helper function to display transaction history
    function displayTransactionHistory(transactions) {
      if (transactions.length > 0) {
        let transactionHTML = '';
        transactions.forEach((transaction) => {
          if (transaction.recipient) {
            transactionHTML += `<p>Transferred &#8358; ${transaction.amount} to ${transaction.recipient}</p>`;
          } else if (transaction.sender) {
            transactionHTML += `<p>Received &#8358; ${transaction.amount} from ${transaction.sender}</p>`;
          }
        });
        $('.offcanvas-body').html(transactionHTML);
      } else {
        $('.offcanvas-body').html('<p>No transactions found.</p>');
      }
    }
  });
      