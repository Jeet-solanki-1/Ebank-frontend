

import API_URL from './config.js'; 



// Function to get query parameter from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the character from the query parameter
const charType = getQueryParam('charType');
const mobileno = getQueryParam('mobileno');
const email = getQueryParam('email');
console.log(email);


// Check if character is not null or undefined
if (charType) {
    // Display the character-based message
    document.getElementById('characterWelcome').innerText = `Welcome, ${charType.charAt(0).toUpperCase() + charType.slice(1)}! Just a second, we are setting up your environment.`;
} else {
    document.getElementById('characterWelcome').innerText = 'Welcome! Please select a valid character.';
}

// Handle form submission
document.getElementById('profileForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
 
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;



    try {
        const response = await fetch(`${API_URL}/api/profiles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address, city, state, zip, country ,mobileno , charType})
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('profileResponse').innerText = `Profile created with ID: ${data.id}`;

            console.log(mobileno,email);
          
                // Redirect based on the selected character
                if (charType === "banker") {
                    window.location.href = `bankerpro.html?mobileno=${mobileno}&email=${email}`;
                } else if (charType === "user") {

                    window.location.href =`userpro.html?mobileno=${mobileno}&email=${email}`;

                  
                } else if (charType === "employee") {
                    window.location.href =`emppro.html?mobileno=${mobileno}&email=${email}`;
                } else if (charType === "manager") {
                    window.location.href =`manager.html?mobileno=${mobileno}&email=${email}`;
                }
           // Redirect after 1 second

        } else {
            document.getElementById('profileResponse').innerText = 'Profile creation failed!';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('profileResponse').innerText = 'An error occurred!';
    }
});
