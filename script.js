/*
  So let me tell you guys, all this code is me that made it(not the cid and denom tho),
  there is the past script that uses ai but now i break that problem all by myself
  the past code is sample(idk why i name it like that)
*/

let price = 19.5;

// Cash in Drawer
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];;

// For DOM
const changeDueEl = document.getElementById("change-due");
const priceEl = document.getElementById("price-cont");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceSpan = document.getElementById("price-span");

priceEl.textContent = price;
// Denom in cent
const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

const calculateChanges = (cash) => {
  // convert the thing to cent for better calculation
  const cashInCent = Math.round(cash * 100);
  const priceInCent = Math.round(price * 100);
  let change = cashInCent - priceInCent;
  
  // Condition to check if the money is enough or not
  if (cashInCent < priceInCent) {
    return alert("Customer does not have enough money to purchase the item");
  }

  // Immedietly return the message if the money have no change
  if (cashInCent === priceInCent) {
    return changeDueEl.textContent = "No change due - customer paid with exact cash";
  }


  // Convert the cid to cent
  const cidInCent = cid
  .map( ([denom, amount]) => [
    denom,
    Math.round(amount * 100)
  ]);

  // calculate total cid for accurate change
  const totalCID = cidInCent
  .reduce((acc, [denom, amount]) => acc + amount, 0);

  changeDueEl.textContent = "Status: OPEN";

  if (totalCID < change) {
    return changeDueEl.textContent =  "Status: INSUFFICIENT_FUNDS";
  }

  if (totalCID === change) {
    changeDueEl.textContent = "Status: CLOSED";
  }


  // Reversing because we need to iterate from the biggest to get more accurate change
  const reverseCID = [...cidInCent].reverse();
  
  let result = [];

  /*
    ========================== HOW IS THE LOOP WORKING =============================

    so how this work is we iterate each of the cid in reverse(from biggest to smallest).

    and we check if the change is bigger or equal of any denomination[index], yea i am comfortable using this instead of for loop(i am afraid of endless loop) so i declare a separated variable. and if condition again when the change is not zero off course.

    if it false then skip and increment, if its true:
    -it would calculate the available change with min, so either the cid amount or the change
    -after that it count how many of that available change that "fit" for the change

    Note: so if the condition is met but the amount is not enough, it should say zero or something like that

    -and then it would calculate how many the total money is (total change) for that denom
    -and lastly it decreases each time it is good

    -like i said in the note if the amount is not enough it will skip and increment index to the next but if it isn't it will show the change and continue
  */

  let index = 0;
  for (const [denom, amount] of reverseCID) {
    if (change >= denominations[index] && change > 0) {
      const availableChange = Math.min(amount, change);
      // the available amount of denom(how many vhanges currency, like pennies etc)
      const count = Math.floor(availableChange / denominations[index]);
      const changeAmount = count * denominations[index];

      change -= changeAmount;
      if (count > 0) {
        result.push([denom, changeAmount / 100]);
      }
    }
    // Even if the condition not made iterate again
    index++;
  }
    
  /*
    This means if there are no currency that compatible with the change
    so the change is not empty
  */
  if (change > 0) {
    return changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS";
  };

  result
  .forEach(([denom, changeAmount]) => {
    changeDueEl.innerHTML += `
      <p>${denom}: $${changeAmount}</p>
    `
  });
};

purchaseBtn.addEventListener('click', () => {
  calculateChanges(cashInput.value);
})