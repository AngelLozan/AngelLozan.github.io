

  (function () {
    emailjs.init('mosyBz7sAhDjmcMB2');
  })();

  const form = document.getElementById("contactForm");
  const button = document.getElementById("submitBtn");

  // document.onload(() => {
  //   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  //   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  //     return new bootstrap.Tooltip(tooltipTriggerEl)
  //   });
  // });
   

  form.addEventListener("submit", function (event) {
      event.preventDefault();
      button.disabled = true;
      button.innerHTML = "Sending...";
      const serviceID = "service_oppg3kr";
      const templateID = "template_ebraw3g";

      // send the email here
      emailjs.sendForm(serviceID, templateID, this).then(
        (response) => {
          document.getElementById("formMessage").style.display = "block";
          displayFlashMessage("Message sent successfully 🎉", "success");
          setTimeout(() => {
            document.getElementById("formMessage").style.display = "none";
          }, 4000);
          console.log("SUCCESS!", response.status, response.text);
          button.innerHTML = "Send";
          button.disabled = false;
          form.reset();
        },
        (error) => {
          console.log("FAILED...", error);
          if (error.text){
            displayFlashMessage(`Message not sent 😢 ${error.text}`, "danger");
          } else {
            displayFlashMessage(`Message not sent 😢 ${error.message}`, "danger");
          }
          setTimeout(() => {
            form.reset();
          }, 4000);  
          button.innerHTML = "Send";
          button.disabled = false;
        }
      );
    });
  
  const displayFlashMessage = (message, type) => {
    const flashElement = document.createElement("div");
    flashElement.className = `alert alert-${type} alert-dismissible fade show m-1`;
    flashElement.role = "alert";
    flashElement.style.position = "fixed";
    flashElement.style.top = "10px";
    flashElement.style.right = "10px";
    flashElement.style.zIndex = "1050";
    flashElement.textContent = message;

    const button = document.createElement("button");
    button.className = "btn-close";
    button.setAttribute("data-bs-dismiss", "alert");

    flashElement.appendChild(button);
    document.body.appendChild(flashElement);

    setTimeout(() => {
      flashElement.remove();
    }, 5000);
    }