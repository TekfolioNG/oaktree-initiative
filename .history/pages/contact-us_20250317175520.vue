<template>
  <div class="contact-us-section">
    <div class="content-wrapper">
      <h2 class="section-title">Contact Us</h2>
      <p class="subtitle">CONNECT WITH THE OAKTREE EMPOWERMENT INITIATIVE TEAM</p>

      <div class="intro-text">
        <h3 class="thank-you">We're here to help you make a difference</h3>
        <p class="description">
          Your interest in our mission matters deeply to us. Whether you have questions about our empowerment programs,
          want to learn more about how your support creates impact, or are interested in volunteering opportunities,
          we're eager to connect with you. The Oaktree Empowerment Initiative believes that meaningful change starts
          with open communication.
        </p>
      </div>

      <div class="contact-options">
        <div class="contact-card">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M16 10a4 4 0 0 0-8 0"></path>
              <path d="M12 14h.01"></path>
            </svg>
          </div>
          <h4 class="card-title">Send us a message</h4>
          <p class="card-description">
            Fill out the form below and a member of our dedicated team will respond to your inquiry within 24 hours.
          </p>
          <div class="contact-form">
            <input type="text" placeholder="Your Name" class="form-input" />
            <input type="email" placeholder="Email Address" class="form-input" />
            <input type="tel" placeholder="Phone Number" class="form-input" />
            <select class="form-input">
              <option value="" disabled selected>Inquiry Type</option>
              <option value="donation">Donation Information</option>
              <option value="volunteer">Volunteer Opportunities</option>
              <option value="programs">Program Inquiries</option>
              <option value="partnership">Partnership Possibilities</option>
              <option value="other">Other</option>
            </select>
            <textarea placeholder="Your Message" class="form-textarea"></textarea>
            <button class="submit-button">SEND MESSAGE</button>
          </div>
        </div>

        <div class="contact-card info-card">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h4 class="card-title">Contact Details</h4>
          <div class="contact-details">
            <div class="detail-item">
              <h5 class="detail-title">Our Office</h5>
              <p class="detail-text">
                121 Ogudu Road<br>
                Lagos, Nigeria
              </p>
            </div>

            <div class="detail-item">
              <h5 class="detail-title">Phone</h5>
              <p class="detail-text">
                Main: (+234) 703 631 9444<br>
                Support: 0814 857 1524
              </p>
            </div>

            <div class="detail-item">
              <h5 class="detail-title">Email</h5>
              <p class="detail-text">
                <a href="mailto:info@oaktreeinitiative.org">info@oaktreeinitiative.org</a><br>
                <a href="mailto:support@oaktreeinitiative.org">support@oaktreeinitiative.org</a>
              </p>
            </div>

            <div class="detail-item">
              <h5 class="detail-title">Hours</h5>
              <p class="detail-text">
                Monday – Friday<br>
                8:00 a.m. – 6:00 p.m. (WAT)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-message">
        <p>
          Your feedback helps us improve our services and better fulfill our mission. If you have suggestions or
          encountered any issues with our website, please let us know. Together, we can create lasting change for
          communities in need. <span class="highlight-link">SHARE YOUR FEEDBACK</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUsSection'
}
</script>

<style scoped>
.contact-us-section {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.content-wrapper {
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  font-size: 1rem;
  color: #065f46;
  margin-bottom: 2.5rem;
  letter-spacing: 1px;
  font-weight: 600;
}

.intro-text {
  margin-bottom: 3.5rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.thank-you {
  font-size: 1.6rem;
  color: #065f46;
  margin-bottom: 1.2rem;
  font-weight: 500;
}

.description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #444;
}

.contact-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3.5rem;
}

.contact-card {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background-color: #CAF7E8FF;
  color: #000000;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.card-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.8rem;
  line-height: 1.6;
}

.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input,
.form-textarea {
  padding: 0.85rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.95rem;
  width: 100%;
  background-color: #f9f9f9;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-button {
  padding: 1rem 1.5rem;
  background-color: #065f46;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.submit-button:hover {
  background-color: #054e3b;
}

.info-card {
  text-align: left;
}

.contact-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-item {
  margin-bottom: 0.5rem;
}

.detail-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.detail-text {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

.detail-text a {
  color: #065f46;
  text-decoration: none;
  transition: color 0.3s;
}

.detail-text a:hover {
  color: #054e3b;
  text-decoration: underline;
}

.footer-message {
  max-width: 900px;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.highlight-link {
  font-weight: 600;
  color: #065f46;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 0.5rem;
}

@media (max-width: 992px) {
  .content-wrapper {
    width: 90%;
  }

  .contact-options {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }

  .thank-you {
    font-size: 1.4rem;
  }

  .contact-card {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    width: 95%;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .icon-container {
    width: 70px;
    height: 70px;
  }
}
</style>

<script setup>
definePageMeta({
  layout: "landing"
});

useSeoMeta({
  title: 'The OakTree Empowerment Initiative',
  ogTitle: 'The OakTree Empowerment Initiative',
  titleTemplate: 'The OakTree Empowerment Initiative',
  description: 'Rebuilding Lives & Communities',
  ogDescription: 'Rebuilding Lives & Communities',

  twitterCard: 'summary_large_image',
  twitterTitle: 'The OakTree Empowerment Initiative',
  twitterDescription: 'Rebuilding Lives & Communities',

  ogImage: {
    url: 'https://petabiz-telco.com/Petabiz-Telco.png',
    width: 1200,
    height: 630,
    alt: 'The OakTree Empowerment Initiative - Rebuilding Lives & Communities'
  },
  twitterImage: 'https://petabiz-telco.com/Petabiz-Telco.png'
})
</script>