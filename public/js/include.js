// Validating user input
var validate = () => {
    // Get dataset fields that need validation
    var Firstname = document.getElementById('firstname');
    var Lastname = document.getElementById('lastname');
    var Street = document.getElementById('street');
    var City = document.getElementById('city');
    var Biography = document.getElementById('biography');
    var Image = document.getElementById('image');

    // Function to check for any empty fields
    var empty = (check) => {
        let mine = check.value.length;
        if (mine == "") {
            check.style.border = "1px solid red";
            alert("Please enter all fields!");
        }
    }
    empty(Firstname);
    empty(Lastname);
    empty(Street);
    empty(City);
    empty(Biography);
    empty(Image);

    // Function to check is only characters are entered
    var charactersOnly = (chars) => {
        // The only accepted trend for letters in the text field sets
        var letters = /^[a-zA-Z]+$/;

        if (!chars.value.match(letters)) {
            chars.style.border = "1px solid red";
            alert("Enter only characters for First Name, Last Name, Street, and City ");
        }
    }
    charactersOnly(firstname);
    charactersOnly(lasstname);
    charactersOnly(street);
    charactersOnly(city);

    // Checking that only image files are entered
    var imagee = /\.(gif|jpe?g|tiff|png|webp|bmp)$/;

    if (!Image.value.match(imagee)) {
        Image.style.border = "1px solid red";
        alert("Please enter a valid image file ");
    }
}

var installment = () => {
    var purchase = window.prompt("Client Telephone number?");
    if (purchase.length != "") {
        window.location.href = '/agent/installment?telephone=' + purchase;
    }
}