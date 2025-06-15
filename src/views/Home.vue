<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">High-Converting Websites <span>That Drive Sales</span></h1>
        <p class="hero-subtitle">
          Helping businesses grow with websites that don't just look good—they sell.
        </p>
        <div class="hero-cta-container">
          <router-link to="/contact" class="cta-button primary">Get Your Website</router-link>
          <router-link to="/portfolio" class="cta-button secondary">See My Work</router-link>
        </div>
      </div>
      <div class="hero-image-container">
        <img src="/assets/images/hero-image.svg" alt="Website conversion illustration" class="hero-image">
      </div>
    </section>

    <!-- Trust Indicators -->
    <section class="trust-indicators">
      <div class="trust-card">
        <div class="trust-icon">💰</div>
        <h3>Increased Revenue</h3>
        <p>Clients see an average of 35% increase in online sales after redesign</p>
      </div>
      <div class="trust-card">
        <div class="trust-icon">📈</div>
        <h3>Better Conversions</h3>
        <p>Higher conversion rates with optimized user experience and clear CTAs</p>
      </div>
      <div class="trust-card">
        <div class="trust-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Speed-optimized websites that load quickly and keep customers engaged</p>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <h2 class="section-title">Services That Drive Growth</h2>
      <div class="services-container">
        <div class="service-card">
          <div class="service-icon">🎯</div>
          <h3>Conversion-Focused Design</h3>
          <p>Websites built specifically to turn visitors into customers with strategic layouts and persuasive elements.</p>
        </div>
        <div class="service-card">
          <div class="service-icon">📱</div>
          <h3>Mobile-First Approach</h3>
          <p>Seamless experience across all devices ensuring you never lose a customer due to poor mobile experience.</p>
        </div>
        <div class="service-card">
          <div class="service-icon">🚀</div>
          <h3>Speed Optimization</h3>
          <p>Lightning-fast websites that load quickly, keeping bounce rates low and engagement high.</p>
        </div>
        <div class="service-card">
          <div class="service-icon">💬</div>
          <h3>Telegram Integration</h3>
          <p>Unique instant-order system sending customer orders directly to your Telegram for faster fulfillment.</p>
        </div>
      </div>
    </section>

    <!-- Unique Selling Proposition -->
    <section class="usp">
      <div class="usp-content">
        <h2 class="section-title">The Trilogoweb Difference</h2>
        <div class="usp-features">
          <div class="usp-feature">
            <div class="feature-icon">✅</div>
            <div class="feature-content">
              <h3>Cash-on-Delivery Optimized</h3>
              <p>Specialized in creating websites for businesses that rely on COD as their primary payment method.</p>
            </div>
          </div>
          <div class="usp-feature">
            <div class="feature-icon">✅</div>
            <div class="feature-content">
              <h3>Instant Telegram Orders</h3>
              <p>Customer orders are sent directly to your Telegram—no missed orders, instant notifications.</p>
            </div>
          </div>
          <div class="usp-feature">
            <div class="feature-icon">✅</div>
            <div class="feature-content">
              <h3>Results-Driven Design</h3>
              <p>Every element of your website is strategically designed to maximize conversions and sales.</p>
            </div>
          </div>
          <div class="usp-feature">
            <div class="feature-icon">✅</div>
            <div class="feature-content">
              <h3>No Tech Headaches</h3>
              <p>Simple, intuitive interfaces that you can manage without technical expertise.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="usp-image">
        <img src="/assets/images/telegram-integration.svg" alt="Telegram order integration illustration">
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <h2 class="section-title">What Clients Say</h2>
      <div class="testimonials-container">
        <div class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-mark">"</div>
            <p>Our online sales increased by 47% in the first month after Trilogoweb redesigned our website. The Telegram integration has made order management incredibly efficient.</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar"></div>
            <div class="author-info">
              <h4>Sarah Johnson</h4>
              <p>Owner, FreshBite Kitchen</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-mark">"</div>
            <p>The conversion rate on our product pages jumped from 2.3% to 8.7% after implementing Trilogoweb's design recommendations. The ROI was immediate and substantial.</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar"></div>
            <div class="author-info">
              <h4>Michael Chen</h4>
              <p>CEO, TechGear</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-mark">"</div>
            <p>As a small business relying on cash-on-delivery, having a website that's optimized for this model has been game-changing. Our order volume doubled in just weeks.</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar"></div>
            <div class="author-info">
              <h4>Aisha Rahman</h4>
              <p>Founder, Bloom Boutique</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process">
      <h2 class="section-title">How We Work Together</h2>
      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <h3>Discovery</h3>
          <p>We dive deep into understanding your business, customers, and goals to create a tailored strategy.</p>
        </div>
        <div class="process-step">
          <div class="step-number">2</div>
          <h3>Design</h3>
          <p>Creating a conversion-focused design that represents your brand and guides visitors to action.</p>
        </div>
        <div class="process-step">
          <div class="step-number">3</div>
          <h3>Development</h3>
          <p>Building a fast, responsive website with all necessary integrations including Telegram orders.</p>
        </div>
        <div class="process-step">
          <div class="step-number">4</div>
          <h3>Launch & Optimize</h3>
          <p>Going live with your site and continuously improving based on performance data.</p>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta">
      <h2>Ready to Turn Your Website Into a Sales Machine?</h2>
      <p>Let's create a high-converting website that helps your business grow.</p>
      <router-link to="/contact" class="cta-button primary large">Get Started Now</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: 'Trilogoweb - High-Converting Websites That Drive Sales'
  }
}
</script>

<style scoped>
/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  padding: 4rem 5%;
  background: linear-gradient(120deg, #ffffff 60%, #f8fafc 60%);
}

.hero-content {
  flex: 1;
  padding-right: 2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  color: #1a202c;
  margin-bottom: 1.5rem;
}

.hero-title span {
  color: #3182ce;
  display: block;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 2rem;
  max-width: 90%;
}

.hero-cta-container {
  display: flex;
  gap: 1rem;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background-color: #3182ce;
  color: white;
}

.cta-button.primary:hover {
  background-color: #2c5282;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(49, 130, 206, 0.1);
}

.cta-button.secondary {
  background-color: #edf2f7;
  color: #2d3748;
}

.cta-button.secondary:hover {
  background-color: #e2e8f0;
  transform: translateY(-2px);
}

.cta-button.large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.hero-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
}

/* Trust Indicators */
.trust-indicators {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem 5%;
  background-color: #f7fafc;
}

.trust-card {
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.trust-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.trust-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.trust-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.trust-card p {
  color: #4a5568;
}

/* Services Section */
.services {
  padding: 4rem 5%;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -0.75rem;
  width: 80px;
  height: 4px;
  background-color: #3182ce;
  transform: translateX(-50%);
}

.services-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.service-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
}

.service-card p {
  color: #4a5568;
  line-height: 1.6;
}

/* Unique Selling Proposition */
.usp {
  padding: 4rem 5%;
  background-color: #f7fafc;
  display: flex;
  align-items: center;
}

.usp-content {
  flex: 1;
}

.usp-features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.usp-feature {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.feature-icon {
  font-size: 1.5rem;
  color: #3182ce;
  margin-right: 1rem;
  flex-shrink: 0;
}

.feature-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.feature-content p {
  color: #4a5568;
  line-height: 1.6;
}

.usp-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.usp-image img {
  max-width: 100%;
  height: auto;
}

/* Testimonials */
.testimonials {
  padding: 4rem 5%;
  background-color: white;
}

.testimonials-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.testimonial-card {
  background: #f7fafc;
  border-radius: 0.5rem;
  padding: 2rem;
  flex: 1 1 300px;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.testimonial-content {
  position: relative;
  margin-bottom: 1.5rem;
}

.quote-mark {
  font-size: 3rem;
  line-height: 0;
  position: absolute;
  top: 10px;
  left: -10px;
  color: #e2e8f0;
  font-family: Georgia, serif;
}

.testimonial-content p {
  position: relative;
  z-index: 1;
  font-style: italic;
  color: #4a5568;
  line-height: 1.6;
  padding-left: 1.5rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #cbd5e0;
  margin-right: 1rem;
}

.author-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.author-info p {
  font-size: 0.875rem;
  color: #718096;
}

/* Process Section */
.process {
  padding: 4rem 5%;
  background-color: white;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.process-step {
  text-align: center;
  padding: 1.5rem;
}

.step-number {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background-color: #3182ce;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.process-step h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
}

.process-step p {
  color: #4a5568;
  line-height: 1.6;
}

/* Final CTA */
.final-cta {
  padding: 5rem 5%;
  text-align: center;
  background-color: #3182ce;
  color: white;
}

.final-cta h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.final-cta p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.final-cta .cta-button.primary {
  background-color: white;
  color: #3182ce;
}

.final-cta .cta-button.primary:hover {
  background-color: #f7fafc;
  color: #2c5282;
}

/* Responsive Styles */
@media screen and (max-width: 1024px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding-bottom: 3rem;
  }

  .hero-content {
    padding-right: 0;
    margin-bottom: 3rem;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta-container {
    justify-content: center;
  }

  .usp {
    flex-direction: column;
  }

  .usp-image {
    margin-top: 3rem;
  }
}

@media screen and (max-width: 768px) {
  .trust-indicators {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .final-cta h2 {
    font-size: 2rem;
  }

  .usp-features {
    grid-template-columns: 1fr;
  }
}
</style>