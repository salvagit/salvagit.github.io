// Selectors
const value = document.getElementById("value");
const percentage = document.getElementById("percentage");
const depoMonths = document.getElementById("DepositMonths");
const stampCost = document.getElementById("StampCost");
const payCommission = document.getElementById("payCommission");
const CommissionPercentage = document.getElementById("CommissionPercentage");

// Helpers
const round = num => Math.round(num * 100) / 100;
const incrementPer = val => val + val * (percentage.value / 100);

const updateValues = () => {
  const first = Number(value.value);
  const second = incrementPer(first);
  const third = incrementPer(second);
  const fourth = incrementPer(third);

  document.getElementsByClassName("first")[0].innerHTML = `${first} $`;
  document.getElementsByClassName("first")[1].innerHTML = `${first} $`;
  document.getElementsByClassName("second")[0].innerHTML = `${second} $`;
  document.getElementsByClassName("third")[0].innerHTML = `${third} $`;
  document.getElementsByClassName("fourth")[0].innerHTML = `${fourth} $`;

  const totalDepo = depoMonths.value * fourth;
  const totalContract = 6 * first + 6 * second + 6 * third + 6 * fourth;
  let totalCommission = 0;
  const commissionPercentage = CommissionPercentage.value;

  if (payCommission.checked) {
    totalCommission = Math.round(totalContract * commissionPercentage) / 100;
  }

  const total = totalDepo + first + totalCommission + Number(stampCost.value);

  document.getElementsByClassName("total-deposit")[0].innerHTML = `${round(
    totalDepo
  )} $`;

  document.getElementsByClassName(
    "total-commission"
  )[0].innerHTML = `${totalCommission} $`;

  document.getElementsByClassName("total")[0].innerHTML = `${round(total)} $`;

  document.getElementsByClassName("total-contract")[0].innerHTML = `${round(
    totalContract
  )} $`;
};

value.addEventListener("keyup", updateValues);
percentage.addEventListener("keyup", updateValues);
depoMonths.addEventListener("keyup", updateValues);
stampCost.addEventListener("keyup", updateValues);
stampCost.addEventListener("keyup", CommissionPercentage);

payCommission.addEventListener("change", updateValues);

updateValues();
