var fname = document.getElementById('fname');
var lname = document.getElementById('lname');
var address = document.getElementById('address');
var tel = document.getElementById('tel');
var email = document.getElementById('email');
var NIN = document.getElementById('NIN');
var ref = document.getElementById('ref');
var serialNo = document.getElementById('serialNo');
var itemName = document.getElementById('itemName');
var price = document.getElementById('price');
var payment = document.getElementById('payment');
var DOP = document.getElementById('DOP');
var balance = document.getElementById('balance');
var nextPay = document.getElementById('nextPay');
var nDOP = document.getElementById('nDOP');
var receipt = document.getElementById('receipt');
var photo = document.getElementById('photo');
var make = document.getElementById('make');
var category = document.getElementById('category');
var numberInStock = document.getElementById('numberInStock');
var payInterval = document.getElementById('payInterval');
var payment = document.getElementById('payment');
var formError = document.getElementById('error');
var submit = document.getElementById('submit');
var mybutton = document.getElementById('mybutton');
var serialError = document.getElementById('serialError');

// First installment calc from add item page(not purchase)
var firstInstall = () => {
    var price = document.getElementById('price');
    var initialPay = document.getElementById('initialPay');
    initialPay.value = price.value - (price.value / 2);
}
//from new purchase and installment
var balanceafter = () => {
    balance.value = (price.value - payment.value)
}

// Gets date, within t number of months
Date.prototype.addMonths = function (m) {
    var d = new Date(this);
    var years = Math.floor(m / 12);
    var months = m - (years * 12);
    if (years) d.setFullYear(d.getFullYear() + years);
    if (months) d.setMonth(d.getMonth() + months);
    return d.toLocaleString("ca-ES");
}

// A function that will do all my data validations system wide
var required = (input, error, regex) => {
    if (input.value.length == "") {
        input.style.border = "1px solid red";
        formError.textContent = "Please enter " + error + "!"
        submit.disabled = true;
        return false;
    } else {
        input.style.border = "";
        formError.textContent = "";
        submit.disabled = false;
    }
    if (regex != undefined) {
        if (!input.value.match(regex)) {
            input.style.border = "1px solid red";
            formError.textContent = "Please enter a valid " + error + "!"
            submit.disabled = true;
            return false;
        } else {
            input.style.border = "";
            formError.textContent = "";
            submit.disabled = false;
        }
    }
}
// Item entry validation
var validate = () => {
    if (required(make, "make", '^[A-Z]{2}$') === false) return 0
    if (required(photo, "item image") === false) return 0
    if (required(itemName, "item name", '^[a-zA-Z]*$') === false) return 0
    if (required(category, "a select category") == 0) return 0
    if (required(serialNo, "a serial number", '^[a-zA-Z0-9_]*$') == 0) return 0
    if (required(numberInStock, "number of items in stock", '^[0-9]+$') == 0) return 0
    if (required(price, "price", '^[0-9]+$') == 0) return 0
    if (required(initialPay, "initial pay", '^[0-9]+$') == 0) return 0
    if (required(payInterval, "pay interval", '^[0-9]+$') == 0) return 0
    // Serial number
    if (serialNo.value.length < 6 || serialNo.value.length > 22) {
        serialNo.style.border = "1px solid red";
        formError.textContent = "Serial number should have 6 to 22 characters";
    }
}

// Purchase detail validation
var purchase = () => {
    // NIN starts with 3 characters in capital letters, followed by numbers and ends with characters in capital letters
    if (required(NIN, "National ID number", '^[A-Z]{3}[0-9]{7}[A-Z]{3}$') == 0) return 0
    if (required(fname, "first name") == 0) return 0
    if (required(lname, "last name") == 0) return 0
    if (required(address, "address") == 0) return 0
    if (required(tel, "telephone number") == 0) return 0
    if (required(email, "email") == 0) return 0
    if (required(ref, "referee number") == 0) return 0
    if (required(serialNo, "serial number") == 0) return 0
    if (required(itemName, "item name", '^[a-zA-Z\s]+$') == 0) return 0
    if (required(price, "price", '^[0-9]+$') == 0) return 0
    if (required(payment, "payment", '^[0-9]+$') == 0) return 0
    if (required(DOP, "date of payment") == 0) return 0
    if (required(balance, "balance", '^[0-9]+$') == 0) return 0
    if (required(nextPay, "date of next pay") == 0) return 0
    if (required(receipt, "receipt number") == 0) return 0
}

//For serial number must be unique
var serialNumber = () => {
    if (serialNo.value.length == "") {
        serialError.textContent = "Please enter Serial Number";
        submit.disabled = true;
        return 0;
    }
    fetch('/agent/api/' + serialNo.value)
        .then(response => {
            return response.json();
        })
        .then(json => {
            if (json.item[0] === undefined) {
                serialError.textContent = "";
                formError.textContent = "";
                submit.disabled = false;
                return 0;
            } else {
                serialError.textContent = "Item with Serial Number '" + serialNo.value + "' already exists";
                formError.textContent = "Item with Serial Number '" + serialNo.value + "' already exists";
                submit.disabled = true;
                return 0;
            }
        })
        .catch(err => {
            serialError.textContent = "Something went wrong! Please reload page";
            console.error(err)
            return 0;
        });
}
// Item search by serial number
var productdetails = () => {
    mybutton.disabled = true;
    if (serialNo.value.length == "") {
        serialError.textContent = "Enter a Serial Number to continue";
        submit.disabled = true;
        return 0;
    }
    fetch('/agent/api/' + serialNo.value)
        .then(response => {
            return response.json();
        })
        .then(json => {
            if (json.item[0] === undefined) {
                serialError.textContent = "Item with serial number '" + serialNo.value + "' not found";
                return 0;
            }
            itemName.value = json.item[0].name;
            price.value = json.item[0].price;
            payment.value = json.item[0].initialPay;
            balance.value = (json.item[0].price - json.item[0].initialPay);
            payInterval.value = json.item[0].payInterval;
            DOP.value = new Date().addMonths(0);
            nDOP.value = new Date().addMonths(json.item[0].payInterval);
            nextPay.value = (balance.value / 2);
        })
        .catch(err => {
            serialError.textContent = "Something went wrong, try again";
            console.error(err)
            return 0;
        });

    mybutton.disabled = false;
}
// Installment payment validation
var installmentpaid = () => {
    balanceafter();
    DOP.value = new Date().addMonths(0);
    nDOP.value = new Date().addMonths(payInterval.value);
    nextPay.value = (balance.value / 2);
}