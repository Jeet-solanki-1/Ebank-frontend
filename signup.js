

import API_URL from './config.js'; 


let charType

window.charType= charType;
// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set cookie expiration in days
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get query parameter from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


document.addEventListener("DOMContentLoaded", function() {
     charType = getQueryParam('charType');
    if (charType) {
        document.getElementById('characterWelcome').innerText = `Welcome, ${charType.charAt(0).toUpperCase() + charType.slice(1)}!`;
        document.getElementById('registrationSection').style.display = 'block';
    } else {
        document.getElementById('characterWelcome').innerText = 'No character selected.';
    }
});



// Normal flow: Ensure character is defined
if (charType) {
    // Display the character-based welcome message
    document.getElementById('characterWelcome').innerText = `Welcome, ${charType.charAt(0).toUpperCase() + charType.slice(1)}! Just a second, we are setting up your environment.`;
    document.getElementById('registrationSection').style.display = 'block'; // Show the registration form
} else {
    document.getElementById('characterWelcome').innerText = 'No character selected. Please go back and choose a character.';
}

  // Function to hide the loading animation
  function addwaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'block';
   
}


// Function to hide the loading animation
function hidewaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'none';

}

let mobileno;
let email;

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    addwaitingOverlay();
    mobileno = document.getElementById("mobileno").value; 
    email = document.getElementById("email").value;

    // Basic mobile number validation
    if (mobileno.length !== 10 || isNaN(mobileno)) {
        alert("Please enter a valid 10-digit mobile number.");
        hidewaitingOverlay();
        return;
    }

    // Make a POST request to the registration/register endpoint with a JSON body
    fetch(`${API_URL}/api/registrations/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            mobileno: mobileno
        })
    })
    .then(async response => {
        if (!response.ok) {
            if (response.status === 409) {
                throw new Error("Mobile number already registered.");
            } else {
                const errData = await response.json();
                throw new Error(JSON.stringify(errData));
            }
        }
        return response.json();
    })
    .then(data => {
        // Display success message
        hidewaitingOverlay();
        console.log(data);
        document.getElementById('registrationSection').style.display = 'none';
        document.getElementById('verification').style.display = 'block';
    })
    .catch(error => {
        console.error("Error during registration:", error);
        hidewaitingOverlay();
        document.getElementById("registrationResponse").innerHTML = error.message || "Registration failed. Please try again.";
    });
});
console.log(charType)
document.getElementById("verification").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const code = document.getElementById("verificationcode").value;

    // Basic verification code validation
    if (code.length !== 6 || isNaN(code)) {
        alert("Please enter a valid 6-digit code.");
        return;
    }

    // Make a POST request to the registration/verify endpoint with the verification code
    fetch(`${API_URL}/api/registrations/verify?code=${encodeURIComponent(code)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Verification failed.");
        }
        return;
    })
    .then(() => {
        console.log(charType)
        savefunction(charType); // Proceed to save the user details after verification
    })
    .catch(error => {
        console.error("Error during verification:", error);
        document.getElementById("registrationResponse").innerHTML = error.message || "Verification failed. Please try again.";
    });
});



async function savefunction(charType) {
    // Make a POST request to save the user after verification
    fetch(`${API_URL}/api/registrations/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mobileno: mobileno,
            charType: charType,
            email: email
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("User saving failed.");
        }
    const data=  response.json;
        console.log(data);
        setTimeout(() => {
            console.log(data);
        }, 2000);
        return;
    })
    .then(() => {
        setCookie("mobileno", mobileno, 7);
        setCookie("charType", charType, 7);
        setCookie("email", email, 7);
        setTimeout(() => {
            console.log(data);
        }, 2000);
     
        window.location.href = `profile.html?mobileno=${mobileno}&charType=${charType}&email=${email}`;
    })
    .catch(error => {
        console.error("Error during user save:", error);
        document.getElementById("registrationResponse").innerHTML = error.message || "User saving failed. Please try again.";
    });
}

