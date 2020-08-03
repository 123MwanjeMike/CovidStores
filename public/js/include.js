var validate = () => {
    document.getElementById("submit").disabled = true;
    // Get dataset fields that need validation
    var photo = document.getElementById('photo');
    var itemName = document.getElementById('name');
    var make = document.getElementById('make');
    var serialNo = document.getElementById('serialNo');
    var price = document.getElementById('price');
    var initialPay = document.getElementById('initialPay');
    var category = document.getElementById('category');
    var error = document.getElementById('error');

    // Function to check for any essential empty fields
    var empty = (check) => {
        let mine = check.value.length;
        if (mine == "") {
            check.style.border = "1px solid red";
            error.textContent = "Image, item name, make, serial number, category, and price are all needed "
            empty(check)
        } else if (check.value === "Select Category") {
            check.style.border = "1px solid red";
            error.textContent = "Please select a category"
            empty(check)
        } else {
            check.style.border = "";
            error.textContent = ""
        }
    }
    empty(photo);
    empty(itemName);
    empty(make);
    empty(serialNo);
    empty(category);
    empty(price);
    empty(initialPay);
    document.getElementById("submit").disabled = false;

    // Validating item name
    // The only accepted trend for letters in this
    var letters = /^[a-zA-Z]+$/;

    if (!itemName.value.match(letters)) {
        chars.style.border = "1px solid red";
        alert("Enter only characters for First Name, Last Name, Street, and City ");
    }

    // Checking that only image files are entered
    var imagee = /\.(gif|jpe?g|tiff|png|webp|bmp)$/;

    if (!photo.value.match(imagee)) {
        photo.style.border = "1px solid red";
        // alert("Please enter a valid image file ");
    }
}

// var installment = () => {
//     var purchase = window.prompt("Client Telephone number?");
//     if (purchase.length != "") {
//         window.location.href = '/agent/installment/'+purchase ;
//     }
// }