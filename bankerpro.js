
import API_URL from './config.js'; 

// Function to get query parameters 
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const mobileno = getQueryParam('mobileno');
const email = getQueryParam('email');

console.log(mobileno,email);



// Function to hide all forms
function hideAllForms() {
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
}


  // Function to hide the loading animation
  function addwaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'block';
   
}


// Function to hide the loading animation
function hidewaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'none';

}

// Event listener for profile form submission
document.getElementById('profileForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    addwaitingOverlay();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const accountPassword = document.getElementById('accountPassword').value;
    const links = document.getElementById('links').value;



    console.log('Profile Created:', { name, age, accountPassword, links, mobileno });

    // Send data to backend
    try {
        const response = await fetch(`${API_URL}/api/banker`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, accountPassword, links, mobileno,email})
        });

        if (response.ok) {
            hidewaitingOverlay();
            const data = await response.json();
            document.getElementById('profileResponse').innerText = `Profile created with ID: ${data.id}`;

            window.location.href = `banker.html?mobileno=${mobileno}`;
        } else {
            const errorData = await response.json();
            hidewaitingOverlay();
            document.getElementById('profileResponse').innerText = `Profile creation failed: ${errorData.message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('profileResponse').innerText = 'An error occurred!';
    }
});
