const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const userAddress = document.querySelector("#address-signup").value.trim();
  const phone = document.querySelector("#phone-signup").value.trim();

  if (username && email && userAddress && phone && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, userAddress, phone, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (response.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
