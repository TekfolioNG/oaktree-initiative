<template>
  <section class="contact-us-section">
    <div class="header-background"></div>
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
            Fill out the form below and a member of our dedicated team will respond to your enquiry within 24 hours.
          </p>
          <form class="contact-form" @submit.prevent="submitForm" novalidate>
            <!-- Hidden Web3Forms access key -->
            <input type="hidden" name="access_key" v-model="formData.access_key">
            <input type="hidden" name="subject" value="New Contact Form Submission - Oaktree Initiative">
            <input type="hidden" name="from_name" value="Oaktree Empowerment Initiative Website">

            <!-- User input fields -->
            <input type="text" v-model="formData.name" placeholder="Your Name" class="form-input" name="name" required
              :class="{ 'error-input': errors.name }" />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>

            <input type="email" v-model="formData.email" placeholder="Email Address" class="form-input" name="email"
              required :class="{ 'error-input': errors.email }" />
            <div v-if="errors.email" class="error-message">{{ errors.email }}</div>

            <input type="tel" v-model="formData.phone" placeholder="Phone Number" class="form-input" name="phone" />

            <select v-model="formData.inquiry_type" class="form-input" name="inquiry_type" required
              :class="{ 'error-input': errors.inquiry_type }">
              <option value="" disabled>Inquiry Type</option>
              <option value="donation">Donation Information</option>
              <option value="volunteer">Volunteer Opportunities</option>
              <option value="programs">Program Inquiries</option>
              <option value="partnership">Partnership Possibilities</option>
              <option value="other">Other</option>
            </select>
            <div v-if="errors.inquiry_type" class="error-message">{{ errors.inquiry_type }}</div>

            <textarea v-model="formData.message" placeholder="Your Message" class="form-textarea" name="message"
              required :class="{ 'error-input': errors.message }"></textarea>
            <div v-if="errors.message" class="error-message">{{ errors.message }}</div>

            <!-- Honeypot field to prevent spam -->
            <input type="checkbox" name="botcheck" class="hidden" style="display: none;">

            <div v-if="formStatus === 'success'" class="success-message">
              Thank you for your message! We will get back to you shortly.
            </div>
            <div v-if="formStatus === 'error'" class="error-message">
              There was a problem sending your message. Please try again or contact us directly.
            </div>

            <button type="submit" class="submit-button" :disabled="formStatus === 'submitting'">
              {{ formStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE' }}
            </button>
          </form>
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
                <a href="mailto:admin@oaktreeinitiative.org">admin@oaktreeinitiative.org</a><br>
      
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
          communities in need.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactUsSection'
}
</script>

<script setup>
import { reactive, ref } from 'vue';

definePageMeta({
  layout: "landing"
});

useSeoMeta({
  title: 'Contact Us | The OakTree Empowerment Initiative',
  ogTitle: 'Contact Us | The OakTree Empowerment Initiative',
  titleTemplate: 'Contact Us | The OakTree Empowerment Initiative',
  description: 'Rebuilding Lives & Communities',
  ogDescription: 'Rebuilding Lives & Communities',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Contact Us | The OakTree Empowerment Initiative',
  twitterDescription: 'Contact Us | The OakTree Empowerment Initiative',

  ogImage: {
    url: 'https://oaktreeinitiative.org/toei-empowerment.jpg',
    width: 1200,
    height: 630,
    alt: 'The OakTree Empowerment Initiative - Rebuilding Lives & Communities'
  },
  twitterImage: 'https://oaktreeinitiative.org/toei-empowerment.jpg'
});

// Form data state
const formData = reactive({
  access_key: '67142dc6-5c30-4ff6-b1e1-fe03f014faac', // Rehrefplace with your actual Web3Forms href key
  name: '',
  email: '',
  phone: '',
  inquiry_type: '',
  message: ''
});

// Form validation and submission state
const errors = reactive({});
const formStatus = ref('idle'); // idle, submitting, success, error

// Validate form
const validateForm = () => {
  errors.name = formData.name ? '' : 'Name is required';
  errors.email = formData.email ? '' : 'Email is required';
  errors.email = formData.email && !isValidEmail(formData.email) ? 'Please enter a valid email' : errors.email;
  errors.inquiry_type = formData.inquiry_type ? '' : 'Please select an inquiry type';
  errors.message = formData.message ? '' : 'Message is required';

  return !errors.name && !errors.email && !errors.inquiry_type && !errors.message;
};

// Email validation helper
const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Submit form
const submitForm = async () => {
  // Reset previous form status
  formStatus.value = 'idle';

  // Clear previous error messages
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });

  // Validate form
  if (!validateForm()) {
    return;
  }

  formStatus.value = 'submitting';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      formStatus.value = 'success';
      // Reset form fields
      formData.name = '';
      formData.email = '';
      formData.phone = '';
      formData.inquiry_type = '';
      formData.message = '';

      // Reset form status after 5 seconds
      setTimeout(() => {
        formStatus.value = 'idle';
      }, 5000);
    } else {
      formStatus.value = 'error';
      console.error('Form submission error:', result);
    }
  } catch (error) {
    formStatus.value = 'error';
    console.error('Form submission error:', error);
  }
};
</script>

<style scoped>
.contact-us-section {
  padding: 4rem 0;
  background-color: #e6f5f0;
  position: relative;
  /* Increased padding to ensure the contact section doesn't interfere with the navbar */
  padding-top: 180px;
  margin-top: -60px;
  /* Pull the section up to connect with the navbar */
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 180px;
  /* Changed from black to deep green */
  background-color: #04231CFF;
  z-index: 0;
}

.content-wrapper {
  position: relative;
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
  margin-top: 80px;
}

.section-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
  /* Adjusted to ensure the title is visible but doesn't interfere with navbar */
  margin-top: -120px;
  padding-top: 60px;
}

.subtitle {
  font-size: 1rem;
  color: #012519FF;
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
  background-color: #CAF7E8;
  color: #054e3b;
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

.submit-button:disabled {
  background-color: #77aa98;
  cursor: not-allowed;
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

/* Form validation styles */
.error-input {
  border: 1px solid #dc2626;
  background-color: #fee2e2;
}

.error-message {
  color: #dc2626;
  font-size: 0.85rem;
  text-align: left;
  margin-top: -0.5rem;
}

.success-message {
  background-color: #d1fae5;
  color: #065f46;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
}

.hidden {
  display: none;
}

/* Responsive improvements */
@media (max-width: 1200px) {
  .content-wrapper {
    width: 90%;
  }
}

@media (max-width: 992px) {
  .contact-options {
    grid-template-columns: 1fr;
  }

  .contact-us-section {
    padding-top: 160px;
  }

  .header-background {
    height: 200px;
  }

  .section-title {
    margin-top: -100px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
    margin-top: -90px;
    padding-top: 50px;
  }

  .thank-you {
    font-size: 1.4rem;
  }

  .contact-card {
    padding: 2rem;
  }

  .contact-us-section {
    padding-top: 140px;
  }

  .header-background {
    height: 180px;
  }
}

@media (max-width: 576px) {
  .content-wrapper {
    width: 92%;
  }

  .section-title {
    font-size: 2rem;
    margin-top: -80px;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .contact-us-section {
    padding-top: 130px;
  }

  .header-background {
    height: 170px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    width: 95%;
  }

  .section-title {
    font-size: 1.8rem;
    margin-top: -70px;
    padding-top: 40px;
  }

  .icon-container {
    width: 70px;
    height: 70px;
  }

  .contact-us-section {
    padding-top: 120px;
  }

  .header-background {
    height: 160px;
  }

  .intro-text {
    margin-bottom: 2.5rem;
  }

  .thank-you {
    font-size: 1.3rem;
  }

  .description {
    font-size: 1rem;
  }

  .form-input,
  .form-textarea {
    padding: 0.75rem;
  }
}
</style>
