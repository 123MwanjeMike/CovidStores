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
var initialPay = document.getElementById('initialPay');
var errors = document.getElementById('error');
var submit = document.getElementById('submit');
var mybutton = document.getElementById('mybutton');


// First installment calc
var firstInstall = () => {
    var price = document.getElementById('price');
    var initialPay = document.getElementById('initialPay');
    initialPay.value = price.value - (price.value / 2);
}

var balanceafter = () => {
    balance.value = (payment.value - initialPay.value)
}

//This will ensure serial number is unique and will be set to a default value if no serial number is entered
var serialNumber = () => {
    var serialNo = document.getElementById('serialNo');
    if (serialNo.value.length < 9) {    //Removing useless figures
        serialNo.value += Date.now()
    }
}

// A function that will do all my data validations system wide
var required = (input, error, regex) => {
    if (input.value.length == "") {
        input.style.border = "1px solid red";
        errors.textContent = "Please enter " + error + "!"
        submit.disabled = true;
        return false;
    } else {
        input.style.border = "";
        errors.textContent = "";
        submit.disabled = false;
    }
    if (regex != undefined) {
        if (!input.value.match(regex)) {
            input.style.border = "1px solid red";
            errors.textContent = "Please enter a valid " + error + "!"
            submit.disabled = true;
            return false;
        } else {
            input.style.border = "";
            errors.textContent = "";
            submit.disabled = false;
        }
    }
}

var validate = () => {
    if (required(make, "make", '^[A-Z]{2}$') === false) return 0
    if (required(photo, "item image") === false) return 0
    if (required(itemName, "item name", '^[a-zA-Z\s]+$') === false) return 0
    if (required(category, "a select category") == 0) return 0
    if (required(serialNo, "a serial number", '^[a-zA-Z0-9_]*$') == 0) return 0
    if (required(numberInStock, "number of items in stock", '^[0-9]+$') == 0) return 0
    if (required(price, "price", '^[0-9]+$') == 0) return 0
    if (required(initialPay, "initial pay", '^[0-9]+$') == 0) return 0
    if (required(payInterval, "pay interval", '^[0-9]+$') == 0) return 0
    // Serial number
    if (serialNo.value.length < 6 || serialNo.value.length > 22) {
        serialNo.style.border = "1px solid red";
        error.textContent = "Serial number should have 6 to 22 characters";
    }
}


var purchase = () => {
    if (required(fname, "first name") == 0) return 0
    if (required(lname, "last name") == 0) return 0
    if (required(address, "address") == 0) return 0
    if (required(tel, "telephone number") == 0) return 0
    if (required(email, "email") == 0) return 0
    // NIN starts with 3 characters in capital letters, followed by numbers and ends with characters in capital letters
    if (required(NIN, "National ID number", '^[A-Z]{3}[0-9]{7}[A-Z]{3}$') == 0) return 0
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

var productdetails = () => {
    mybutton.disabled = true;
    fetch('/agent/api/' + serialNo.value)
        .then(response => {
            return response.json();
        })
        .then(json => {
            itemName.value = json.item[0].name
            price.value = json.item[0].price
            payment.value = json.item[0].initialPay
            balance.value = (json.item[0].price - json.item[0].initialPay)
            DOP.value = currentdate(0);
            nDOP.value = currentdate(parseInt(json.item[0].payInterval));
            nextPay.value = (balance.value/2);
            console.log(json)
        })
        .catch(err => console.error(err));

    mybutton.disabled = false;
}
// Gets date, within t number of weeks
var currentdate = (t) => {
    today = new Date();
    var dd = today.getDate() + (t*7);// translates to a week
    var mm = today.getMonth() + 1; //January is 0.
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd+'/'+mm+'/'+yyyy;
}