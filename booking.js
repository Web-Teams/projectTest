
var mainElement = document.getElementById("container");//main element


// create div contain form and header
var divElement = document.createElement("div");
divElement.classList.add("bookingDiv");

// create header element above the form    
var headerElement = document.createElement("h1");
headerElement.textContent = "Booking";
// append header element in the div 
divElement.appendChild(headerElement);

// create form element
var formElement = document.createElement("form");
formElement.action = "";
formElement.method = "post";
formElement.id = "form";


var dateAndTimeElement = document.createElement("div");
dateAndTimeElement.classList.add("dateAndTime");

// create div for date label and input
var dateDivElement = document.createElement("div");
// create label element for date label
var dateLabelElement = document.createElement("label");
dateLabelElement.setAttribute("for", "date");
dateLabelElement.textContent = "Date :";
dateDivElement.appendChild(dateLabelElement);
// create input element for date 
var dateInputElement = document.createElement("input");
dateInputElement.type = "date";
dateInputElement.id = "date";
dateInputElement.name = "date";
dateInputElement.required = true;
dateDivElement.appendChild(dateInputElement);

// create div for time label and input
var timeDivElement = document.createElement("div");
// create label element for time label
var timeLabelElement = document.createElement("label");
timeLabelElement.setAttribute("for", "time");
timeLabelElement.textContent = "Time :";
timeDivElement.appendChild(timeLabelElement);
// create input element for time
var timeInputElement = document.createElement("input");
timeInputElement.type = "time";
timeInputElement.id = "time";
timeInputElement.name = "time";
timeInputElement.required = true;
timeDivElement.appendChild(timeInputElement);

// append dateDivElement and timeDivElement in dateAndTimeElement
dateAndTimeElement.appendChild(dateDivElement);
// append timeDivElement in dateAndTimeElement div
dateAndTimeElement.appendChild(timeDivElement);

// append dateAndTimeElement in the form element
formElement.appendChild(dateAndTimeElement);






// create div element contain the number of people input
var numberOfPeopleElement = document.createElement("div");
numberOfPeopleElement.classList.add("numberOfPeople");
// create label element
var labelElement = document.createElement("label");
labelElement.setAttribute("for", "people");
labelElement.textContent = "Number of people :";
// append label element in the div element contain number of people :
numberOfPeopleElement.appendChild(labelElement);
// create number input element
var numberOfPeopleInputElement = document.createElement("input");
numberOfPeopleInputElement.type = "number";
numberOfPeopleInputElement.id = "people";
numberOfPeopleInputElement.name = "people";
numberOfPeopleInputElement.min = "1";
numberOfPeopleInputElement.required = true;
// append number input element in the div element contain number of people :
numberOfPeopleElement.appendChild(numberOfPeopleInputElement);
// append div element contain number of people input in the form element
formElement.appendChild(numberOfPeopleElement);





// Create div for full name
var fullNameDivElement = document.createElement("div");
fullNameDivElement.classList.add("fullNameDiv");

// First Name
var firstNameDivElement = document.createElement("div");
var firstNameLabel = document.createElement("label");
firstNameLabel.setAttribute("for", "firstName");
firstNameLabel.textContent = "First Name :";
firstNameDivElement.appendChild(firstNameLabel);
var firstNameInput = document.createElement("input");
firstNameInput.type = "text";
firstNameInput.id = "firstName";
firstNameInput.name = "firstName";
firstNameInput.required = true;
firstNameDivElement.appendChild(firstNameInput);
fullNameDivElement.appendChild(firstNameDivElement);

// Last Name
var lastNameDivElement = document.createElement("div");
var lastNameLabel = document.createElement("label");
lastNameLabel.setAttribute("for", "lastName");
lastNameLabel.textContent = "Last Name :";
lastNameDivElement.appendChild(lastNameLabel);
var lastNameInput = document.createElement("input");
lastNameInput.type = "text";
lastNameInput.id = "lastName";
lastNameInput.name = "lastName";
lastNameInput.required = true;
lastNameDivElement.appendChild(lastNameInput);
fullNameDivElement.appendChild(lastNameDivElement);

formElement.appendChild(fullNameDivElement);

// Create div for customer contact details
var customerContactDivElement = document.createElement("div");
customerContactDivElement.classList.add("customerContactDiv");

// Email
var emailDivElement = document.createElement("div");
var emailLabel = document.createElement("label");
emailLabel.setAttribute("for", "email");
emailLabel.textContent = "Email :";
emailDivElement.appendChild(emailLabel);
var emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.id = "email";
emailInput.name = "email";
emailInput.required = true;
emailDivElement.appendChild(emailInput);
customerContactDivElement.appendChild(emailDivElement);

// Phone Number
var phoneDivElement = document.createElement("div");
var phoneLabel = document.createElement("label");
phoneLabel.setAttribute("for", "phoneNumber");
phoneLabel.textContent = "Phone Number :";
phoneDivElement.appendChild(phoneLabel);
var phoneInput = document.createElement("input");
phoneInput.type = "tel";
phoneInput.id = "phoneNumber";
phoneInput.name = "phoneNumber";
phoneInput.required = true;
phoneDivElement.appendChild(phoneInput);
customerContactDivElement.appendChild(phoneDivElement);

formElement.appendChild(customerContactDivElement);

// Create div for comments
var commentsDivElement = document.createElement("div");
commentsDivElement.classList.add("comments");
var commentsLabel = document.createElement("label");
commentsLabel.setAttribute("for", "comments");
commentsLabel.textContent = "Comments :";
commentsDivElement.appendChild(commentsLabel);
var commentsTextArea = document.createElement("textarea");
commentsTextArea.id = "comments";
commentsTextArea.name = "comments";
commentsTextArea.required = true;
commentsDivElement.appendChild(commentsTextArea);
formElement.appendChild(commentsDivElement);






// create button element
var buttonElement = document.createElement("button");
buttonElement.textContent = "Submit";
// append button element to appear in the form element
formElement.appendChild(buttonElement);
// append form element to appear in the div contain header and form element
divElement.appendChild(formElement);





// append div element to appear in the body
mainElement.appendChild(divElement);
// append form element to appear in the div contain header and form element
divElement.appendChild(formElement);



// image element
var imageElement = document.createElement("img");
imageElement.src = "./booking.jpg";
imageElement.alt = "booking";
imageElement.classList.add("bookingImage");
// append img element to appear in the body
mainElement.appendChild(imageElement);

