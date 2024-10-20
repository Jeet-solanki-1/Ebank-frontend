import API_URL from "./config";

async function deactivateAccount() {

    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = fetch(`${API_URL}/api/users/delete?username=${username}&password=${password}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok) {
            const data = await response.json();
            document.getElementById('deleteresponseResponse').innerText = `Dear ${data.name} your ebank user account was deleted successfully `;



        } else {

            document.getElementById('deleteresponseResponse').innerText = "Incorrect creadintials !";


        }


        // Simulate account deletion
        alert("Your account has been deactivated.");
        window.location.href = "index.html"; // Redirect to signup page
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('profileResponse').innerText = 'An error occurred!';
    }
}