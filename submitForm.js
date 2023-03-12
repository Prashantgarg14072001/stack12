function submitForm() {
  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const formData = {
    name,
    dob,
    email,
    phone,
  };

  fetch("/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Form submitted successfully!");
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    });
}
