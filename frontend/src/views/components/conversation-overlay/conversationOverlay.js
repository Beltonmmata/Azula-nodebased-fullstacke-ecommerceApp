import "./conversationOverlay.css";

export function showConversationOverlay(content) {
  const conversationContainer = document.getElementById("conversation-overlay");

  conversationContainer.innerHTML = `
  <div class="conversation-content">

   ${content}
   </div>
  `;
  //   messageContainer.style.borderLeft = `5px solid ${statusColor}`;
  conversationContainer.classList.add("active");
}
export function hideConversationOverlay() {
  const conversationContainer = document.querySelector(
    ".conversation-container"
  );
  if (conversationContainer) {
    conversationContainer.classList.remove("active");
  }
}
