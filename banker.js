
import API_URL from './config.js'; 



// Function to get query parameters 
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const mobileno = getQueryParam('mobileno');






// Function to hide all forms
function hideAllForms() {
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
}



// Event listener for Create Bank button
document.getElementById("createBank").addEventListener("click", function () {
    hideAllForms();
    document.getElementById("createBankForm").style.display = 'block';
});

// Event listener for creating a bank
document.getElementById("create").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const bankName = document.getElementById('bankName').value;
    const currencyOfBank = document.getElementById('currancyofbank').value;
    const bankFunds = document.getElementById('bankfunds').value;

    try {
        const response = await fetch(`${API_URL}/api/bank`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bankName, // Matches Bank's field
                currencyOfBank, // Matches Bank's field
                funds: bankFunds, // Matches Bank's field
                mobileno

            })
        });

        const createBankResponse = document.getElementById('createBankResponse');

        if (response.ok) {
            const data = await response.json();
            createBankResponse.innerHTML = `Bank id: ${data.bankId}`; // Assuming the response includes a bankId
            updateBankList();
            setTimeout(() => {
                hideAllForms();
                document.getElementById("addManagerForm").style.display = 'block';
            }, 800);
        } else {
            createBankResponse.innerHTML = 'Failed to create bank. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        createBankResponse.innerHTML = 'An error occurred!';
    }
});


// Event listener for Create Bank button
document.getElementById("viewBanks").addEventListener("click", function () {
    hideAllForms();
    document.getElementById("bankDetailsSection").style.display = 'block';
    updateBankList();
});



window.updateBankList= updateBankList;
async function updateBankList() {
    try {
        const response = await fetch(`${API_URL}/api/bank/all/${mobileno}`);
        if (!response.ok) throw new Error('Network response was not ok');

        // Check if response body is empty
        const text = await response.text();
        if (!text) throw new Error('Response body is empty');

        // Attempt to parse the text to JSON
        let banks;
        try {
            banks = JSON.parse(text);
        } catch (error) {
            throw new Error('Failed to parse JSON');
        }

        const bankList2 = document.getElementById('bankList2');
        bankList2.innerHTML = ''; // Clear the existing list before updating

        // Populate list with bank details
        banks.forEach(bank => {
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
            bankNameLabel.textContent = "Bank name: "; // Label part
            bankNameLabel.style.color = "black"; // Blue color for label

            bankNameData.textContent = bank.bankName; // Data part
            bankNameData.style.color = "green"; // Red color for data

            // Make sure they are displayed in block format
            bankNameElem.style.display = "block";
            bankNameElem.style.marginBottom = "5px";

            // Append the label and data to the main bankNameElem
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


            // Manager Name
            const bankFundElem = document.createElement('span');
            const bankFundlabel = document.createElement('span');
            const bankfunddata = document.createElement('span');

            bankFundlabel.textContent = "Bank funds : ";
            bankFundlabel.style.color = "black";

            bankfunddata.textContent = bank.funds;
            bankfunddata.style.color = "green";

            bankFundElem.style.display = "block";
            bankFundElem.style.marginBottom = "5px";

            bankFundElem.appendChild(bankFundlabel);
            bankFundElem.appendChild(bankfunddata);

            // Manager Name
            const bankidelem = document.createElement('span');
            const bankidlable = document.createElement('span');
            const bankiddata = document.createElement('span');

            bankidlable.textContent = "Bank Id : ";
            bankidlable.style.color = "black";

            bankiddata.textContent = bank.bankId;
            bankiddata.style.color = "green";

            bankidelem.style.display = "block";
            bankidelem.style.marginBottom = "5px";

            bankidelem.appendChild(bankidlable);
            bankidelem.appendChild(bankiddata);

            // Bank user
            const bankusersElem = document.createElement('span');
            const bankuserslabel = document.createElement('span');
            const bankusersdata = document.createElement('span');

            bankuserslabel.textContent = "Total users : ";
            bankuserslabel.style.color = "black";

            bankusersdata.textContent = bank.totalusers;
            bankusersdata.style.color = "green";

            bankusersElem.style.display = "block";
            bankusersElem.style.marginBottom = "5px";
            bankusersElem.appendChild(bankuserslabel);
            bankusersElem.appendChild(bankusersdata);
            // bank employee
            const bankempElem = document.createElement('span');
            const bankemplabel = document.createElement('span');
            const bankempdata = document.createElement('span');

            bankemplabel.textContent = "Total employees : ";
            bankemplabel.style.color = "black";

            bankempdata.textContent = bank.totalemp;
            bankempdata.style.color = "green";

            bankempElem.style.display = "block";
            bankempElem.style.marginBottom = "5px";
            bankempElem.appendChild(bankemplabel);
            bankempElem.appendChild(bankempdata);


            // Open Button
            const openButton = document.createElement('button');
            openButton.textContent = "Open Bank";
            openButton.style.display = "block";
            openButton.style.marginBottom = "10px";
            openButton.onclick = function () {
                openBank(bank.bankName); // Use bank.bankName here
            };

            // Append elements and create hr tags
            bankDiv.appendChild(bankNameElem);
            createhrtag(bankDiv); // Add <hr> after bank name

            bankDiv.appendChild(managerNameElem);
            createhrtag(bankDiv); // Add <hr> after manager name

            bankDiv.appendChild(bankFundElem);
            createhrtag(bankDiv); // Add <hr> after funds
            bankDiv.appendChild(bankidelem);
            createhrtag(bankDiv); // Add <hr> after funds
            bankDiv.appendChild(bankempElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankusersElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(openButton);

            // Append the bankDiv to the bankList
            bankList2.appendChild(bankDiv);





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


// Function to handle opening the bank (you can define your own logic here)
function openBank(bankName) {
    alert("Opening bank: " + bankName);


}


window.searchBankById = searchBankById;
async function searchBankById() {
    const bankIdInput = document.getElementById('existingBankId').value;

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
        const filteredBanks = banks.filter(bank => bank.bankId == bankIdInput);

        const bankList = document.getElementById('bankList');
        bankList.innerHTML = ''; // Clear the list before updating

        // If no matching bank is found, show a message
        if (filteredBanks.length === 0) {
            bankList.innerHTML = `<p>No bank found with Bank ID: ${bankIdInput}</p>`;
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


            // Bank user
            const bankusersElem = document.createElement('span');
            const bankuserslabel = document.createElement('span');
            const bankusersdata = document.createElement('span');

            bankuserslabel.textContent = "Total users : ";
            bankuserslabel.style.color = "black";

            bankusersdata.textContent = bank.totalusers;
            bankusersdata.style.color = "green";

            bankusersElem.style.display = "block";
            bankusersElem.style.marginBottom = "5px";
            bankusersElem.appendChild(bankuserslabel);
            bankusersElem.appendChild(bankusersdata);
            // bank employee
            const bankempElem = document.createElement('span');
            const bankemplabel = document.createElement('span');
            const bankempdata = document.createElement('span');

            bankemplabel.textContent = "Total employees : ";
            bankemplabel.style.color = "black";

            bankempdata.textContent = bank.totalemp;
            bankempdata.style.color = "green";

            bankempElem.style.display = "block";
            bankempElem.style.marginBottom = "5px";
            bankempElem.appendChild(bankemplabel);
            bankempElem.appendChild(bankempdata);

            // Open Button
            const openButton = document.createElement('button');
            openButton.textContent = "Open Bank";
            openButton.style.display = "block";
            openButton.style.marginBottom = "10px";
            openButton.onclick = function () {
                openBank(bank.bankName); // Logic to open the bank
            };

            // Append elements to bankDiv
            bankDiv.appendChild(bankNameElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(managerNameElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankFundElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankidelem);
            createhrtag(bankDiv);
            bankDiv.appendChild(openButton);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankempElem);
            createhrtag(bankDiv);
            bankDiv.appendChild(bankusersElem);
          
            // Append the bankDiv to the bankList
            bankList.appendChild(bankDiv);
        });
    } catch (error) {
        console.error('Error fetching bank list:', error);
    }
}




// Event listener for Add Manager button
document.getElementById("addManager").addEventListener("click", function () {
    hideAllForms();
    document.getElementById("addManagerForm").style.display = 'block';
});

// Event listener for creating a manager
document.getElementById("createmanager").addEventListener("click", async function (event) {
    event.preventDefault();

    const managername = document.getElementById('managerName').value;
    const bankid = document.getElementById('bankId').value;
    const salary = document.getElementById('salary').value;

    try {
        const response = await fetch(`${API_URL}/api/manager`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                managername, // Matches Bank's field
                bankid, // Matches Bank's field
                salary // Matches Bank's field

            })
        });

        console.log(response);
        if (response.ok) {
            const data = await response.json();
            document.getElementById('managerid').innerHTML = `Manager ID: ${data.managerid}`; // Corrected key to managerId


            updateBankList();
            // Additional initialization logic can go here


            setTimeout(() => {
                hideAllForms();
                document.getElementById("bankDetailsSection").style.display = 'block';

            }, 800);
        } else {
            document.getElementById('managerid').innerHTML = 'Bank ID is wrong.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('managerid').innerHTML = 'An error occurred.';
    }
});



document.getElementById("openBank").addEventListener("click", function () {
    hideAllForms();
    document.getElementById("openbankform").style.display = 'block';
})

// Event listener for opening a bank
document.getElementById("obank").addEventListener("click", async function () {


    const bankId = document.getElementById('existingBankId').value; // Ensure bankId is fetched correctly

    try {
        const response = await fetch(`${API_URL}/api/bank/bankid/${bankId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('openbanks').innerHTML = `Hey dear bank Owner, this is your bank: ${data.bankName}`; // Ensure correct field names
        } else {
            document.getElementById('openbanks').innerHTML = 'Bank not found.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('openbanks').innerHTML = 'An error occurred.';
    }
});

// Ensure updateBankList runs when the page loads
window.onload = async () => {
    await updateBankList();
    // Additional initialization logic can go here
};

/// Event listener for showing the Remove Manager form
document.getElementById("removeManager").addEventListener("click", function () {
    hideAllForms(); // Ensure this function hides all forms
    document.getElementById("removeManagerForm").style.display = 'block'; // Show the form for removing a manager
});
document.getElementById("delManager").addEventListener("click", async function (event) {
    event.preventDefault();

    const managerId = document.getElementById('managerId').value;

    try {
        const response = await fetch(`${API_URL}/api/manager/id?managerid=${managerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            document.getElementById("removedmanager").innerHTML = `Manager whose id: ${managerId} is removed successfully.`;
        } else {
            // You can handle response error here, for example, logging it.
            const errorMessage = await response.text(); // Optionally read the error response
            console.error('Error response:', errorMessage);
            document.getElementById("removedmanager").innerHTML = "Failed to remove manager.";
        }

    } catch (error) {
        console.log('Error:', error);
        document.getElementById("removedmanager").innerHTML = "An error occurred";
    }
});




// listener for Add Manager button
document.getElementById("removeBank").addEventListener("click", async function () {
    hideAllForms();
    document.getElementById("removeBankForm").style.display = 'block';
});



document.getElementById("delBank").addEventListener("click", async function (event) {
    event.preventDefault();

    const bankIdToRemove = document.getElementById('bankIdToRemove').value;

    try {
        const response = await fetch(`${API_URL}/api/bank/id?bankId=${bankIdToRemove}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            await updateBankList();

            document.getElementById("removedbank").innerHTML = `bank with id : ${bankIdToRemove} is removed successfully.`;

        } else {

        }

    } catch (error) {
        console.log('Error:', error);
        document.getElementById("removedbank").innerHTML = "An error occured"

    }

})

