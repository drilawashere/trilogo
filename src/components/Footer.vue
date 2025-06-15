<template>
  <footer class="footer">
    <div class="container">
      <!-- Top section with logo, navigation, and contact info -->
      <div class="footer-top">
        <div class="footer-logo">
          <h2>Trilogoweb</h2>
          <p class="tagline">High-Converting Website Design</p>
        </div>
        
        <div class="footer-navigation">
          <h3>Site Map</h3>
          <nav class="footer-nav">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/portfolio">Portfolio</router-link>
            <router-link to="/contact">Contact</router-link>
          </nav>
        </div>
        
        <div class="footer-contact">
          <h3>Contact Us</h3>
          <div class="contact-info">
            <p><strong>Email:</strong> info@trilogoweb.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Web Design St, Creative City</p>
          </div>
        </div>
        
        <div class="footer-social">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#" class="social-link" title="Facebook">
              <span class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </span>
            </a>
            <a href="#" class="social-link" title="Twitter">
              <span class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </span>
            </a>
            <a href="#" class="social-link" title="Instagram">
              <span class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </span>
            </a>
            <a href="#" class="social-link" title="LinkedIn">
              <span class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </span>
            </a>
            <a href="#" class="social-link" title="Telegram">
              <span class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Middle section with newsletter subscription -->
      <div class="footer-middle">
        <div class="newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest web design tips and conversion strategies straight to your inbox</p>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <input 
              type="email" 
              placeholder="Your email address" 
              v-model="email"
              required 
            />
            <button type="submit" class="subscribe-btn">
              <span v-if="isSubscribing">Sending...</span>
              <span v-else>Subscribe</span>
            </button>
          </form>
          <p v-if="subscriptionMessage" class="subscription-message" :class="{ 'success': subscriptionSuccess }">
            {{ subscriptionMessage }}
          </p>
        </div>
      </div>
      
      <!-- Bottom section with copyright, terms, etc. -->
      <div class="footer-bottom">
        <div class="copyright">
          &copy; {{ currentYear }} Trilogoweb. All rights reserved.
        </div>
        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      email: '',
      isSubscribing: false,
      subscriptionMessage: '',
      subscriptionSuccess: false,
      currentYear: new Date().getFullYear()
    };
  },
  methods: {
    async subscribeNewsletter() {
      this.isSubscribing = true;
      this.subscriptionMessage = '';
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Subscription success
        this.subscriptionSuccess = true;
        this.subscriptionMessage = 'Thank you for subscribing to our newsletter!';
        this.email = '';
      } catch (error) {
        // Subscription error
        this.subscriptionSuccess = false;
        this.subscriptionMessage = 'Sorry, there was an error. Please try again.';
      } finally {
        this.isSubscribing = false;
      }
    }
  }
};
</script>

<style scoped>
.footer {
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Footer Top Section */
.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 2rem;
}

.footer-top > div {
  flex: 1 1 200px;
}

.footer-logo h2 {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.footer-logo .tagline {
  color: #a0aec0;
  font-size: 1rem;
}

.footer-navigation h3,
.footer-contact h3,
.footer-social h3 {
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  position: relative;
}

.footer-navigation h3::after,
.footer-contact h3::after,
.footer-social h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 30px;
  height: 2px;
  background-color: #3182ce;
}

/* Footer Navigation */
.footer-nav {
  display: flex;
  flex-direction: column;
}

.footer-nav a {
  color: #cbd5e0;
  margin-bottom: 0.75rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-nav a:hover {
  color: white;
  text-decoration: underline;
}

/* Footer Contact */
.contact-info p {
  margin-bottom: 0.75rem;
}

/* Footer Social Links */
.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #2d3748;
  border-radius: 50%;
  color: #e2e8f0;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #3182ce;
  transform: translateY(-3px);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Footer Middle Section - Newsletter */
.footer-middle {
  border-top: 1px solid #2d3748;
  border-bottom: 1px solid #2d3748;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.newsletter {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.newsletter h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.newsletter p {
  margin-bottom: 1.5rem;
  color: #a0aec0;
}

.newsletter-form {
  display: flex;
  gap: 0.75rem;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  border: 2px solid transparent;
  background-color: #2d3748;
  color: white;
  outline: none;
  transition: all 0.3s ease;
}

.newsletter-form input:focus {
  border-color: #3182ce;
}

.newsletter-form input::placeholder {
  color: #a0aec0;
}

.subscribe-btn {
  background-color: #3182ce;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.subscribe-btn:hover {
  background-color: #2c5282;
}

.subscription-message {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #e53e3e;
}

.subscription-message.success {
  color: #48bb78;
}

/* Footer Bottom Section */
.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #a0aec0;
}

.copyright {
  margin-bottom: 1rem;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-links a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.legal-links a:hover {
  color: white;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
  }
  
  .footer-navigation h3::after,
  .footer-contact h3::after,
  .footer-social h3::after {
    width: 40px;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .legal-links {
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>