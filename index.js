 // Function to get a specific cookie by name


 function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Check if mobileno and character cookies exist
  const mobileno = getCookie("mobileno");
  const character = getCookie("character");
  console.log(mobileno,character);

  // If both cookies are present, ask the user if they want to auto-login
  if (mobileno && character) {
    const userResponse = confirm(`We detected your mobile number ${mobileno}. Would you like to continue with this number?`);
    // const userResponse = false;

    if (userResponse) {
      if (character === "banker") {
        window.location.href = `banker.html?mobileno=${mobileno}`;
      } else if (character === "user") {
        window.location.href = `user.html?mobileno=${mobileno}`;
      } else if (character === "employee") {
        window.location.href = `employee.html?mobileno=${mobileno}`;
      } else if (character === "manager") {
        window.location.href = `manager.html?mobileno=${mobileno}`;
      }
    } else {
      // If user clicks "Cancel", stay on the index page
      // alert("You can now log in with a different mobile number.");
    }
  }

  function signup() {
    window.location.href = "signup.html";
  }

  function login() {
    window.location.href = "login.html";
  }