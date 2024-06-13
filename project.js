//       Steps
// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. spin th slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUM = 3;

const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: $");
    const numberDepositamount = parseFloat(depositAmount);

    if (isNaN(numberDepositamount) || numberDepositamount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } else {
      return numberDepositamount;
    }
  }
};

const getNumberofLines = () => {
  while (true) {
    console.log();
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberoflines = parseFloat(lines);

    if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3) {
      console.log("Invalid , try again.");
    } else {
      return numberoflines;
    }
  }
};

const getbet = (balance, lines) => {
  while (true) {
    console.log();
    const bet = prompt("Enter the bet per line: ");
    const totalbet = parseFloat(bet);

    if (isNaN(totalbet) || totalbet <= 0 || totalbet > balance / lines) {
      console.log("Invalid entry/amount. Please try again ! ");
    } else {
      return totalbet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLUM; i++) {
    reels.push([]);
    const reelsymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelsymbols.length);
      const selectedSymbol = reelsymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelsymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLUM; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

console.log();

const printRows = (rows) => {
  console.log();
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i !== row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const Winningbet = (rows, bet, lines) => {
  let winning = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allsame = true;

    for (const symbol of symbols) {
      if (symbol !== symbols[0]) {
        allsame = false;
        break;
      }
    }

    if (allsame) {
      winning += bet * SYMBOL_VALUE[symbols[0]];
    }
  }
  return winning;
};

const rungame = () => {
  let balance = deposit();
  while (true) {
    // const depositAmount = deposit();
    console.log();
    console.log("You have a balance of $ " + balance + " now ");
    const numberoflines = getNumberofLines();
    const bet = getbet(balance, numberoflines);
    balance -= bet * numberoflines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winning = Winningbet(rows, bet, numberoflines);
    balance += winning;
    console.log();
    console.log("You won, $ " + winning.toString());
    console.log();

    if (balance <= 0) {
      console.log();
      console.log("You ran out of money");
      break;
    }
    console.log();
    let playagain;
    while (true) {
      try {
        playagain = prompt("Do you want to play again (y/n): ").toLowerCase();
        if (playagain !== "y" && playagain !== "n") {
          console.log();
          throw new Error("Oops! Invalid entry. Please enter 'y' or 'n'.");
        }
        break; // valid input, exit the loop
      } catch (error) {
        console.log();
        console.log(error.message);
      }
    }

    if (playagain === "n") {
      break;
    }
  }

  console.log();
  console.log("Thank you for playing slot game. ");
};

rungame();
