// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. spin th slot machine
// 5. check if the user won
// 6. give the user thri winnings
// 7. play again
const prompt = require("prompt-sync")();


const ROWS = 3;
const COLUM = 3;

const SYMBOL_COUNT={
   A : 2,
   B : 4,
   C : 6,
   D : 8
}


const SYMBOL_VALUE={
   A : 5,
   B : 4,
   C : 3,
   D : 2
}

const deposit = () => {
  while(true){
    const depositAmount = prompt("Enter a deposit amount: $");
     const numberDepositamount = parseFloat(depositAmount);

     if ( isNaN(numberDepositamount) || numberDepositamount <=0){
        console.log("Invalid deposit amount, try again.");
     }else{
        return numberDepositamount;
     }
    }
};


const getNumberofLines = () => {
    while(true){
      console.log();
        const  lines = prompt("Enter the number of lines to bet on (1-3): ");
         const numberoflines = parseFloat(lines);
    
         if ( isNaN(numberoflines) || numberoflines <=0 || numberoflines > 3){
            console.log("Invalid , try again.");
         }else{
            return numberoflines;
         }
        }

}


const getbet = (balance,lines) => {
   while(true){
   console.log();
      const bet = prompt("Enter the bet per line: ");
      const totalbet= parseFloat(bet);

      if( isNaN(totalbet) || totalbet <=0 || totalbet > balance/lines){
         console.log("Invalid entry/amount. Please try again ! ");
      }
      else{
         return totalbet;
      }
   }
    
   
};

const spin = () =>{
   const symbols= [];
   for( const [symbol, count] of Object.entries(SYMBOL_COUNT)){
      for( let i=0; i< count ; i++){
         symbols.push(symbol);
      }
   }
   const reels = [[],[],[]];
   for(let i=0; i< COLUM;i++){
      const reelsymbols = [...symbols];
      for(let j=0; j<ROWS;j++){
         const randomIndex = Math.floor(Math.random()* reelsymbols.length);
         const selectedSymbol = reelsymbols[randomIndex];
         reels[i].push(selectedSymbol);
         reelsymbols.splice(randomIndex,1);

      }
   }
   return reels;
};
const transpose= (reels) => {
   const rows = [];
   for ( let i=0;i<ROWS;i++){
      rows.push([]);
      for( let j=0; j< COLUM; j++){
         rows[i].push(reels[j][i]);
      }
   }
   return rows;
};

console.log();

const printRows = (rows) => {
   console.log();
   for (const row of rows){
      let rowString = "";
      for( const [i, symbol] of row.entries()){
         rowString += symbol;
         if(i != row.length -1){
            rowString += " | ";
            console.log();
         }
      }
      console.log(rowString);
   }
   
}

let balance = deposit();
// const depositAmount = deposit();
const numberoflines = getNumberofLines();
const bet = getbet(balance, numberoflines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);




