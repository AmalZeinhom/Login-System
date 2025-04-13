//! Global Login Variables
var email = document.getElementById("email");
var password = document.getElementById("password");

var validation_dialog = document.getElementById("validationDialog");
var closeDialogButton = document.getElementById("btn-closed");

var login_list = [];
var users_list = [];

//! CRUD Operations
//?? 1.Create
function submitData() {
  if (
    validationInputs(email, "msgEmail") &&
    validationInputs(password, "msgPassword")
  ) {

    loginEmail = email.value;
    loginPassword = password.value;
    var loginData = {
      loginEmail,
      loginPassword,
    };

    //* Check if user exists in registered users

    var matchUser = users_list.find(
      (user) =>
        user.registerEmail === loginEmail &&
        user.registerPassword === loginPassword
    );

    if (matchUser) {
      login_list.push(loginData);

      localStorage.setItem("login_list", JSON.stringify(login_list));
      localStorage.setItem("currentUser", matchUser.registerName);

      showDialog("Login successful! Redirecting to home...");
      clearInputs();

      setTimeout(() => {
        document.getElementById("login-section").classList.add("d-none");
        document.getElementById("home-section").classList.remove("d-none");
        document.getElementById("welcome-msg").innerHTML = `🌟 Welcome back, ${matchUser.registerName}! 🌟`;
      }, 1000);
    } else {
      showDialog("Incorrect email or password. Please try again.");
    }
  } else {
    validation_dialog.classList.remove("d-none");
  }
}

//** Clear Inputs
function clearInputs() {
  email.value = null;
  password.value = null;

  email.classList.remove("is-valid");
  password.classList.remove("is-valid");
}

//?? 2.Retrieve
if (localStorage.getItem("login_list") !== null) {
  login_list = JSON.parse(localStorage.getItem("login_list"));
}

//! Validation System

// function validationEmail() {
//   var regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{3,}$/;
//   var text = email.value;
//   var message = document.getElementById("msgEmail");

//   if (regex.test(text)) {
//     email.classList.add("is-valid");
//     email.classList.remove("is-invalid");
//     message.classList.add("d-none");

//     return true;
//   } else {
//     email.classList.add("is-invalid");
//     email.classList.remove("is-valid");
//     message.classList.remove("d-none");

//     return false;
//   }
// }
// function validationPassword() {
//   var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
//   var text = password.value;
//   var message = document.getElementById("msgPassword");

//   if (regex.test(text)) {
//     password.classList.add("is-valid");
//     password.classList.remove("is-invalid");
//     message.classList.add("d-none");

//     return true;
//   } else {
//     password.classList.add("is-invalid");
//     password.classList.remove("is-valid");
//     message.classList.remove("d-none");

//     return false;
//   }
// }
function validationInputs(element, msgID) {
  var text = element.value;
  var message = document.getElementById(msgID);
  var regex = {
    //?? It Likes to be the keyName same as the id
    email: /^[\w\-\.]+@([\w-]+\.)+[\w-]{3,}$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    registerEmail: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
    registerPassword: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    registerName: /^.{2,}$/,
  };

  //?? This'll return the specific regex which I want ==> regex[element.id]
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    message.classList.add("d-none");

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    message.classList.remove("d-none");

    return false;
  }
}

//! Event Listener
// Close when clicking the close button
closeDialogButton.addEventListener("click", function () {
  validation_dialog.classList.add("d-none");
});

// Close when clicking outside the dialog content
validation_dialog.addEventListener("click", function (e) {
  if (e.target === validation_dialog) {
    validation_dialog.classList.add("d-none");
  }
});

//?? =========================================================================================================================================

var regName = document.getElementById("registerName");
var regEmail = document.getElementById("registerEmail");
var regPassword = document.getElementById("registerPassword");

//! Create Register Operation
function register() {
  if (
    validationInputs(regEmail, "msgRegisterEmail") &&
    validationInputs(regPassword, "msgRegisterPassword") &&
    validationInputs(regName, "msgRegisterName")
  ) {
    var newUser = {
      registerName: regName.value,
      registerEmail: regEmail.value,
      registerPassword: regPassword.value,
    };

    //* Check if the email already exists
    var isAlreadyRegistered = users_list.some(
      (user) => user.registerEmail === newUser.registerEmail
    );

    if (isAlreadyRegistered) {
      showDialog("This email is already registered. Please use another one.");
    } else {
      users_list.push(newUser);
      localStorage.setItem("users_list", JSON.stringify(users_list));

      clearRegisterInputs();

      showDialog("Registered successfully! Redirecting to login...");

      document.getElementById("register-section").classList.add("d-none");
      document.getElementById("login-section").classList.remove("d-none");
    }
  } else {
    showDialog("Please fill all fields correctly.");
  }
}

//! Retrive Register Operation
if (localStorage.getItem("users_list") !== null) {
  users_list = JSON.parse(localStorage.getItem("users_list"));
}

function clearRegisterInputs() {
  regName.value = null;
  regEmail.value = null;
  regPassword.value = null;

  regName.classList.remove("is-valid");
  regEmail.classList.remove("is-valid");
  regPassword.classList.remove("is-valid");
}

function showDialog(message) {
  const dialogText = document.querySelector(".dialog-title");
  dialogText.innerText = message;
  validation_dialog.classList.remove("d-none");
}

//?? =========================================================================================================================================

//* Check if the user loged in before or not
window.addEventListener("load", function () {
  var currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    document.getElementById("login-section").classList.add("d-none");
    document.getElementById("register-section").classList.add("d-none");
    document.getElementById("home-section").classList.remove("d-none");
    document.getElementById("welcome-msg").innerHTML = `🌟 Welcome back, ${currentUser}! 🌟`;
  }
});

function logout() {
  document.getElementById("home-section").classList.add("d-none");
  document.getElementById("register-section").classList.add("d-none");
  document.getElementById("login-section").classList.remove("d-none");
}

document.getElementById("goToRegister").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("login-section").classList.add("d-none");
  document.getElementById("register-section").classList.remove("d-none");;
});

document.getElementById("forgotPassword").addEventListener("click", function(event){
  event.preventDefault();
  document.getElementById("login-section").classList.add("d-none");
  document.getElementById("register-section").classList.remove("d-none");
})



