document.getElementById("contactForm").addEventListener("submit", function (e) {
  const fullname = document.getElementById("fullname").value.trim();
  const namePattern = /^[A-Za-z\s]+$/;

  if (fullname.length < 5) {
    alert("Full name must contain at least 5 characters.");
    e.preventDefault();
    return;
  }

  if (!namePattern.test(fullname)) {
    alert("Full name must contain only letters and spaces.");
    e.preventDefault();
    return;
  }

  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@e-uvt\.ro$/;

  if (!emailPattern.test(email)) {
    alert("Email must be valid and end with @e-uvt.ro.");
    e.preventDefault();
    return;
  }

  const phone = document.getElementById("phone").value.trim();
  const phonePattern = /^\d{10}$/;

  if (phone && !phonePattern.test(phone)) {
    alert("Phone number must contain exactly 10 digits.");
    e.preventDefault();
    return;
  }

  const subject = document.getElementById("subject").value.trim();

  if (!subject) {
    alert("Please select a subject.");
    e.preventDefault();
    return;
  }

  const message = document.getElementById("message").value.trim();

  if (!message) {
    alert("Message cannot be empty.");
    e.preventDefault();
    return;
  }

  const selectedRadio = document.querySelector('input[name="hear-about"]:checked');

  if (!selectedRadio) {
    alert("Please select how you heard about us.");
    e.preventDefault();
    return;
  }

  const dobValue = document.getElementById("dob").value;

  if (!dobValue) {
    alert("Date of birth is required.");
    e.preventDefault();
    return;
  }

  const dob = new Date(dobValue);
  const today = new Date();
  let ageFromDob = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    ageFromDob--;
  }

  if (ageFromDob < 18) {
    alert("You must be at least 18 years old.");
    e.preventDefault();
    return;
  }

  const ageValue = Number(document.getElementById("age").value);

  if (!Number.isInteger(ageValue) || ageValue < 18 || ageValue > 60) {
    alert("Age must be between 18 and 60.");
    e.preventDefault();
    return;
  }

  const website = document.getElementById("website").value.trim();

  try {
    const websiteUrl = new URL(website);

    if (websiteUrl.protocol !== "https:") {
      throw new Error("Invalid protocol");
    }
  } catch (error) {
    alert("Website must be a valid URL that starts with https://.");
    e.preventDefault();
    return;
  }

  const fileInput = document.getElementById("fileUpload");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a PDF or DOCX file.");
    e.preventDefault();
    return;
  }

  const allowedExtensions = ["pdf", "docx"];
  const fileExtension = file.name.split('.').pop().toLowerCase();
  const maxFileSize = 2 * 1024 * 1024;

  if (!allowedExtensions.includes(fileExtension)) {
    alert("Only PDF and DOCX files are allowed.");
    e.preventDefault();
    return;
  }

  if (file.size > maxFileSize) {
    alert("File size must not exceed 2MB.");
    e.preventDefault();
    return;
  }

  const favColor = document.getElementById("favColor").value;

  if (!favColor) {
    alert("Favorite color is required.");
    e.preventDefault();
    return;
  }

  const confirmed = window.confirm("All validations passed. Do you want to submit the form?");

  if (!confirmed) {
    e.preventDefault();
  }
});