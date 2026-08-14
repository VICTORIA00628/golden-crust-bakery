// Golden Crust Bakery - basic interactivity

document.addEventListener("DOMContentLoaded", function () {
  // Simple client-side validation for any form on the page
  const forms = document.querySelectorAll("form");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
      const requiredFields = form.querySelectorAll("[required]");
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "#ccc";
        }
      });

      if (valid) {
        alert("Thank you! Your message has been received. We will get back to you soon.");
        form.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  });

  // Highlight active nav link
  const links = document.querySelectorAll("nav a");
  const current = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(function (link) {
    if (link.getAttribute("href") === current) {
      link.style.color = "#d9a441";
    }
  });
});
