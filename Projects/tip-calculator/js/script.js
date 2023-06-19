const totalBill = document.getElementById("total");
const tipPercentage = document.getElementById("tipPercentage");
const btnCheck = document.getElementById("calculate");
const output = document.getElementById("output");
const splitBill = document.getElementById("split");

let calculateTip = () => {
    let tip = (totalBill.value * tipPercentage.value) / 100;
    output.innerHTML = `total is ${totalBill} with a ${tip} tip`;
    }

let splitBillAmount = () => {
    if (splitBill === null) {
        return;
    } else {
        let split = (totalBill.value * tipPercentage.value) / 100 / splitBill.value;
        output.innerHTML = `Each person has to pay: ${split}`;
    }
}




btnCheck.addEventListener("click", calculateTip);
