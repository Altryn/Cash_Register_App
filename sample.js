/*
  So let me be clear, 60% od this code is made by ai.
  because of my dumb problem solving skills.
  So Yeah this is not fully by me
*/

let price = 19.5;

// Cash that is available on the cashier
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

// The denomination (In Cent format)
const denominations = {
  'PENNY': 1, 'NICKEL': 5, 'DIME': 10, 'QUARTER': 25,
  'ONE': 100, 'FIVE': 500, 'TEN': 1000, 'TWENTY': 2000,
  'ONE HUNDRED': 10000
};

const changeDueEl = document.getElementById("change-due");
const statusEl = document.getElementById("status");
const priceEl = document.getElementById("price-cont");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");

priceEl.innerHTML = `Price: $${price}`;

const calculateChange = (cash) => {
  const cashCent = Math.round(Number(cash) * 100); //Convert it for better calculation
  const priceCent = Math.round(price * 100);
  const totalCid = cid.reduce((acc, [denom, amount]) => acc + Math.round(amount * 100),0);
  let change = (cashCent - priceCent);
  changeDueEl.innerHTML = "";

  if (change < 0) {
    return alert("Customer does not have enough money to purchase the item");
  }
  console.log(totalCid);
  console.log((totalCid + priceCent) / 100);
  console.log(change);
  if (totalCid === change) {
    changeDueEl.textContent = "Status: CLOSED";
    cid.forEach(([denom, amount]) => {
      if (amount > 0) {
        changeDueEl.innerHTML += `<br>${denom}: $${amount.toFixed(2)}`;
      }
    });
    return;
  } else if (totalCid < change) {
    changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  } else if (change === 0) {
    changeDueEl.textContent = "No change due - customer paid with exact cash";
    return;
  } else {
    changeDueEl.textContent = "Status: OPEN";
  }

  let result = [];
  const sortedDenoms = Object.entries(denominations).sort((a, b) => b[1] - a[1]);

  for (const [denom, nomValue] of sortedDenoms) {
    if (change >= nomValue) {
      const available = cid.find(item => item[0] === denom)[1] * 100;
      const count = Math.min(
        Math.floor(change / nomValue),
        Math.floor(available / nomValue)
      );
      if (count > 0) {
        const amountToGive = count * nomValue;
        change -= amountToGive;
        result.push([denom, amountToGive / 100]);
      }
    }
  }

  if (change > 0) {
    changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS";
  } else {
  result.forEach(([denom, amount]) => {
    changeDueEl.innerHTML += `
      <br> ${denom}: $${amount}
    `;
    });
  }
}

// calculateChange(parseFloat(3.26));
purchaseBtn.addEventListener('click', () => {
  calculateChange(cashInput.value);
})

cashInput.addEventListener('keydown', (e) => {

  if (e.key === "Enter") {
    calculateChange(cashInput.value);
  }
});