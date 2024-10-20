

import API_URL from './config.js';


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var mobileno = getQueryParam('mobileno');

var username = getQueryParam('username')


console.log(mobileno, username);

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set cookie expiration in days
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}



let mainemail;

console.log(mobileno, username);

// Function to fetch and display the user profile details based on the username
async function updateProfileList(mobileno) {

    // If both cookies are present, ask the user if they want to auto-login

    // const userResponse = confirm(`We detected your mobile number ${mobileno}. Would you like to continue with this number?`);

    try {
        // Fetch the user details using the correct API path
        const response = await fetch(`${API_URL}/api/users/get/${mobileno}`);
        if (!response.ok) throw new Error('Network response was not ok');

        // Check if the response body is empty
        const text = await response.text();
        if (!text) throw new Error('Response body is empty');

        // Attempt to parse the text to JSON
        let userProfile;
        try {
            userProfile = JSON.parse(text);
        } catch (error) {
            throw new Error('Failed to parse JSON');
        }

        mainemail = userProfile.email;

        console.log(userProfile);

        // Store mobile number and character in separate cookies for auto-login on future visits (7 days)
        setCookie('mobileno', userProfile.mobileno, 7);


        const profilelist = document.getElementById('profilelist');
        profilelist.innerHTML = ''; // Clear the existing list before updating

        // Display the user profile details
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile-box');
        profileDiv.style.border = "1px solid #ccc";
        profileDiv.style.margin = "10px";
        profileDiv.style.padding = "10px";
        profileDiv.style.borderRadius = "5px";
        profileDiv.style.display = "block"; // Ensure block layout
        profileDiv.style.width = "80%"; // Ensure it takes full width

        // Create elements for different profile details
        // Username
        const usernameElem = document.createElement('span');
        const usernameLabel = document.createElement('span');
        const usernameData = document.createElement('span');

        usernameLabel.textContent = "Username: ";
        usernameLabel.style.color = "black";
        usernameData.textContent = userProfile.username;
        usernameData.style.color = "green";

        usernameElem.style.display = "block";
        usernameElem.style.marginBottom = "5px";
        usernameElem.appendChild(usernameLabel);
        usernameElem.appendChild(usernameData);


        //email
        const useremailElem = document.createElement('span');
        const useremailLabel = document.createElement('span');
        const useremailData = document.createElement('span');

        useremailLabel.textContent = "Email: ";
        useremailLabel.style.color = "black";
        useremailData.textContent = userProfile.email;
        useremailData.style.color = "green";

        useremailElem.style.display = "block";
        useremailElem.style.marginBottom = "5px";
        useremailElem.appendChild(useremailLabel);
        useremailElem.appendChild(useremailData);


        // Full Name
        const fullNameElem = document.createElement('span');
        const fullNameLabel = document.createElement('span');
        const fullNameData = document.createElement('span');

        fullNameLabel.textContent = " Name: ";
        fullNameLabel.style.color = "black";
        fullNameData.textContent = userProfile.name;
        fullNameData.style.color = "green";

        fullNameElem.style.display = "block";
        fullNameElem.style.marginBottom = "5px";
        fullNameElem.appendChild(fullNameLabel);
        fullNameElem.appendChild(fullNameData);

        // Email
        const emailElem = document.createElement('span');
        const emailLabel = document.createElement('span');
        const emailData = document.createElement('span');

        emailLabel.textContent = "Age : ";
        emailLabel.style.color = "black";
        emailData.textContent = userProfile.age;
        emailData.style.color = "green";

        emailElem.style.display = "block";
        emailElem.style.marginBottom = "5px";
        emailElem.appendChild(emailLabel);
        emailElem.appendChild(emailData);



        //mobileno

        const mobileElem = document.createElement('span');
        const mobileLabel = document.createElement('span');
        const mobileData = document.createElement('span');

        mobileLabel.textContent = "Mobile: ";
        mobileLabel.style.color = "black";
        mobileData.textContent = userProfile.mobileno;
        mobileData.style.color = "green";

        mobileElem.style.display = "block";
        mobileElem.style.marginBottom = "5px";
        mobileElem.appendChild(mobileLabel);
        mobileElem.appendChild(mobileData);



        //links

        const linksElem = document.createElement('span');
        const linksLabel = document.createElement('span');
        const linksData = document.createElement('span');

        linksLabel.textContent = "Link : ";
        linksLabel.style.color = "black";
        linksData.textContent = userProfile.links;
        linksData.style.color = "green";

        linksElem.style.display = "block";
        linksElem.style.marginBottom = "5px";
        linksElem.appendChild(linksLabel);
        linksElem.appendChild(linksData);


        // Append elements to profileDiv
        profileDiv.appendChild(usernameElem);
        profileDiv.appendChild(useremailElem);
        createhrtag(profileDiv);
        profileDiv.appendChild(fullNameElem);
        profileDiv.appendChild(emailElem);
        createhrtag(profileDiv);
        profileDiv.appendChild(mobileElem);
        profileDiv.appendChild(linksElem);



        // Append the profileDiv to the profileList
        profilelist.appendChild(profileDiv);




    } catch (error) {
        console.error('Error fetching profile details:', error);
    }

}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}




// Check if mobileno and character cookies exist
const cokiimobileno = getCookie("mobileno");

// Call the function to update the profile list
window.onload = async function () {
    mobileno = cokiimobileno;
    await updateProfileList(mobileno);
    updateaccountlist(mobileno);




}

// Function to create an hr tag and append it after elements
function createhrtag(parentElement) {
    const hr = document.createElement('hr');
    hr.style.color = "blue";
    parentElement.appendChild(hr);
}


async function updateaccountlist(mobileno) {

    document.getElementById('accountlist').style.display = 'block';
 

    try {
        const response = await fetch(`${API_URL}/api/account/all/${mobileno}`);
        if (!response.ok) throw new Error('Network response was not ok');

        // Check if response body is empty
        const text = await response.text();
        if (!text){
            document.getElementById('well').innerHTML = "No accounts created yet"
            throw new Error('Response body is empty');
           
        } 

        // Attempt to parse the text to JSON
        let accounts;
        try {
            accounts = JSON.parse(text);
        } catch (error) {
            throw new Error('Failed to parse JSON');
        }


        const accountlist = document.getElementById('accountlist');
        accountlist.innerHTML = ''; // Clear the existing list before updating

        // Populate list with bank details
        accounts.forEach(account => {
            const bankDiv = document.createElement('div');
            bankDiv.classList.add('bank-box');
            bankDiv.style.border = "1px solid #ccc";
            bankDiv.style.margin = "10px";
            bankDiv.style.padding = "10px";
            bankDiv.style.borderRadius = "5px";
            bankDiv.style.display = "block"; // Ensure block layout
            bankDiv.style.width = "80%"; // Ensure it takes full width

            // Bank Name
            const bankNameElem = document.createElement('span');
            const bankNameLabel = document.createElement('span');
            const bankNameData = document.createElement('span');

            // Setting the text and styles
            bankNameLabel.textContent = "Bank name: ";
            bankNameLabel.style.color = "black";

            bankNameData.textContent = account.bankName;
            bankNameData.style.color = "green";

            bankNameElem.style.display = "block";
            bankNameElem.style.marginBottom = "5px";

            bankNameElem.appendChild(bankNameLabel);
            bankNameElem.appendChild(bankNameData);

            // Manager Name
            const managerNameElem = document.createElement('span');
            const managerNameLabel = document.createElement('span');
            const managerNameData = document.createElement('span');

            managerNameLabel.textContent = "Account holder name: ";
            managerNameLabel.style.color = "black";

            managerNameData.textContent = account.name;
            managerNameData.style.color = "green";

            managerNameElem.style.display = "block";
            managerNameElem.style.marginBottom = "5px";

            managerNameElem.appendChild(managerNameLabel);
            managerNameElem.appendChild(managerNameData);

            // Account Number
            const bankFundElem = document.createElement('span');
            const bankFundlabel = document.createElement('span');
            const bankfunddata = document.createElement('span');

            bankFundlabel.textContent = "Account no  : ";
            bankFundlabel.style.color = "black";

            bankfunddata.textContent = account.accountno;
            bankfunddata.style.color = "green";

            bankFundElem.style.display = "block";
            bankFundElem.style.marginBottom = "5px";

            bankFundElem.appendChild(bankFundlabel);
            bankFundElem.appendChild(bankfunddata);

            // Bank Id
            const bankidelem = document.createElement('span');
            const bankidlable = document.createElement('span');
            const bankiddata = document.createElement('span');

            bankidlable.textContent = "Bank Id : ";
            bankidlable.style.color = "black";

            bankiddata.textContent = account.bankId;
            bankiddata.style.color = "green";

            bankidelem.style.display = "block";
            bankidelem.style.marginBottom = "5px";

            bankidelem.appendChild(bankidlable);
            bankidelem.appendChild(bankiddata);

            // Balance
            const bankusersElem = document.createElement('span');
            const bankuserslabel = document.createElement('span');
            const bankusersdata = document.createElement('span');

            bankuserslabel.textContent = "Balance : ";
            bankuserslabel.style.color = "black";

            bankusersdata.textContent = account.balance;
            bankusersdata.style.color = "green";

            bankusersElem.style.display = "block";
            bankusersElem.style.marginBottom = "5px";
            bankusersElem.appendChild(bankuserslabel);
            bankusersElem.appendChild(bankusersdata);

            // Account Type
            const bankempElem = document.createElement('span');
            const bankemplabel = document.createElement('span');
            const bankempdata = document.createElement('span');

            bankemplabel.textContent = "Account type  : ";
            bankemplabel.style.color = "black";

            bankempdata.textContent = account.accounttype;
            bankempdata.style.color = "green";

            bankempElem.style.display = "block";
            bankempElem.style.marginBottom = "5px";
            bankempElem.appendChild(bankemplabel);
            bankempElem.appendChild(bankempdata);

            // Open Button
            const openButton = document.createElement('button');
            openButton.textContent = "Open";
            openButton.style.display = "block";
            openButton.style.marginBottom = "10px";
            openButton.onclick = function () {
                openbank(account.bankName, account.name, account.accountno); // Use account.bankName here
            };

            // Append elements and create hr tags
            bankDiv.appendChild(bankNameElem);
            createhrtag(bankDiv); // Add <hr> after bank name

            bankDiv.appendChild(managerNameElem);
            createhrtag(bankDiv); // Add <hr> after manager name

            bankDiv.appendChild(bankFundElem);
            createhrtag(bankDiv); // Add <hr> after account no

            bankDiv.appendChild(bankidelem);
            createhrtag(bankDiv); // Add <hr> after bank id

            bankDiv.appendChild(bankempElem);
            createhrtag(bankDiv); // Add <hr> after account type

            bankDiv.appendChild(bankusersElem);
            createhrtag(bankDiv); // Add <hr> after balance

            bankDiv.appendChild(openButton);

            // Append the bankDiv to the accountlist
            accountlist.appendChild(bankDiv);
        });

    } catch (error) {
        console.error('Error fetching bank list:', error);
    }
}
let bankName2;
let name2;
let accno2;

// Function to handle opening the bank
function openbank(bankName, name, accnumber) {
    hideAllForms();
    // Show the operations section
    document.getElementById("main").style.display = 'block';
    document.getElementById("insideoperations").style.display = 'block';
    const date = new Date();
    const currentHour = date.getHours();

    // Checking the time to display appropriate greeting
    if (currentHour < 12) {
        document.getElementById('Gretings').innerHTML = `${bankName} - Good morning, ${name}`;
    }
    else if (currentHour >= 12 && currentHour < 19) {
        document.getElementById('Gretings').innerHTML = `${bankName} - Good afternoon, ${name}`;
    }
    else {
        document.getElementById('Gretings').innerHTML = `Good evening, ${name}. Have a good night! What can we do for you at ${bankName}?`;
    }


    bankName2 = bankName;
    name2 = name;
    accno2 = accnumber;


    console.log(accno2, bankName, name2);


}

window.operate = operate;

 async function operate(type) {

    if (type == "credittype") {
        const creditAmount = document.getElementById("creditAmount").value;
        const creditPassword = document.getElementById("creditPassword").value;

        const type = "credit";
        callingfn(type, creditAmount, accno2, creditPassword)


    }
    else if (type == "debittype") {
        const debitAmount = document.getElementById("debitAmount").value;
        const debitPassword = document.getElementById("debitPassword").value;

        const type = "debit";
        callingfn(type, debitAmount, accno2, debitPassword);

        console.log(accno2, debitPassword);
    }

}

window.callingfn = callingfn;

async function callingfn(type, amount, accountno, password) {
    try {
        // Construct the URL with query parameters
        const url = new URL(`${API_URL}/api/account/put`);
        const params = { type, amount, accountno, password };

        // Append the parameters to the URL
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is ok
        if (!response.ok) {
            const errorText = await response.text(); // Get the error response text
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await response.text(); // Parse the response text directly
        updateaccountlist(mobileno);
        // Handle different operations based on response
        if (data) {
            if (type === "credit") {
                document.getElementById("credited").innerHTML = `Your account has been credited by ${data}`;

            } else if (type === "debit") {
                document.getElementById("debited").innerHTML = `Your account has been debited by ${data}`;
            }
        } else {
            throw new Error('Operation failed, no valid data received');
        }
    } catch (error) {
        console.error('Error processing operation:', error);
        if (type === "credit") {
            document.getElementById("credited").innerHTML = error.message || "An error occurred. Please try again."; // Display error to the user
        } else if (type === "debit") {
            document.getElementById("debited").innerHTML = error.message || "An error occurred. Please try again."; // Display error to the user
        }

    }
}


window.searchBankbyname = searchBankbyname;


async function searchBankbyname() {
    const inputsearch = document.getElementById('inputsearch').value;

    hideAllForms();
    document.getElementById('bankList3').style.display = 'block';
    document.getElementById('resultof').style.display = 'block';




    try {
        const response = await fetch(`${API_URL}/api/bank/all`);
        if (!response.ok) throw new Error('Network response was not ok');

        const text = await response.text();
        if (!text) throw new Error('Response body is empty');

        let banks;
        try {
            banks = JSON.parse(text);
        } catch (error) {
            throw new Error('Failed to parse JSON');
        }

        // Filter the banks based on the Bank ID entered by the user
        const filteredBanks = banks.filter(bank => bank.bankName == inputsearch);

        const bankList3 = document.getElementById('bankList3');
        bankList3.innerHTML = ''; // Clear the list before updating

        // If no matching bank is found, show a message
        if (filteredBanks.length === 0) {

            document.getElementById('resultof').innerHTML = "No results for search : " + inputsearch;
            return;
        }
        document.getElementById('resultof').innerHTML = "Results for search : " + inputsearch;
        // Otherwise, display the matching bank
        filteredBanks.forEach(bank => {
            const bankDiv = document.createElement('div');
            bankDiv.classList.add('bank-box');
            bankDiv.style.border = "1px solid #ccc";
            bankDiv.style.margin = "10px";
            bankDiv.style.padding = "10px";
            bankDiv.style.borderRadius = "5px";
            bankDiv.style.width = "80%"; // Ensure it takes full width
            console.log(bank);

            // Bank Name
            const bankNameElem = document.createElement('span');
            const bankNameLabel = document.createElement('span');
            const bankNameData = document.createElement('span');

            bankNameLabel.textContent = "Bank name: ";
            bankNameLabel.style.color = "black";

            bankNameData.textContent = bank.bankName;
            bankNameData.style.color = "green";

            bankNameElem.style.display = "block";
            bankNameElem.style.marginBottom = "5px";
            bankNameElem.appendChild(bankNameLabel);
            bankNameElem.appendChild(bankNameData);

            // Manager Name
            const managerNameElem = document.createElement('span');
            const managerNameLabel = document.createElement('span');
            const managerNameData = document.createElement('span');

            managerNameLabel.textContent = "Manager of bank: ";
            managerNameLabel.style.color = "black";

            managerNameData.textContent = bank.managername;
            managerNameData.style.color = "green";

            managerNameElem.style.display = "block";
            managerNameElem.style.marginBottom = "5px";
            managerNameElem.appendChild(managerNameLabel);
            managerNameElem.appendChild(managerNameData);

            // Bank Funds
            const bankFundElem = document.createElement('span');
            const bankFundlabel = document.createElement('span');
            const bankfunddata = document.createElement('span');

            bankFundlabel.textContent = "Bank funds: ";
            bankFundlabel.style.color = "black";

            bankfunddata.textContent = bank.funds;
            bankfunddata.style.color = "green";

            bankFundElem.style.display = "block";
            bankFundElem.style.marginBottom = "5px";
            bankFundElem.appendChild(bankFundlabel);
            bankFundElem.appendChild(bankfunddata);

            // Bank currancy
            const bankcurrancyElem = document.createElement('span');
            const bankcurancylabel = document.createElement('span');
            const bankcurancydata = document.createElement('span');

            bankcurancylabel.textContent = "Bank currancy: ";
            bankcurancylabel.style.color = "black";

            bankcurancydata.textContent = bank.currencyOfBank;
            bankcurancydata.style.color = "green";

            bankcurrancyElem.style.display = "block";
            bankcurrancyElem.style.marginBottom = "5px";
            bankcurrancyElem.appendChild(bankcurancylabel);
            bankcurrancyElem.appendChild(bankcurancydata);


            // Bank currancy
            const bankusersElem = document.createElement('span');
            const bankuserslabel = document.createElement('span');
            const bankusersdata = document.createElement('span');

            bankuserslabel.textContent = "Trusted by users : ";
            bankuserslabel.style.color = "black";

            bankusersdata.textContent = bank.totalusers;
            bankusersdata.style.color = "green";

            bankusersElem.style.display = "block";
            bankusersElem.style.marginBottom = "5px";
            bankusersElem.appendChild(bankuserslabel);
            bankusersElem.appendChild(bankusersdata);


            // Bank ID
            const bankidelem = document.createElement('span');
            const bankidlable = document.createElement('span');
            const bankiddata = document.createElement('span');

            bankidlable.textContent = "Bank ID: ";
            bankidlable.style.color = "black";

            bankiddata.textContent = bank.bankId;
            bankiddata.style.color = "green";

            bankidelem.style.display = "block";
            bankidelem.style.marginBottom = "5px";
            bankidelem.appendChild(bankidlable);
            bankidelem.appendChild(bankiddata);





            // Open Button
            const openButton = document.createElement('button');
            openButton.textContent = "Create account";
            openButton.id = "create";
            openButton.style.display = "block";
            openButton.style.marginBottom = "10px";
            openButton.onclick = function () {
                openBank(bank.bankId, bank.bankName); // Use bank.bankName here
            };




            // Append elements to bankDiv
            bankDiv.appendChild(bankNameElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankidelem);
            createhrtag(bankDiv);
            bankDiv.appendChild(managerNameElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankFundElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankcurrancyElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankusersElem);
            createhrtag(bankDiv);


            bankDiv.appendChild(openButton);

            // Append the bankDiv to the bankList
            bankList3.appendChild(bankDiv);
        });

    } catch (error) {
        console.error('Error fetching bank list:', error);
    }
}




// Function to hide all forms
function hideAllForms() {
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
}
let email;

let names;
let age;
// Function to handle opening the bank (you can define your own logic here)
function openBank(bankid, bankName) {


    document.getElementById("Welcome").innerHTML = `Welcome to  ${bankName}`;

    hideAllForms();

    document.getElementById("createaccount").style.display = 'block';
    document.getElementById("welcomeform").style.display = 'block';

    document.getElementById("createnewacc").addEventListener("click", function () {
        newaccount(bankid, bankName);
    });

    document.getElementById("openexistingacc").addEventListener("click", function () {
        existingacc(bankid, bankName);
    });
}

async function finddetails(mobileno, bankid, bankName) {
    try {
        // Fetch the user details using the correct API path
        const response = await fetch(`${API_URL}/api/users/get/${mobileno}`);
        if (!response.ok) throw new Error('Network response was not ok');

        // Check if the response body is empty
        const text = await response.text();
        if (!text) throw new Error('Response body is empty');

        // Attempt to parse the text to JSON
        let userProfile;
        try {

            userProfile = JSON.parse(text);
            if (userProfile.email == mainemail) {

                email = userProfile.email;

                username = userProfile.username;
                names = userProfile.name;
                age = userProfile.age;
                console.log(email, names, age, username, bankid, bankName);

            } else {
                return;

            }
        } catch (error) {
            throw new Error('Failed to parse JSON');
        }





    } catch (error) {
        console.error('Error:', error);
    }
}


window.newaccount = newaccount;
async function newaccount(bankid, bankName) {
    hideAllForms();

    document.getElementById("createaccount").style.display = 'block';
    document.getElementById("createaccountform").style.display = 'block';

    document.getElementById('go').addEventListener('click', async function (event) {
        event.preventDefault();
        addwaitingOverlay();

        const mobileno = document.getElementById('mobileno').value;

        // Passing bankid and bankName correctly
        await finddetails(mobileno, bankid, bankName);
        console.log(email, names, username);

        // Send data to backend
        try {
            const response = await fetch(`${API_URL}/api/registrations/registerbank?email=${encodeURIComponent(email)}&name=${encodeURIComponent(names)}&bankName=${encodeURIComponent(bankName)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            if (response.ok) {
                hidewaitingOverlay();
                const data = await response.json();
                hideAllForms();
                document.getElementById("createaccount").style.display = 'block';
                // Pass bankid and bankName correctly here too
                varificationfn(mobileno, bankid, bankName);
                hidewaitingOverlay();

            } else {
                const errorData = await response.json();
                document.getElementById('creatnewaccResponse').innerText = `Invalid credentials: ${errorData.message || 'Unknown error'}`;
                hidewaitingOverlay();
            }

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('creatnewaccResponse').innerText = 'An error occurred!';
            hidewaitingOverlay();
        }
    });
}

window.varificationfn = varificationfn;
async function varificationfn(mobileno, bankid, bankName) {

    hideAllForms();

    document.getElementById("createaccount").style.display = 'block';
    document.getElementById("bankvarify").style.display = 'block';


    // Event listener for profile form submission
    document.getElementById('varify').addEventListener('click', async function (event) {
        event.preventDefault();

        const code = document.getElementById("code").value;

        // Basic verification code validation (optional)
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
                // Log the response status
                console.log('Response Status:', response.status);

                // Check if the response is OK
                if (!response.ok) {
                    throw new Error("Verification failed.");
                }
                // No need to parse JSON since there is no body
                return;
            })
            .then(() => {
                console.log(email, names, age, username, bankid, bankName)
                savefunction(mobileno, bankid, bankName);
            })
            .catch(error => {
                console.error("Error during verification:", error);
                document.getElementById("successmeasage").innerHTML = error.message || "Verification failed. Please try again.";
            });
    });


}

async function savefunction(mobileno, bankId, bankName) {
    hideAllForms();
    document.getElementById("createaccount").style.display = 'block';
    document.getElementById("addaccountdetails").style.display = 'block';

    document.getElementById('generate').addEventListener('click', async function (event) {
        event.preventDefault();
        addwaitingOverlay();

        const name = document.getElementById("name").value;
        const accounttype = document.getElementById("type").value;
        const balance = document.getElementById("balanace").value; // Corrected 'balanace' to 'balance'
        const password = document.getElementById("password").value;


        console.log(email, name, age, username, bankId, bankName); // Corrected 'names' to 'name'
        console.log(bankId);

        try {
            const response = await fetch(`${API_URL}/api/account/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    accounttype,
                    balance,
                    bankId,
                    mobileno,
                    bankName,
                    age,
                    email,
                    password
                })
            });

            if (response.ok) {
                hidewaitingOverlay();
                const data = await response.json();
                // Reset global variables only after successful account creation
                email = "";
                age = "";
                username = "";
                bankId = "";
                bankName = "";
                names = "";


                updateaccountlist(mobileno);
                opneaccounts(mobileno); // Assuming this function opens the accounts page

            } else {
                // Handle non-200 responses (e.g., 400 or 500 errors)
                const errorData = await response.json();
                document.getElementById('mess').innerText = `Account creation failed: ${errorData.error || 'Unknown error'}`;
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('mess').innerText = 'An error occurred!';
        }
    });
}

window.opneaccounts = opneaccounts;

async function opneaccounts(mobileno) {

    hideAllForms();
    updateaccountlist(mobileno);


    document.getElementById("seeyouraccountsacounts").style.display = 'block';
    // now print here all accounts of user 

}

// Function to hide the loading animation
function addwaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'block';

}


// Function to hide the loading animation
function hidewaitingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'none';

}


async function opencheckform() {
    hideAllForms();


    document.getElementById("bankoperations").style.display = 'block';

}
// Make the function globally accessible
window.opencheckform = opencheckform;

document.getElementById("checkballofacc").addEventListener("click", async function (event) {
    event.preventDefault();

    const accno = document.getElementById("accnumber").value;

    try {
        const response = await fetch(`${API_URL}/api/account/get/${accno}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }

        });

        if (response.ok) {
            hidewaitingOverlay();
            const data = await response.json();
            document.getElementById('createopenResponse2').innerText = 'hello ji!';

        } else {
            // Handle non-200 responses (e.g., 400 or 500 errors)
            const errorData = await response.json();
            document.getElementById('createopenResponse2').innerText = `Account no  failed: ${errorData.error || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('createopenResponse2').innerText = 'An error occurred!';

    }




})






async function existingacc(bankid, bankName) {


    hideAllForms();

    document.getElementById("createaccount").style.display = 'block';
    document.getElementById("openexistingaccform").style.display = 'block';



}


 function setProfile() {
    hideAllForms();


}