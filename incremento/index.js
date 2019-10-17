const value = document.getElementById("value");
const percentage = document.getElementById("percentage");
const commissionPercentage = 415;

const updateValues = () => {
  const first = Number(value.value);
  const second = first + Number(value.value) * (percentage.value / 100);
  const thrid = second + second * (percentage.value / 100);
  const fourth = thrid + second * (percentage.value / 100);

  document.getElementsByClassName("first")[0].innerHTML = `${first} $`;
  document.getElementsByClassName("second")[0].innerHTML = `${second} $`;
  document.getElementsByClassName("third")[0].innerHTML = `${thrid} $`;
  document.getElementsByClassName("fourth")[0].innerHTML = `${fourth} $`;
  document.getElementsByClassName("fourth")[1].innerHTML = `${fourth} $`;

  const depoMonths = document.getElementById("DepositMonths").value;

  const totalDepo = depoMonths * fourth;
  const totalContract = 6 * first + 6 * second + 6 * thrid + 6 * fourth;

  document.getElementsByClassName(
    "total-deposit"
  )[0].innerHTML = `${totalDepo} $`;

  document.getElementsByClassName(
    "total-commission"
  )[0].innerHTML = `${totalContract * (commissionPercentage / 100)} $`;
  document.getElementsByClassName(
    "total-contract"
  )[0].innerHTML = `${totalContract} $`;
};

value.addEventListener("keyup", updateValues);
percentage.addEventListener("keyup", updateValues);

updateValues();
