/**
 * Popup handling for contact form success message.
 * This file is kept for backward compatibility with any inline onclick references.
 * Primary popup logic lives in form.js.
 */
function closePopup() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("popup-overlay");
  if (popup) popup.classList.remove("open-popup");
  if (overlay) overlay.classList.remove("visible");
}
