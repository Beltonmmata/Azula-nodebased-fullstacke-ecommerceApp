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
  <div class="azula-message-wrapper">
    <ion-icon class="azula-message-icon" style="color:${statusColor};" name="${icon}"></ion-icon>
    <span class="azula-message-text">${message}</span>
    <span class="azula-close-btn"  id="azula-close-btn" >&times;</span>
  </div>
`;

  const messageContainerWrapper = document.querySelector(
    ".azula-message-wrapper"
  );
  if (messageContainerWrapper) {
    messageContainerWrapper.style.borderLeft = `5px solid ${statusColor}`;
  }

  messageContainer.classList.add("active");

  const closeBtn = document.getElementById("azula-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      messageContainer.classList.remove("active");
    });
  }

  setTimeout(hideMessage, 3000);
}

function hideMessage() {
  const messageContainer = document.getElementById("show-message-overlay");
  if (messageContainer) {
    messageContainer.classList.remove("active");
  }
}
