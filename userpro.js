
import API_URL from './config.js'; 




  // Function to hide the loading animation
  function addwaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'block';
   
}


// Function to hide the loading animation
function hidewaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'none';

}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


var mobileno = getQueryParam('mobileno');
var email = getQueryParam('email');
console.log(email);
console.log(mobileno);


var username = "";


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
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, accountPassword, links, mobileno,email})
        });

        if (response.ok) {
            hidewaitingOverlay();
            const data = await response.json();
            document.getElementById('profileResponse').innerText = `Profile created your username is : ${data.username}`;

            username = data.username;
            mobileno = data.mobileno;
            
            
            document.getElementById("Next").style.display = 'block';

            
        } else {
            hidewaitingOverlay();
            const errorData = await response.json();
            document.getElementById('profileResponse').innerText = `Profile creation failed: ${errorData.message || 'Unknown error'}`;
        }
    } catch (error) {
        hidewaitingOverlay();
        console.error('Error:', error);
        document.getElementById('profileResponse').innerText = 'An error occurred!';
    }
});


// Event listener for Add Manager button
document.getElementById("Next").addEventListener("click", function () {
    
    window.location.href = `user.html?mobileno=${mobileno}&username=${username}`;
    

});
