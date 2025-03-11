document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");
  let currentStep = 1;
  const totalSteps = 2;

  // Form validation and submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to a server
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // For demonstration, log the data to console
      console.log("Form submitted:", data);

      // Show success message
      showSuccess();
    }
  });
});

function validateForm() {
  const currentStepElement = document.querySelector(
    `.form-step[data-step="${currentStep}"]`
  );
  const inputs = currentStepElement.querySelectorAll("input, select");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.required && !input.value.trim()) {
      isValid = false;
      showError(input, "This field is required");
    } else {
      removeError(input);
    }

    // Email validation
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        showError(input, "Please enter a valid email address");
      }
    }

    // Phone validation
    if (input.type === "tel" && input.value) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(input.value)) {
        isValid = false;
        showError(input, "Please enter a valid phone number");
      }
    }
  });

  return isValid;
}

function showError(input, message) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.add("error");

  let errorMessage = formGroup.querySelector(".error-message");
  if (!errorMessage) {
    errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    formGroup.appendChild(errorMessage);
  }
  errorMessage.textContent = message;
}

function removeError(input) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.remove("error");
  const errorMessage = formGroup.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function nextStep() {
  if (validateForm()) {
    if (currentStep < totalSteps) {
      document
        .querySelector(`.form-step[data-step="${currentStep}"]`)
        .classList.remove("active");
      currentStep++;
      document
        .querySelector(`.form-step[data-step="${currentStep}"]`)
        .classList.add("active");
    }
  }
}

function previousStep() {
  if (currentStep > 1) {
    document
      .querySelector(`.form-step[data-step="${currentStep}"]`)
      .classList.remove("active");
    currentStep--;
    document
      .querySelector(`.form-step[data-step="${currentStep}"]`)
      .classList.add("active");
  }
}

function showSuccess() {
  const formCard = document.querySelector(".form-card");
  formCard.innerHTML = `
        <div class="success-message" style="display: block;">
            <i class="fas fa-check-circle" style="font-size: 48px; color: #059669; margin-bottom: 20px;"></i>
            <h2>Thank You!</h2>
            <p>Your information has been submitted successfully.</p>
            <button onclick="window.location.href='index.html'" class="next-btn" style="margin-top: 20px;">
                Return Home <i class="fas fa-home"></i>
            </button>
        </div>
    `;
}
