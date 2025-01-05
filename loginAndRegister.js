function goToMenu() {
    window.location.href = 'menu.html'
}

function checkCurrentUser() {
    if (JSON.parse(localStorage.getItem("FlagCurrentUser"))) {
        var userNameContainer = document.getElementById("userNameContainer")
        userNameContainer.classList.remove("displayNone");
        var userName = document.getElementById("userName");
        userName.innerText = JSON.parse(localStorage.getItem("currentUser")).firstName + " " + JSON.parse(localStorage.getItem("currentUser")).lastName;
        var signInBtn = document.getElementById("signInBtn");
        signInBtn.classList.add("displayNone");
    }
}
checkCurrentUser()

function logoutUser() {

    if (checkCartHasItems()) {
        if (confirm("Are you sure you want to logout?")) {
            var dataOfCart = JSON.parse(localStorage.getItem("Data_Of_Cart"));
            if (dataOfCart.length > 0) {
                var userId = JSON.parse(localStorage.getItem("currentUser")).id
                var dataOfUser = JSON.parse(localStorage.getItem("usersArray"));
                for (var i = 0; i < dataOfUser.length; i++) {
                    if (dataOfUser[i].id == userId) {

                        var tempCarList = []
                        for (var k = 0; k < dataOfCart.length; k++) {
                            tempCarList.push(dataOfCart[k]);
                        }
                        console.log(tempCarList)
                        console.log(dataOfUser[i])
                        dataOfUser[i].cart = [...tempCarList];

                        localStorage.setItem("usersArray", JSON.stringify(dataOfUser));
                        break
                    }
                }
            }
        }
    }
    var userNameContainer = document.getElementById("userNameContainer")
    userNameContainer.classList.add("displayNone");
    var signInBtn = document.getElementById("signInBtn");
    signInBtn.classList.remove("displayNone");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("FlagCurrentUser");
    localStorage.removeItem("userApplyPromoCode");
    localStorage.removeItem("Data_Of_Cart");
    // window.location.href = 'home.html'
    getCartData()
    getDataOfCartCheckout()
    calculatedTotalPrice()

}
function checkCartHasItems() {
    if (JSON.parse(localStorage.getItem("Data_Of_Cart"))) {
        return true
    }
}
function toggleSignInForm() {
    var signInFormm = document.getElementById("login");
    signInFormm.classList.toggle("invisible");

    var signUpFormm = document.getElementById("signUp");
    signUpFormm.classList.add("invisible");

}


//sign up close
const closeButton = document.getElementById('signUpCloseBtn');
const signUpForm = document.getElementById('signUp');

closeButton.addEventListener('click', function () {
    signUpForm.classList.add('invisible');
});
//sign in close
const signInCloseButton = document.getElementById('signInCloseBtn');
const signInForm = document.getElementById('login');

signInCloseButton.addEventListener('click', function () {
    signInForm.classList.add('invisible');
});



function toggleSignUpForm() {
    var signInFormm = document.getElementById("login");
    signInFormm.classList.add("invisible");

    var signUpFormm = document.getElementById("signUp");
    signUpFormm.classList.remove("invisible");
}

document.getElementById('login').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;

    //get all users data from localStorage and convert it to JSON object and if usersArray is empty then occur error in loop for this we will make it with [] 
    let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
    // variable to know if user is already found
    let userFound = false;
    var indexOfUser;
    for (let i = 0; i < usersArray.length; i++) {
        let user = usersArray[i];
        if (user.email === email && user.password === password) {
            userFound = true;
            indexOfUser = i;
            break;
        }
    }

    if (userFound) {
        alert("Sign in successful!");
        //     <div id="userNameContainer">
        //     <span>
        //       <i class="fa-solid fa-user"></i>
        //       <p id="userName"> Ammar Ahmed Shafiq</p>

        //     </span>
        //   </div>
        localStorage.setItem("currentUser", JSON.stringify(usersArray[indexOfUser]));
        localStorage.setItem("FlagCurrentUser", true);

        var userNameContainer = document.getElementById("userNameContainer")
        var signInBtn = document.getElementById("signInBtn");
        signInBtn.classList.add("displayNone");
        var signUpDiv = document.getElementById("login")
        signUpDiv.classList.add("invisible")
        userNameContainer.classList.remove("displayNone");
        var userName = document.getElementById("userName");
        userName.innerText = usersArray[indexOfUser].firstName + " " + usersArray[indexOfUser].lastName;
        if (usersArray[indexOfUser].cart) {
            var cartUser = JSON.stringify(usersArray[indexOfUser].cart);
            localStorage.setItem("Data_Of_Cart", cartUser);
            getCartData()
            getDataOfCartCheckout()
            calculatedTotalPrice()

        }
        // if user found redirect to the home page
        // window.location.href = 'home.html';
    } else {
        alert("Sign in failed, please try again.");
    }

})

function validateSignInForm(email, password) {
    console.log(email);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    const passwordRegex = /^[A-Za-z0-9]{8,}$/
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters.");
        return false;
    }

    return true;
}

document.getElementById('signUp').addEventListener('submit', function (event) {
    event.preventDefault();
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const email = document.getElementById('signUpemail').value;
    const password = document.getElementById('signUpPassword').value;


    if (validateSignUpForm(fName, lName, email, password)) {
        // we say if usersArray  exists push user into it if not declair array
        let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
        var newUser = {
            id: usersArray.length + 1,
            firstName: fName,
            lastName: lName,
            email: email,
            password: password,
            cart: [],
            history: [],
            fristTime: true,
        };
        usersArray.push(newUser);
        localStorage.setItem('usersArray', JSON.stringify(usersArray));

        // localStorage.setItem('userFName', fName);
        // localStorage.setItem('userLName', lName);
        // localStorage.setItem('userEmail', email);
        // localStorage.setItem('userPassword', password);

        alert("Sign up successful!\n You can now login.");
        var signUpDiv = document.getElementById("signUp")
        signUpDiv.classList.add("invisible")
        var loginDiv = document.getElementById("login")
        loginDiv.classList.remove("invisible")
    } else {
        alert("Sign up failed, please try again.");
    }
})



function validateSignUpForm(fName, lName, email, password) {

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(fName)) {
        alert("First Name must contain only letters.");
        return false;
    }

    if (!nameRegex.test(lName)) {
        alert("Last Name must contain only letters.");
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    const passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters and contain capital or small letters or numbers.");
        return false;
    }

    return true;
}
