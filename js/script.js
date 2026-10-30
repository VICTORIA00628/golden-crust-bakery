document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  // Let our JavaScript handle the validation messages
  form.setAttribute("novalidate", "");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const productInput = document.getElementById("product");
  const dateInput = document.getElementById("date");
  const messageInput = document.getElementById("message");

  // Create the box that will show the response (hidden at first)
  const responseBox = document.createElement("div");
  responseBox.id = "enquiry-response";
  responseBox.style.display = "none";
  responseBox.style.marginTop = "20px";
  responseBox.style.padding = "15px";
  responseBox.style.border = "2px solid green";
  responseBox.style.borderRadius = "8px";
  form.insertAdjacentElement("afterend", responseBox);

  // Show a red error message under a field
  function showError(input, message) {
    clearError(input);
    const error = document.createElement("p");
    error.className = "error-message";
    error.style.color = "red";
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
  }

  // Remove the error message under a field
  function clearError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error-message")) {
      next.remove();
    }
  }

  // Number of days between today and the chosen date
  function daysUntil(dateString) {
    const needed = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((needed - today) / (1000 * 60 * 60 * 24));
  }

  // Build the response about cost and availability
  function buildResponse(name, product, dateString) {
    let cost = "";
    let availability = "";

    if (product === "cake") {
      cost = "Custom cakes start from R450, depending on size and design.";
      availability = "We need at least 7 days' notice for custom cakes.";
    } else if (product === "catering") {
      cost = "Catering and bulk orders start from R1200 for 20 people.";
      availability = "We need at least 14 days' notice for catering orders.";
    } else {
      cost = "We will send you a quote once we know more about your order.";
      availability = "We usually reply within 2 working days.";
    }

    // Check the date if the customer filled it in
    if (dateString !== "") {
      const days = daysUntil(dateString);
      const minDays = product === "cake" ? 7 : product === "catering" ? 14 : 2;
      if (days < minDays) {
        availability += " Your date is very soon, so please call us to check if it is possible.";
      } else {
        availability += " Your date looks good, so we should be able to help!";
      }
    }

    return "Thank you, " + name + "! " + cost + " " + availability;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    responseBox.style.display = "none";

    // Validate full name
    const nameValue = nameInput.value.trim();
    if (nameValue.length < 2) {
      showError(nameInput, "Please enter your full name (at least 2 letters).");
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate email address
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      showError(emailInput, "Please enter a valid email address (for example name@example.com).");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate phone number (optional, but must be correct if filled in)
    const phoneValue = phoneInput.value.replace(/\s/g, "");
    const phonePattern = /^(\+27|0)[0-9]{9}$/;
    if (phoneValue !== "" && !phonePattern.test(phoneValue)) {
      showError(phoneInput, "Please enter a valid phone number (for example 0821234567).");
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    // Validate product of interest
    if (productInput.value === "") {
      showError(productInput, "Please choose a product from the list.");
      isValid = false;
    } else {
      clearError(productInput);
    }

    // Validate date (optional, but it cannot be in the past)
    if (dateInput.value !== "" && daysUntil(dateInput.value) < 0) {
      showError(dateInput, "The date cannot be in the past.");
      isValid = false;
    } else {
      clearError(dateInput);
    }

    // Validate details message
    const messageValue = messageInput.value.trim();
    if (messageValue.length < 10) {
      showError(messageInput, "Please tell us more (at least 10 characters).");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    // If everything is valid, show the response
    if (isValid) {
      responseBox.textContent = buildResponse(nameValue, productInput.value, dateInput.value);
      responseBox.style.display = "block";
    }
  });
});
