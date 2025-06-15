<template>
  <div class="contact-container">
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="contact-hero-content">
        <h1>Get In Touch</h1>
        <p class="tagline">Let's create a high-converting website for your business</p>
      </div>
    </section>

    <section class="contact-main">
      <div class="content-wrapper">
        <!-- Contact Info -->
        <div class="contact-info">
          <h2>Let's Talk About Your Project</h2>
          <p class="contact-intro">
            Ready to transform your website into a sales-generating machine? Fill out the form 
            with your project details, and we'll get back to you within 24 hours to discuss 
            how we can help your business grow.
          </p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">📧</div>
              <div class="method-details">
                <h3>Email Us</h3>
                <p>info@trilogoweb.com</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">📞</div>
              <div class="method-details">
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">🗓️</div>
              <div class="method-details">
                <h3>Office Hours</h3>
                <p>Monday-Friday: 9am - 5pm</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-highlight">
            <div class="quote-mark">"</div>
            <p class="highlight-quote">
              Working with Trilogoweb was one of the best business decisions we've made. 
              Our new website delivered an ROI within the first month.
            </p>
            <div class="highlight-author">
              Michael Chen, TechGear CEO
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="contact-form-container">
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-header">
              <h3>Project Inquiry</h3>
              <p>Fields marked with * are required</p>
            </div>
            
            <div class="form-section">
              <h4>1. Tell us about yourself</h4>
              
              <div class="form-group">
                <label for="name">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  required
                  :class="{ 'error': errors.name }"
                >
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    required
                    :class="{ 'error': errors.email }"
                  >
                  <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="formData.phone"
                  >
                </div>
              </div>
              
              <div class="form-group">
                <label for="company">Company/Business Name</label>
                <input 
                  type="text" 
                  id="company" 
                  v-model="formData.company"
                >
              </div>
            </div>
            
            <div class="form-section">
              <h4>2. About your project</h4>
              
              <div class="form-group">
                <label>Project Type *</label>
                <div class="checkbox-group">
                  <div 
                    v-for="(type, index) in projectTypes" 
                    :key="index"
                    class="checkbox-item"
                  >
                    <input 
                      type="checkbox" 
                      :id="`type-${index}`" 
                      :value="type"
                      v-model="formData.projectType"
                    >
                    <label :for="`type-${index}`">{{ type }}</label>
                  </div>
                </div>
                <span v-if="errors.projectType" class="error-message">{{ errors.projectType }}</span>
              </div>
              
              <div class="form-group">
                <label for="budget">Budget Range *</label>
                <select 
                  id="budget" 
                  v-model="formData.budget"
                  required
                  :class="{ 'error': errors.budget }"
                >
                  <option value="" disabled selected>Select budget range</option>
                  <option v-for="(budget, index) in budgetRanges" :key="index" :value="budget">
                    {{ budget }}
                  </option>
                </select>
                <span v-if="errors.budget" class="error-message">{{ errors.budget }}</span>
              </div>
              
              <div class="form-group">
                <label for="timeline">Timeline *</label>
                <select 
                  id="timeline" 
                  v-model="formData.timeline"
                  required
                  :class="{ 'error': errors.timeline }"
                >
                  <option value="" disabled selected>Select preferred timeline</option>
                  <option v-for="(timeline, index) in timelines" :key="index" :value="timeline">
                    {{ timeline }}
                  </option>
                </select>
                <span v-if="errors.timeline" class="error-message">{{ errors.timeline }}</span>
              </div>
              
              <div class="form-group">
                <label for="description">Project Description *</label>
                <textarea 
                  id="description"
                  v-model="formData.description"
                  rows="5" 
                  placeholder="Tell us about your business, project goals, any specific features you need..."
                  required
                  :class="{ 'error': errors.description }"
                ></textarea>
                <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
              </div>
              
              <div class="form-group">
                <label>Do you have an existing website?</label>
                <div class="radio-group">
                  <div class="radio-item">
                    <input 
                      type="radio" 
                      id="website-yes" 
                      value="Yes" 
                      v-model="formData.existingWebsite"
                    >
                    <label for="website-yes">Yes</label>
                  </div>
                  <div class="radio-item">
                    <input 
                      type="radio" 
                      id="website-no" 
                      value="No" 
                      v-model="formData.existingWebsite"
                    >
                    <label for="website-no">No</label>
                  </div>
                </div>
              </div>
              
              <div class="form-group" v-if="formData.existingWebsite === 'Yes'">
                <label for="websiteUrl">Current Website URL</label>
                <input 
                  type="url" 
                  id="websiteUrl" 
                  v-model="formData.websiteUrl" 
                  placeholder="https://"
                >
              </div>
              
              <div class="form-group">
                <label>Are you interested in our Telegram order integration?</label>
                <div class="radio-group">
                  <div class="radio-item">
                    <input 
                      type="radio" 
                      id="telegram-yes" 
                      value="Yes" 
                      v-model="formData.telegramIntegration"
                    >
                    <label for="telegram-yes">Yes</label>
                  </div>
                  <div class="radio-item">
                    <input 
                      type="radio" 
                      id="telegram-no" 
                      value="No" 
                      v-model="formData.telegramIntegration"
                    >
                    <label for="telegram-no">No</label>
                  </div>
                  <div class="radio-item">
                    <input 
                      type="radio" 
                      id="telegram-more-info" 
                      value="Need more information" 
                      v-model="formData.telegramIntegration"
                    >
                    <label for="telegram-more-info">Need more information</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="message">Additional Information</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="3"
                placeholder="Anything else you'd like to share with us?"
              ></textarea>
            </div>
            
            <div class="form-group">
              <div class="checkbox-item terms-checkbox">
                <input 
                  type="checkbox" 
                  id="terms" 
                  v-model="formData.termsAccepted"
                  :class="{ 'error': errors.termsAccepted }"
                >
                <label for="terms">
                  I agree to the <a href="#" class="terms-link">Privacy Policy</a> and consent to being contacted about this inquiry *
                </label>
              </div>
              <span v-if="errors.termsAccepted" class="error-message">{{ errors.termsAccepted }}</span>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="submit-button" :disabled="isSubmitting">
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Inquiry</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    
    <!-- Success Modal -->
    <div class="modal" v-if="showSuccessModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-close" @click="closeModal">&times;</div>
        <div class="modal-body">
          <div class="success-icon">✓</div>
          <h2>Inquiry Sent!</h2>
          <p>
            Thank you for reaching out! We've received your project details and will get back 
            to you within 24 hours.
          </p>
          <button class="close-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
    
    <!-- FAQ Section -->
    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>
      
      <div class="faq-container">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index" 
          class="faq-item"
          :class="{ 'active': activeFaq === index }"
        >
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ faq.question }}</h3>
            <div class="faq-icon">
              <span v-if="activeFaq === index">−</span>
              <span v-else>+</span>
            </div>
          </div>
          <div class="faq-answer" v-show="activeFaq === index">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  metaInfo: {
    title: 'Contact Trilogoweb - Get a Quote for Your Website Project'
  },
  data() {
    return {
      isSubmitting: false,
      showSuccessModal: false,
      activeFaq: null,
      errors: {},
      projectTypes: [
        'E-commerce Website',
        'Business Website',
        'Landing Page',
        'Website Redesign',
        'Telegram Integration',
        'Other'
      ],
      budgetRanges: [
        'Less than $1,000',
        '$1,000 - $2,500',
        '$2,500 - $5,000',
        '$5,000 - $10,000',
        '$10,000+'
      ],
      timelines: [
        'ASAP (1-2 weeks)',
        'Soon (2-4 weeks)',
        'Standard (1-2 months)',
        'Flexible (2+ months)',
        'Not sure yet'
      ],
      formData: {
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: [],
        budget: '',
        timeline: '',
        description: '',
        existingWebsite: 'No',
        websiteUrl: '',
        telegramIntegration: 'Need more information',
        message: '',
        termsAccepted: false
      },
      faqs: [
        {
          question: 'How much does a website typically cost?',
          answer: 'Website costs vary based on complexity, features, and business requirements. Simple websites start around $1,000, while more complex e-commerce sites with custom features typically range from $2,500 to $10,000+. We provide custom quotes based on your specific needs and goals.'
        },
        {
          question: 'How long does it take to build a website?',
          answer: 'Our typical timeline is 2-4 weeks for simple websites and 4-8 weeks for more complex e-commerce sites. Factors that influence timeline include the complexity of design, number of pages, custom functionality requirements, and how quickly you provide feedback during the review stages.'
        },
        {
          question: 'What\'s unique about your Telegram integration feature?',
          answer: 'Our Telegram integration allows customer orders to be sent directly to your Telegram account in real-time. This means you\'ll receive instant notifications for new orders, allowing for faster processing and fulfillment. It\'s especially valuable for businesses using cash-on-delivery models or those needing to respond quickly to customer requests.'
        },
        {
          question: 'Do you offer website maintenance services?',
          answer: 'Yes, we offer ongoing maintenance packages to keep your website secure, up-to-date, and performing optimally. Our maintenance services include regular updates, security monitoring, performance optimization, and technical support when you need it.'
        },
        {
          question: 'How do you ensure my website will convert visitors into customers?',
          answer: 'We design with conversion in mind from the start, using proven strategies like clear call-to-actions, strategic layout, trust elements, streamlined user journeys, and persuasive content. We also conduct user testing during development and can implement A/B testing after launch to continuously improve conversion rates.'
        }
      ]
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      let isValid = true;
      
      // Name validation
      if (!this.formData.name.trim()) {
        this.errors.name = 'Name is required';
        isValid = false;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.formData.email.trim()) {
        this.errors.email = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Project Type validation
      if (this.formData.projectType.length === 0) {
        this.errors.projectType = 'Please select at least one project type';
        isValid = false;
      }
      
      // Budget validation
      if (!this.formData.budget) {
        this.errors.budget = 'Please select a budget range';
        isValid = false;
      }
      
      // Timeline validation
      if (!this.formData.timeline) {
        this.errors.timeline = 'Please select a timeline';
        isValid = false;
      }
      
      // Description validation
      if (!this.formData.description.trim()) {
        this.errors.description = 'Project description is required';
        isValid = false;
      }
      
      // Terms validation
      if (!this.formData.termsAccepted) {
        this.errors.termsAccepted = 'You must accept the terms to continue';
        isValid = false;
      }
      
      return isValid;
    },
    async submitForm() {
      if (!this.validateForm()) {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      this.isSubmitting = true;
      
      // Here you would typically send the form data to your backend
      // For this example, we'll simulate an API call with a timeout
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success modal
        this.showSuccessModal = true;
        
        // Reset form
        this.resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
        // Here you would handle the error, possibly showing an error message
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: [],
        budget: '',
        timeline: '',
        description: '',
        existingWebsite: 'No',
        websiteUrl: '',
        telegramIntegration: 'Need more information',
        message: '',
        termsAccepted: false
      };
    },
    closeModal() {
      this.showSuccessModal = false;
    },
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    }
  }
}
</script>

<style scoped>
.contact-container {
  width: 100%;
}

/* Hero Section */
.contact-hero {
  background-color: #f7fafc;
  padding: 5rem 5%;
  text-align: center;
}

.contact-hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 1.5rem;
}

.tagline {
  font-size: 1.5rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
}

/* Main Content */
.contact-main {
  padding: 4rem 0;
}

.content-wrapper {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-info {
  flex: 1;
  padding-right: 2rem;
}

.contact-info h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  position: relative;
}

.contact-info h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 60px;
  height: 3px;
  background-color: #3182ce;
}

.contact-intro {
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

/* Contact Methods */
.contact-methods {
  margin-bottom: 3rem;
}

.contact-method {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.method-icon {
  font-size: 1.75rem;
  margin-right: 1rem;
  color: #3182ce;
  width: 36px;
  text-align: center;
}

.method-details h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.method-details p {
  color: #4a5568;
}

/* Testimonial Highlight */
.testimonial-highlight {
  padding: 2rem;
  background-color: #f7fafc;
  border-radius: 0.5rem;
  position: relative;
  border-left: 4px solid #3182ce;
}

.quote-mark {
  font-size: 4rem;
  position: absolute;
  top: 0;
  left: 1rem;
  line-height: 1;
  color: rgba(49, 130, 206, 0.15);
  font-family: Georgia, serif;
}

.highlight-quote {
  font-style: italic;
  color: #4a5568;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.highlight-author {
  font-weight: 600;
  color: #3182ce;
}

/* Contact Form */
.contact-form-container {
  flex: 1.5;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.contact-form {
  padding: 2rem;
}

.form-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
}

.form-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.form-header p {
  font-size: 0.875rem;
  color: #718096;
}

.form-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;
}

.form-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.25rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="url"],
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #2d3748;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

input.error,
select.error,
textarea.error {
  border-color: #e53e3e;
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.375rem;
  display: block;
}

/* Checkbox & Radio Styles */
.checkbox-group,
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.checkbox-item,
.radio-item {
  display: flex;
  align-items: flex-start;
}

.checkbox-item {
  flex-basis: calc(50% - 0.75rem);
}

.radio-item input,
.checkbox-item input {
  margin-top: 0.25rem;
  margin-right: 0.5rem;
  cursor: pointer;
}

.terms-checkbox {
  flex-basis: 100%;
}

.terms-link {
  color: #3182ce;
  text-decoration: underline;
}

/* Submit Button */
.form-actions {
  text-align: center;
}

.submit-button {
  background-color: #3182ce;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.submit-button:hover {
  background-color: #2c5282;
  transform: translateY(-2px);
}

.submit-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
  transform: none;
}

/* Success Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: #a0aec0;
}

.modal-body {
  padding: 1rem 0;
}

.success-icon {
  width: 60px;
  height: 60px;
  background-color: #48bb78;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

.modal-body h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.modal-body p {
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.close-button {
  background-color: #3182ce;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #2c5282;
}

/* FAQ Section */
.faq-section {
  padding: 5rem 5%;
  background-color: #f7fafc;
}

.faq-section h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 3rem;
  position: relative;
}

.faq-section h2::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -0.75rem;
  width: 80px;
  height: 3px;
  background-color: #3182ce;
  transform: translateX(-50%);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.active {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.faq-question {
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

.faq-question h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.faq-icon {
  font-size: 1.5rem;
  color: #3182ce;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  background-color: white;
}

.faq-answer p {
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
    padding: 0 5%;
  }

  .contact-info {
    padding-right: 0;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .contact-hero-content h1 {
    font-size: 2.5rem;
  }

  .tagline {
    font-size: 1.25rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1.25rem;
  }

  .checkbox-item {
    flex-basis: 100%;
  }
}

@media (max-width: 480px) {
  .contact-method {
    flex-direction: column;
    text-align: center;
  }

  .method-icon {
    margin-right: 0;
    margin-bottom: 0.75rem;
  }

  .form-section h4 {
    text-align: center;
  }

  .submit-button {
    width: 100%;
  }
}
</style>