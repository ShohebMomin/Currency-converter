import countryList from "./codes.js";

const dropdowns = document.querySelectorAll(".dropdown select");
console.log(dropdowns);
const img = document.querySelector(".selector-container img")


for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(currCode === "INR" && select.name === "from"){
      newOption.selected = "selected";
    } else if (currCode === "USD" && select.name === "to"){
      newOption.selected = "selected"
    }
    select.appendChild(newOption);
  }
}

