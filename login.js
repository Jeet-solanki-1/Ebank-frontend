import API_URL from "./config.js";

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    let mobileno = document.getElementById("mobileno").value.trim();

    // Basic mobile number validation
    if (mobileno.length !== 10 || isNaN(mobileno)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // Make a GET request to the profile endpoint using the mobile number
    fetch(`${API_URL}/api/registrations/mobile/${mobileno}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            // Handle 404 error for mobile number not found
            if (response.status === 404) {
                throw new Error("Mobile number not found");
            }
        }
        return response.json(); // Parse the response
    })
    .then(data => {
        // Check if the data is empty to determine if the mobile number was not found
        if (data && Object.keys(data).length > 0) {
            // Assuming the server returns the full profile data
            document.getElementById("loginResponse").innerHTML = `You are successfully logged into your ${data.charType} account.`;
            const character = data.charType;
            console.log(data);

            // Redirect based on the selected character after 1 second
            setTimeout(() => {
                if (character === "banker") {
                    window.location.href = `banker.html?mobileno=${mobileno}`;
                } else if (character === "user") {
                    fetch(`${API_URL}/api/users/get/${mobileno}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    .then(response => response.json())
                    .then(userData => {
                        const username = userData.username;
                        window.location.href = `user.html?mobileno=${mobileno}&username=${username}`;
                    })
                    .catch(error => {
                        console.error('Error fetching user details:', error);
                    });
                } else if (character === "employee") {
                    window.location.href = `employee.html?mobileno=${mobileno}`;
                } else if (character === "manager") {
                    window.location.href = `manager.html?mobileno=${mobileno}`;
                }
            }, 500); // Redirect after 1 second
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        if (error.message === "Mobile number not found") {
            document.getElementById("loginResponse").innerHTML = "No mobile number found. Please check and try again.";
        } else {
            document.getElementById("loginResponse").innerHTML = "An unexpected error occurred. Please try again.";
        }
    });
});
