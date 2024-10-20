import API_URL from "./config.js"; // Ensure correct path

// Function to get query parameters 
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const mobileno = getQueryParam('mobileno');
let employeeid; // Declare employeeid variable

// Function to show the loading overlay
function addwaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'block';
}

// Function to hide the loading overlay
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
    const Description = document.getElementById('Description').value;

    console.log('Profile Created:', { name, age, accountPassword, links, mobileno });

    // Send data to backend
    try {
        const response = await fetch(`${API_URL}/api/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, accountPassword, links, mobileno, Description })
        });

        if (response.ok) {
            hidewaitingOverlay();
            const data = await response.json();
            document.getElementById('profileResponse').innerText = `Profile created. Your username is: ${data.employeeid}`;
            employeeid = data.employeeid; // Assign employeeid

            document.getElementById("Next").style.display = 'block'; // Show Next button
        } else {
            const errorData = await response.json();
            document.getElementById('profileResponse').innerText = `Profile creation failed: ${errorData.message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('profileResponse').innerText = 'An error occurred!';
    }
});

// Event listener for Add Manager button
document.getElementById("Next").addEventListener("click", function () {
    console.log(employeeid);
    window.location.href = `employee.html?mobileno=${mobileno}&employeeid=${employeeid}`;
});
