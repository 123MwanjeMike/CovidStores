var price = document.getElementById('price');
var initialPay = document.getElementById('initialPay');

var validate = () => {
    document.getElementById("submit").disabled = true;
    // Get dataset fields that need validation
    var photo = document.getElementById('photo');
    var itemName = document.getElementById('name');
    var make = document.getElementById('make');
    var serialNo = document.getElementById('serialNo');
    var category = document.getElementById('category');
    var numberInStock = document.getElementById('numberInStock');
    var payInterval = document.getElementById('payInterval');
    var error = document.getElementById('error');

    // Function to check for any essential empty fields
    var empty = (check) => {
        let mine = check.value.length;
        if (mine == "") {
            check.style.border = "1px solid red";
            error.textContent = "Image, item name, make, serial number, category, and price are all needed!"
            empty(check)
        } else if (check.value === "Select Category") {
            check.style.border = "1px solid red";
            error.textContent = "Please select a category!"
            empty(check)
        } else {
            check.style.border = "";
            error.textContent = ""
        }
    }
    empty(photo);
    empty(itemName);
    empty(make);
    empty(category);
    empty(numberInStock);
    empty(price);
    empty(initialPay);

    // Validating item name
    var letters = /^[a-zA-Z\s]+$/;
    if (!itemName.value.match(letters)) {
        itemName.style.border = "1px solid red";
        error.textContent = "Please enter only characters(no numbers) in Name input!";
    }
    // Validating item make
    var makeregex = /^[A-Z]{2}$/;
    if (!make.value.match(makeregex)) {
        make.style.border = "1px solid red";
        error.textContent = "Please enter strictly 2 capital letters in Make input!";
    }

    // Serial number
    var alphanumeric = /^[a-zA-Z0-9_]*$/;
    if (serialNo.value.length < 6 || serialNo.value.length > 22) {
        serialNo.style.border = "1px solid red";
        error.textContent = "Serial number should have 6 to 22 characters";
    } else if (!serialNo.value.match(alphanumeric)) {
        serialNo.style.border = "1px solid red";
        error.textContent = "Please enter only alphanumeric characters"
    }

    // Validating payment fields
    var numberegex = /^[0-9]+$/;
    if (!numberInStock.value.match(numberegex)) {
        numberInStock.style.border = "1px solid red";
        error.textContent = "Please enter a number in Number in stock!";
    }
    if (!price.value.match(numberegex)) {
        price.style.border = "1px solid red";
        error.textContent = "Please enter a number in Price!";
    }
    if (!payInterval.value.match(numberegex)) {
        payInterval.style.border = "1px solid red";
        error.textContent = "Please enter a number in Pay interval";
    }

    // Re-enabling the submit button after validation
    document.getElementById("submit").disabled = false;
}
// First installment calc
var firstInstall = () => {
    initialPay.value = price.value - (price.value / 2);
}
//This will ensure serial number is unique and will be set to a default value if no serial number is entered
var serialNumber = () => {
    var serialNo = document.getElementById('serialNo');
    if (serialNo.value.length < 9) {    //Removing useless figures
        serialNo.value += Date.now()
    }
}

var purchase = () => {
    var errors = document.getElementById('error');
    function required(input, error) {
        this.input = input.value
        this.error = error
        this.present = () => {
            if (this.input == "") {
                input.style.border = "1px solid red";
                errors.textContent = "Please enter " + this.error + "!"
            }else{
                input.style.border = "";
                errors.textContent = "";
            }
        }
    }
    // function regex(input, error, regex) {
    //     required.call(input, error)
    //     this.regex = regex
    //     this.format = () => {
    //         if (!this.input.value.match(this.regex)) {
    //             input.style.border = "1px solid red";
    //             errors.textContent = "Please enter a valid" +this.error+ "!"
    //         }
    //     }
    // }
    // regex.prototype = new required();
    var itemname = new required(document.getElementById('itemName'), "item name")
    itemname.present()
    // itemname.format()
}