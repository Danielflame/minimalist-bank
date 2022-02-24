'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP


// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2022-02-09T23:36:17.929Z',
    '2022-02-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];



// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');




//Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//Display transfer info
const displayMovements = function (acc,sort = false) {
  
  const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements ;
  //Empty the rows
  containerMovements.innerHTML = " ";

  movs.forEach(function (mov, i) {
    //Deposit or Withdrawal
    const type = mov > 0 ? "deposit" : "withdrawal";
    
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div> 
        <div class="movements__value">${formattedMov}</div>
      </div>
    `
    //Insert new rows to HTML
    containerMovements.insertAdjacentHTML('afterbegin' , html); //beforeend(to sort)


  });
  bgColor();
}

//Every 2nd row has a different background color
const bgColor = function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = '#ccc';
  })
};

//Printing the balance
const displayBalance = function(acc) {
  acc.balance = acc.movements.reduce((ini,amt) => ini + amt, 0);
  labelBalance.textContent = labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
}

//Display Total Deposit
const calcTotalDeposit = function (movements) {
  
}
calcTotalDeposit(account1.movements);

//Display Total Deposit Withdrawals and Interests
const calcDisplaySummary = function (acc) {
  //Total Deposits
  const income = acc.movements
  .filter(mov => mov > 0)
  .reduce((ini,curr) => ini+curr,0);
  labelSumIn.textContent = labelSumIn.textContent = formatCur(income, acc.locale, acc.currency);

  //Total Withdrawals
  const expenses = acc.movements
  .filter(mov => mov < 0)
  .reduce((ini,curr) => ini+curr,0);
  //Remove the minus sign
  labelSumOut.textContent = labelSumOut.textContent = formatCur(Math.abs(expenses), acc.locale, acc.currency);

  //Total Interest
  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(interest => interest * acc.interestRate/100)
  //Interest has to be greater than 1
  .filter((int,i,arr) => {
    // console.log(arr);
    return int > 1;
  })
  .reduce((ini,curr) => ini+curr,0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}

//Creating Usernames (Takes the first letter of every word from the accounts[0].owner property and joins them together)
const createUserName = function (accts) {
    accts.forEach(function (acct) {
      acct.userName = acct.owner.toLowerCase().split(' ')
    .map(name => name[0]).join('');
    });
    
}
createUserName(accounts);
console.log(accounts);

const updateUI = function (currentAccount) {
  //Display Movements
  displayMovements(currentAccount);
  //Display Balance
  displayBalance(currentAccount);
  //Display Summary
  calcDisplaySummary(currentAccount);
}

//Storing the current account
let currentAccount, timer;
btnLogin.addEventListener('click', function(g) {
  //Prevents Form from submitting
  g.preventDefault();
  // console.log('LOGIN');

  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
  console.log(currentAccount);

//Set Logout Timer
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};


//LOGIN
//if (currentAccount && currentAccount.pin === Number(inputLoginPin.value))
//Optional Chaining
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
      //Display UI and Welcome Message
      labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
      containerApp.style.opacity = 100;
      //Clear the input fields
      inputLoginPin.value = inputLoginUsername.value = '';
      inputLoginPin.blur();


      // Create current date and time
      const now = new Date();
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        // weekday: 'long',
      };
      // const locale = navigator.language;
      // console.log(locale);

      labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(now);


      // const now = new Date();
      // const day = `${now.getDate()}`.padStart(2, 0);
      // const month = `${now.getMonth() + 1}`.padStart(2, 0);
      // const year = now.getFullYear();
      // const hour = `${now.getHours()}`.padStart(2, 0);
      // const min = `${now.getMinutes()}`.padStart(2, 0);
      // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

      // Timer[stop any existing timer when someone logs in]
      if (timer) clearInterval(timer);
      timer = startLogOutTimer();

      //Update UI
      updateUI(currentAccount);
      bgColor();
  }
})

//Initiating Transfers
btnTransfer.addEventListener('click' , function(e) {
  e.preventDefault();
  const amount =Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
  // console.log(amount, receiverAcc.userName, currentAccount.userName);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && 
    receiverAcc?.userName !== currentAccount.userName) {
      receiverAcc.movements.push(amount);
      currentAccount.movements.push(-amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());

       // Reset timer
       clearInterval(timer);
       timer = startLogOutTimer();
     

       //Update UI
       updateUI(currentAccount);
       bgColor();
  }
})

//Requesting Loan
btnLoan.addEventListener('click' , function(e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  //One deposit must be greater than amount*0.1 to be eligible for loan
  const eligibleLoan = currentAccount.movements.some(mov => mov >= mov*0.1);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      bgColor();
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3500);
  }
  inputLoanAmount.value = '';
});

//Closing Accounts
btnClose.addEventListener('click' , function(e) {
  e.preventDefault();
  if (currentAccount?.pin === Number(inputClosePin.value) && currentAccount?.userName === inputCloseUsername.value) {
      const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
      console.log(index);
      //Delete Account
      accounts.splice(index, 1);
      //Hide UI
      containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
  inputClosePin.blur();
})

//Calculate overall balance in ll the accounts
const overallBalance = accounts
//Brings out all the movements array
.map(acc => acc.movements)
//Puts all the arrays in one array
.flat()
//Add all the values in the array
.reduce((acc,mov) => acc + mov , 0);
console.log(overallBalance);

//Flat Map
const overallBalanceMap = accounts
//Brings out all the movements array and Puts all the arrays in one array
.flatMap(acc => acc.movements)
//Add all the values in the array
.reduce((acc,mov) => acc + mov , 0);
console.log(overallBalanceMap);

//Sort 
let sorted = false;
btnSort.addEventListener('click' , function (e) {
  e.preventDefault();
  displayMovements(currentAccount,!sorted);
  // console.log('working oooooo');
  sorted = !sorted;

})

//Array.from
labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('💶' , '')));
  console.log(movementsUI);
  
});

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// const sar = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };
// const local = navigator.language;
// console.log(local);
// labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(sar);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



/////////////////////////////////////////////////
