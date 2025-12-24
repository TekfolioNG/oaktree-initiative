ui<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Column 1: About Us -->
      <div class="footer-column take-action">
        <a href="/">
          <img src="@/assets/img/toei-logo-footer.png" alt="The Oaktree Empowerment Initiative Logo"
            class="footer-logo">
        </a>
        <p class="about-description">
          Our programs focus on skills acquisition and rehabilitation for individuals seeking fresh starts after
          incarceration, while also building vital community infrastructure and
          self-sustaining communities across Nigeria.
        </p>
      </div>

      <!-- Column 2: Programs and Organization -->
      <div class="footer-column content-columns">
        <div class="programs-column">
          <h4>Programs</h4>
          <div class="links-grid">
            <NuxtLink to="/how-we-work#skills-training" class="footer-link">Skills Training</NuxtLink>
            <NuxtLink to="/how-we-work#empowerment" class="footer-link">Empowerment</NuxtLink>
            <NuxtLink to="/how-we-work#healthcare" class="footer-link">Healthcare</NuxtLink>
            <NuxtLink to="/how-we-work#infrastructure" class="footer-link">Infrastructure</NuxtLink>
          </div>
        </div>

        <div class="organization-column">
          <h4>Organization</h4>
          <div class="links-grid">
            <NuxtLink to="/who-we-are#mission" class="footer-link">Our Mission</NuxtLink>
            <NuxtLink to="/who-we-are#vision" class="footer-link">Our Vision</NuxtLink>
            <NuxtLink to="/who-we-are#values" class="footer-link">Our Values</NuxtLink>
            <NuxtLink to="/who-we-are" class="footer-link">About Us</NuxtLink>
            <NuxtLink to="/how-to-help" class="footer-link">Donate</NuxtLink>
            <NuxtLink to="/ideas-box" class="footer-link">Share Ideas</NuxtLink>
          </div>
        </div>
      </div>

      <!-- Column 3: Contact Info -->
      <div class="footer-column contact">
        <div class="contact-info">
          <h4>Contact Info</h4>
          <p>121 Ogudu Road, Lagos, Nigeria</p>
          <p>(+234) 703 631 9444</p>
          <p>0814 857 1524</p>
            <p>enquiry@oaktreeinitiative.org</p>
          <p>support@oaktreeinitiative.org</p>
          <NuxtLink to="/contact-us" class="contact-link">Contact Us</NuxtLink>
        </div>

        <div class="social-media">
          <h4>Follow Us</h4>
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank" class="social-icon" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" class="social-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" class="social-icon" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z">
                </path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="copyright">
        <a href="https://tekfolio.ng" target="_blank" class="developer-link">
          Website Development by Tekfolio Ltd
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.site-footer {
  background-color: #f4f4f4;
  padding: 4rem 2rem 2rem;
  color: #333;
}

.footer-container {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1.25fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;
}

.take-action {
  max-width: 350px;
}

.about-description {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-column h4 {
  color: #054033;
  margin-bottom: 1.25rem;
  font-weight: 600;
}

/* Content columns styling */
.content-columns {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.programs-column,
.organization-column {
  flex: 1;
}

/* Links grid for more compact layout */
.links-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.organization-column .links-grid {
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

/* Direct links instead of list items for cleaner layout */
.footer-link {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.2s ease;
  display: inline-block;
  font-size: 0.95rem;
}

.footer-link:hover {
  color: #086452;
  transform: translateX(2px);
}

.contact-link {
  color: #054033;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.2s ease;
  display: inline-block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 0.75rem;
  padding: 0.25rem 0;
  border-bottom: 1px solid #086452;
}

.contact-link:hover {
  color: #086452;
  transform: translateX(2px);
}

.footer-logo {
  max-width: 200px;
  margin-bottom: 1rem;
}

.contact-info p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

/* Social media icons */
.social-media {
  margin-top: 1.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-icon {
  color: #086452;
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: right;
  padding-top: 0.75rem;
  padding-bottom: 0.5rem;
  border-top: 1px solid #ddd;
  margin-top: 1.5rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.developer-link {
  color: #086452;
  text-decoration: underline;
  font-weight: 400;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.developer-link:hover {
  opacity: 1;
}

@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem 2rem;
  }

  .content-columns {
    flex-direction: column;
    gap: 2rem;
  }

  .organization-column .links-grid {
    grid-template-columns: 1fr;
  }

  .contact {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .site-footer {
    padding: 3rem 2rem 1.5rem;
  }

  .footer-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .content-columns {
    flex-direction: column;
    gap: 2rem;
  }

  .programs-column,
  .organization-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .footer-link {
    text-align: center;
  }

  .contact {
    grid-column: span 1;
  }

  .take-action {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-logo {
    align-self: center;
  }

  .social-media {
    display: flex;
    justify-content: center;
  }

  .social-icons {
    justify-content: center;
  }

  .contact-link {
    align-self: center;
    text-align: center;
    margin: 1rem auto 0;
    display: table;
  }

  .footer-bottom {
    margin-top: 1.25rem;
    padding-top: 0.5rem;
  }
}

@media (max-width: 480px) {
  .site-footer {
    padding: 2.5rem 1.5rem 1rem;
  }

  .links-grid {
    grid-template-columns: 1fr;
    max-width: 220px;
  }

  .footer-bottom {
    text-align: center;
    margin-top: 1rem;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
