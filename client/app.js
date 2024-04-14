document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("guestbookForm");
  form.addEventListener("submit", handleSubmit);
  fetchMessages();
});

async function handleSubmit(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const message = event.target.message.value;

  try {
      const response = await fetch("https://guestbook-project-2.onrender.com//message", {
          method: "POST",
          body: JSON.stringify({ username, message }),
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error("Failed");
      }
      event.target.username.value = "";
      event.target.message.value = "";
      fetchMessages();
  } catch (error) {
      console.error("Error submitting message:", error);
  }
}

async function fetchMessages() {
  try {
      const response = await fetch("https://guestbook-project-2.onrender.com//message");
      if (!response.ok) {
          throw new Error("Failed");
      }

      const messageList = document.getElementById("messageList");
      const messages = await response.json();
      messageList.innerHTML = "";

      messages.forEach(function (message) {
          const li = document.createElement("li");
          li.textContent = `${message.username}: ${message.message}`;
          messageList.appendChild(li);
      });
  } catch (error) {
      console.error("Error messages:", error);
  }
}
