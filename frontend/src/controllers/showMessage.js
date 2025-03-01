export const showMessage = (message, callback) => {
  document.getElementById("show-message-overlay").innerHTML = `
    <div>
        <div id="message-overlay">${message}</div>
        <button class="btn secondary-btn w-full" id="message-overlay-close-btn">
          Ok
        </button>
      </div>
    `;
};
