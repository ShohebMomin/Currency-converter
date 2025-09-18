import countryList from "./codes.js";
let BASE_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const img = document.querySelector(".selector-container img");
const input = document.querySelector(".container input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".message");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (currCode === "INR" && select.name === "from") {
      newOption.selected = "selected";
    } else if (currCode === "USD" && select.name === "to") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const currencyConverter = async () => {
  let amount = input.value;
  console.log(fromCurr.value, toCurr.value);
  if (amount === "" || amount < 1) {
    amount = 1;
    input.value = "1";
  }
  const URL = `${BASE_url}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let toCurrency = toCurr.value.toLowerCase();
  let fromCurrency = fromCurr.value.toLowerCase();
  const exchange = data[fromCurrency][toCurrency];
  const convertedCurrency = exchange * amount;
  message.textContent = `${amount} ${fromCurr.value} = ${convertedCurrency} ${toCurr.value}`;
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  currencyConverter();
});

window.addEventListener("load", () => {
  currencyConverter();
});

const themeBtn = document.querySelector(".theme-btn");
const body = document.getElementById("body");
const container = document.querySelector(".container");

const mode = () => {
  body.classList.toggle("dark");
  container.classList.toggle("dark");
  input.classList.toggle("dark");
  fromCurr.classList.toggle("dark");
  toCurr.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeBtn.textContent = "Light Mode";
  } else {
    themeBtn.textContent = "Dark Mode";
  }
};

themeBtn.addEventListener("click", mode);
