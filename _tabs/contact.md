---
lang: en
page_id: contact
permalink: /contact-me
title: Contact
icon: fas fa-envelope
order: 5
---
<div class="contact-page">
  <form id="contactForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required />

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />

    <label for="subject">Subject:</label>
    <input type="text" name="subject" id="subject" required />
    
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5" required></textarea>

    <div class="g-recaptcha" data-sitekey="6LcTroUnAAAAAM1HpSVBQjjcjRKuSxDJLr7R7rlS"></div>
    <br/>

    <button type="submit">Send</button>
  </form>

  <!-- Message container for feedback -->
  <div id="formMessage" style="display: none; margin-top: 1rem; color: green;">
    Your message has been sent successfully!
  </div>
</div>

<script src="{{ '/assets/js/contact-form.js' | relative_url }}"></script>