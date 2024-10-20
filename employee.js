
import API_URL from "./config";


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const mobileno = getQueryParam('mobileno');
const employeeid = getQueryParam('employeeid');

// Function to fetch and display the user profile details based on the mobile number
async function updateProfileList() {
    try {
        // Fetch the user details using the correct API path
        const response = await fetch(`${API_URL}/api/employee/get/${mobileno}`);
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

        const profilelist = document.getElementById('profilelist');
        profilelist.innerHTML = ''; // Clear the existing list before updating

        // Create a container div for the user profile
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile-box');
        profileDiv.style.border = "1px solid #ccc";
        profileDiv.style.margin = "10px";
        profileDiv.style.padding = "10px";
        profileDiv.style.borderRadius = "5px";
        profileDiv.style.display = "block";
        profileDiv.style.width = "80%";

        // Username (Employee ID)
        const usernameElem = createProfileElement("Employee ID: ", userProfile.employeeid);
        profileDiv.appendChild(usernameElem);

        // Full Name
        const fullNameElem = createProfileElement("Name: ", userProfile.name);
        profileDiv.appendChild(fullNameElem);

        // Mobile Number
        const mobileElem = createProfileElement("Mobile: ", userProfile.mobileno);
        profileDiv.appendChild(mobileElem);

        // Links
        const linksElem = createProfileElement("Link: ", userProfile.links);
        profileDiv.appendChild(linksElem);

        // Description (About)
        const descriptionElem = createProfileElement("About: ", userProfile.description);
        profileDiv.appendChild(descriptionElem);

        // Append the profileDiv to the profileList
        profilelist.appendChild(profileDiv);

    } catch (error) {
        console.error('Error fetching profile details:', error);
    }
}

// Utility function to create and style profile elements
function createProfileElement(labelText, dataText) {
    const elem = document.createElement('span');
    const label = document.createElement('span');
    const data = document.createElement('span');

    label.textContent = labelText;
    label.style.color = "black";
    data.textContent = dataText;
    data.style.color = "green";

    elem.style.display = "block";
    elem.style.marginBottom = "5px";
    elem.appendChild(label);
    elem.appendChild(data);

    return elem;
}


// Call the function to update the profile list
window.onload = async function () {
    await updateProfileList();

}

// Function to create an hr tag and append it after elements
function createhrtag(parentElement) {
    const hr = document.createElement('hr');
    hr.style.color = "blue";
    parentElement.appendChild(hr);
}




async function searchBankbyname() {
    const inputsearch = document.getElementById('inputsearch').value;

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
            bankList3.innerHTML = `<p>No bank found with Bank ID: ${bankIdInput}</p>`;
            return;
        }
        // Otherwise, display the matching bank
        filteredBanks.forEach(bank => {
            const bankDiv = document.createElement('div');
            bankDiv.classList.add('bank-box');
            bankDiv.style.border = "1px solid #ccc";
            bankDiv.style.margin = "10px";
            bankDiv.style.padding = "10px";
            bankDiv.style.borderRadius = "5px";
            bankDiv.style.width = "80%"; // Ensure it takes full width

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

            bankusersdata.textContent = bank.Totalusers;
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
            openButton.style.display = "block";
            openButton.style.marginBottom = "10px";
            openButton.onclick = function () {
                openBank(bank.bankName); // Logic to open the bank
            };

            // Append elements to bankDiv
            bankDiv.appendChild(bankidelem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankusersElem);
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


// Function to create an hr tag and append it after elements
function createhrtag(parentElement) {
    const hr = document.createElement('hr');
    hr.style.color = "blue";

    parentElement.appendChild(hr);
}