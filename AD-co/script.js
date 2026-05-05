const name = document.querySelector("#name");
const Error_name = document.querySelector(".Error_name");
const email = document.querySelector("#email");
const Error_email = document.querySelector(".Error_email");
const subject = document.querySelector("#subject");
const Error_subject = document.querySelector(".Error_subject");
const message = document.querySelector("#message");
const Error_message = document.querySelector(".Error_message");
const subnitC = document.querySelector(".subnitC");
const Form = document.querySelector(".Form");
subnitC.addEventListener("click", function (e) {
  e.preventDefault();
  let valid = true;
  if (name.value === "" || name.value == null || name.value === "name") {
    Error_name.innerHTML = "Name is required";
    valid = false;
    document.querySelector("#name").style.borderColor = "red";
  } else {
    Error_name.innerHTML = "";
    document.querySelector("#name").style.borderColor = "green";
  }
  if (email.value === "") {
    Error_email.innerHTML = "Email is required";
    valid = false;
    document.querySelector("#email").style.borderColor = "red";
  } else if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    Error_email.innerHTML = "Invalid email format (************@gmail.com)";
    valid = false;
    document.querySelector("#email").style.borderColor = "red";
  } else {
    Error_email.innerHTML = "";
    document.querySelector("#email").style.borderColor = "green";
  }
  if (subject.value === "") {
    Error_subject.innerHTML = "Subject is required";
    valid = false;
    document.querySelector("#subject").style.borderColor = "red";
  } else {
    Error_subject.innerHTML = "";
    document.querySelector("#subject").style.borderColor = "green";
  }
  if (message.value === "") {
    Error_message.innerHTML = "Message is required";
    valid = false;
    document.querySelector("#message").style.borderColor = "red";
  } else {
    Error_message.innerHTML = "";
    document.querySelector("#message").style.borderColor = "green";
  }
  if (valid) {
    sendemail();
  }
});
let timeOut;
Form.addEventListener("input", () => {
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    const Ldata = {
      name: Form.name.value,
      email: Form.email.value,
      subject: Form.subject.value,
      message: Form.message.value,
    };
    localStorage.setItem("Form", JSON.stringify(Ldata));
  }, 500);
});
window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("Form"));
  if (savedData) {
    name.value = savedData.name || "";
    email.value = savedData.email || "";
    subject.value = savedData.subject || "";
    message.value = savedData.message || "";
  }
});
function sendemail() {
  subnitC.disabled = true;
  const data = {
    to_email: "lets3698741@gmail.com",
    from_name: name.value,
    from_email: email.value,
    contact: "support",
    message: `
      name: ${name.value}
      email: ${email.value}
      subject: ${subject.value}
      message: ${message.value}
    `,
  };
  emailjs
    .send("service_s1c6hac", "template_1dcro8c", data)
    .then((response) => {
      alert("Message sent successfully ✅");
      name.value = "";
      email.value = "";
      subject.value = "";
      message.value = "";
      localStorage.removeItem("Form");
      subnitC.disabled = false;
      document.querySelector("#name").style.borderColor = "gray";
      document.querySelector("#email").style.borderColor = "gray";
      document.querySelector("#subject").style.borderColor = "gray";
      document.querySelector("#message").style.borderColor = "gray";
    })
    .catch((error) => {
      alert("Failed to send ❌ " + error);
      subnitC.disabled = false;
    });
}
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "e") {
    e.preventDefault();
    const confirmDelete = confirm("Do you want to clear saved form data?");
    if (confirmDelete) {
      localStorage.removeItem("Form");
      location.reload();
    }
  }
});
