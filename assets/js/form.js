/**
 * Corentin Réault — Portfolio v3
 * Contact form with client-side validation, accessibility, and i18n support
 */
(function() {
  "use strict";

  const form = document.querySelector("#contact-form");
  const popup = document.getElementById("popup");
  const popupOverlay = document.getElementById("popup-overlay");
  const popupClose = document.getElementById("popup-close");
  const formError = document.getElementById("form-error");
  const formErrorText = document.getElementById("form-error-text");

  // Character count for message field
  const messageField = document.getElementById("message");
  const charCount = document.getElementById("char-count");

  if (messageField && charCount) {
    messageField.addEventListener("input", () => {
      const count = messageField.value.length;
      charCount.textContent = count;

      // Visual feedback when approaching limit
      const counter = charCount.parentElement;
      if (count > 900) {
        counter.style.color = "#f87171";
      } else if (count > 700) {
        counter.style.color = "#fbbf24";
      } else {
        counter.style.color = "";
      }
    });
  }

  // Initialize timestamp for time-based honeypot (page load time)
  const tsFieldInit = document.getElementById("form-timestamp");
  if (tsFieldInit) {
    tsFieldInit.value = Math.floor(Date.now() / 1000).toString();
  }

  // Error display helpers
  function showFieldError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "-error");
    const inputEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = message;
    }
    if (inputEl) {
      inputEl.setAttribute("aria-invalid", "true");
    }
  }

  function clearFieldError(fieldId) {
    const errorEl = document.getElementById(fieldId + "-error");
    const inputEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = "";
    }
    if (inputEl) {
      inputEl.removeAttribute("aria-invalid");
    }
  }

  function showFormError(message) {
    if (formErrorText) formErrorText.textContent = message;
    if (formError) formError.classList.add("visible");
  }

  function hideFormError() {
    if (formError) formError.classList.remove("visible");
    if (formErrorText) formErrorText.textContent = "";
  }

  // Clear errors on input
  ["name", "email", "phone", "message"].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener("input", () => clearFieldError(fieldId));
      field.addEventListener("blur", () => clearFieldError(fieldId));
    }
  });

  // Client-side validation
  function validateForm() {
    let isValid = true;
    const lang = document.documentElement.lang || "fr";
    const t = {
      fr: {
        required: "Ce champ est obligatoire",
        email: "Veuillez entrer une adresse email valide",
        messageShort: "Le message doit contenir au moins 10 caractères"
      },
      en: {
        required: "This field is required",
        email: "Please enter a valid email address",
        messageShort: "Message must be at least 10 characters long"
      }
    }[lang] || {};

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Name validation
    if (name && !name.value.trim()) {
      showFieldError("name", t.required || "Required");
      isValid = false;
    }

    // Email validation
    if (email) {
      const emailVal = email.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        showFieldError("email", t.required || "Required");
        isValid = false;
      } else if (!emailRegex.test(emailVal)) {
        showFieldError("email", t.email || "Invalid email");
        isValid = false;
      }
    }

    // Message validation
    if (message) {
      const msgVal = message.value.trim();
      if (!msgVal) {
        showFieldError("message", t.required || "Required");
        isValid = false;
      } else if (msgVal.length < 10) {
        showFieldError("message", t.messageShort || "Too short");
        isValid = false;
      }
    }

    return isValid;
  }

  // Form submission
  async function sendData() {
    if (!validateForm()) return;

    // Check the hidden honeypot field — if filled, it's a bot
    const websiteField = document.getElementById("website");
    if (websiteField && websiteField.value.trim()) {
      return; // Silent reject — bot doesn't know it failed
    }

    // Check time-based honeypot: form must not be submitted too quickly
    // Timestamp is set on page load (see initTimestamp above)
    const tsField = document.getElementById("form-timestamp");
    if (tsField && tsField.value) {
      const elapsed = Math.floor(Date.now() / 1000) - parseInt(tsField.value, 10);
      if (isNaN(elapsed) || elapsed < 3) {
        // Too fast — likely a bot
        return;
      }
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');
    const spinner = submitBtn.querySelector('.spinner');

    // Loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnIcon) btnIcon.style.display = 'none';
    if (spinner) spinner.style.display = 'inline-block';

    const formData = new URLSearchParams(new FormData(form));

    try {
      const response = await fetch("https://reault.tech/contact", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        hideFormError();
        form.reset();
        if (charCount) charCount.textContent = "0";
        openPopup();
      } else {
        const errorText = await response.text();
        showFormError(errorText);
      }
    } catch (e) {
      console.error(e);
      const lang = document.documentElement.lang || "fr";
      showFormError(
        lang === "fr"
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again."
      );
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = '';
      if (btnIcon) btnIcon.style.display = '';
      if (spinner) spinner.style.display = 'none';
    }
  }

  function openPopup() {
    if (popup && popupOverlay) {
      popup.classList.add("open-popup");
      popupOverlay.classList.add("visible");
      const closeBtn = document.getElementById("popup-close");
      if (closeBtn) closeBtn.focus();
    }
  }

  function closePopup() {
    if (popup && popupOverlay) {
      popup.classList.remove("open-popup");
      popupOverlay.classList.remove("visible");
    }
  }

  // Event listeners
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendData();
    });
  }

  if (popupClose) {
    popupClose.addEventListener("click", closePopup);
  }

  if (popupOverlay) {
    popupOverlay.addEventListener("click", closePopup);
  }

  // Make closePopup available globally for backward compatibility
  window.closePopup = closePopup;
})();