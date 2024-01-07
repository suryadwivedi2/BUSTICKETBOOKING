async function getformvalue(event) {
  event.preventDefault();
  const Name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value;
  const Phonenumber = document.getElementById('phonenumber').value
  const Address = document.getElementById('Address').value
  const Pincode = document.getElementById('pincode').value

  console.log(Name, email, Phonenumber, password, Address, Pincode);



  let user_details = {
    Name: Name,
    Email: email,
    Phone: Phonenumber,
    Password: password,
    Address: Address,
    Pincode: Pincode
  }

  const response = await axios.post('http://localhost:5000/user/add-user', user_details);
  if (response.status == 200) {
    alert(`Succesffuly added`)
    window.location.href = '../login/login.html';
  } else {
    console.log(err)
  }



}
var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");


function redirect() {
  window.location.href = '../Login/Login.html'
}



// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}


