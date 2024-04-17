// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("guestbookForm");
//   form.addEventListener("submit", handleSubmit);
//   fetchMessages();
// });

// async function handleSubmit(event) {
//   event.preventDefault();

//   const username = event.target.username.value;
//   const message = event.target.message.value;

//   try {
//     const response = await fetch("http://localhost:8080/message", {
//       method: "POST",
//       body: JSON.stringify({ username, message }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed");
//     }
//     event.target.username.value = "";
//     event.target.message.value = "";
//     fetchMessages();
//   } catch (error) {
//     console.error("Error submitting message:", error);
//   }
// }

// async function fetchMessages() {
//   try {
//     const response = await fetch("http://localhost:8080/message");
//     if (!response.ok) {
//       throw new Error("Failed");
//     }

//     const messageList = document.getElementById("messageList");
//     const messages = await response.json();
//     messageList.innerHTML = "";

//     messages.forEach(function (message) {
//       const li = document.createElement("li");
//       li.textContent = `${messages.username}: ${messages.message}`;
//       messageList.appendChild(li);
//     });
//   } catch (error) {
//     console.error("Error messages:", error);
//   }
// }
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("guestbookForm");
  form.addEventListener("submit", handleSubmit);

  // Fetch messages when the page initially loads
  fetchMessages();
});

async function handleSubmit(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const message = event.target.message.value;

  try {
    const response = await fetch("http://localhost:8080/message", {
      method: "POST",
      body: JSON.stringify({ username, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to submit message");
    }

    // Clear form fields after successful submission
    event.target.username.value = "";
    event.target.message.value = "";

    // Fetch updated messages after submission
    fetchMessages();
  } catch (error) {
    console.error("Error submitting message:", error);
  }
}

async function fetchMessages() {
  try {
    const response = await fetch("http://localhost:8080/message");
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
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
    console.error("Error fetching messages:", error);
  }
}
