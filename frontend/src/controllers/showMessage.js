export function showMessage(message, status) {
  const messageContainer = document.getElementById("show-message-overlay");

  // Set status color and icon
  let statusColor;
  let icon;
  if (status === "success") {
    statusColor = "var(--color-success)";
    icon = "checkmark-circle-outline";
  } else {
    statusColor = "var(--color-danger)";
    icon = "close-circle-outline";
  }

  messageContainer.innerHTML = `
    <ion-icon class="message-icon" style="color:${statusColor} ;" name="${icon}"></ion-icon>
    <span class="message-text">${message}</span>
    <span class="close-btn" onclick="hideMessage()">&times;</span>
  `;
  messageContainer.style.borderLeft = `5px solid ${statusColor}`;
  messageContainer.classList.add("active");

  setTimeout(hideMessage, 3000);
}
function hideMessage() {
  const messageContainer = document.querySelector(".message-container");
  if (messageContainer) {
    messageContainer.classList.remove("active");
  }
}
