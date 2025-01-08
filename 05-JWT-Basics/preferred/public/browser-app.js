const baseURL = "http://localhost:3000/api/v1";
let token = "";

// Login function
document.getElementById("loginButton").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    displayMessage("Please enter username and password.", "error");
    token = ""; // Clear token on invalid input
    return;
  }

  try {
    const response = await fetch(`${baseURL}/logon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      displayMessage(errorData.message || "Login failed.", "error");
      token = ""; // Очистка токена
      return;
    }

    const data = await response.json();
    token = data.token;
    displayMessage("Login successful! Token received.", "message");
  } catch (error) {
    console.error("Error during login:", error.message);
    displayMessage("Something went wrong during login.", "error");
    token = ""; // Очистка токена
  }
});

// Get Message function
document
  .getElementById("getMessageButton")
  .addEventListener("click", async () => {
    if (!token) {
      displayMessage("You must login first!", "error");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/hello`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        displayMessage(errorData.message || "Unauthorized", "error");
        return;
      }
  
      const data = await response.json();
      displayMessage(data.message, "message");
    } catch (error) {
      console.error("Error fetching message:", error.message);
      displayMessage("Something went wrong when fetching the message.", "error");
    }
  });

// Utility function to display messages
function displayMessage(message, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
  messageDiv.className = type;
}
