document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Clear previous messages
      const errorMessage = document.querySelector(".error-message");
      const sentMessage = document.querySelector(".sent-message");
      errorMessage.style.display = "none";
      sentMessage.style.display = "none";
  
      // Show loading message
      const loading = document.querySelector(".loading");
      loading.style.display = "block";
  
      // Collect form data
      const formData = new FormData(form);
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
  
      // Perform AJAX request
      fetch('/message', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
        .then(response => response.json())
        .then(data => {
          loading.style.display = "none";
          if (data.success) {
            sentMessage.style.display = "block";
            form.reset();
          } else {
            errorMessage.textContent = data.error || "An error occurred. Please try again.";
            errorMessage.style.display = "block";
          }
        })
        .catch(error => {
          loading.style.display = "none";
          errorMessage.textContent = "An error occurred. Please try again.";
          errorMessage.style.display = "block";
        });
    });
  });
  