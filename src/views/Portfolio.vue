<template>
  <div class="portfolio-container">
    <!-- Hero Section -->
    <section class="portfolio-hero">
      <div class="portfolio-hero-content">
        <h1>Our Portfolio</h1>
        <p class="tagline">Real results for real businesses</p>
      </div>
    </section>

    <!-- Portfolio Filter -->
    <section class="filter-section">
      <div class="filter-container">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="{ active: activeFilter === filter.id }"
          class="filter-button"
        >
          {{ filter.name }}
        </button>
      </div>
    </section>

    <!-- Case Studies -->
    <section class="case-studies">
      <div class="case-studies-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="case-study-card"
        >
          <div class="case-study-image">
            <img :src="project.image" :alt="project.name">
            <div class="project-category">{{ project.category }}</div>
          </div>
          <div class="case-study-content">
            <h3>{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="results-container">
              <div class="result-item">
                <div class="result-number">{{ project.results.sales }}</div>
                <div class="result-label">Sales Increase</div>
              </div>
              <div class="result-item">
                <div class="result-number">{{ project.results.conversion }}</div>
                <div class="result-label">Conversion Rate</div>
              </div>
              <div class="result-item">
                <div class="result-number">{{ project.results.orders }}</div>
                <div class="result-label">Monthly Orders</div>
              </div>
            </div>
            <button @click="showProjectDetails(project)" class="view-case-study">
              View Case Study
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Details Modal -->
    <div v-if="selectedProject" class="project-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-modal" @click="closeModal">&times;</button>
        <div class="modal-header">
          <h2>{{ selectedProject.name }}</h2>
          <span class="project-category modal-category">{{ selectedProject.category }}</span>
        </div>
        
        <div class="modal-image">
          <img :src="selectedProject.image" :alt="selectedProject.name">
        </div>
        
        <div class="modal-body">
          <div class="project-challenge">
            <h3>The Challenge</h3>
            <p>{{ selectedProject.challenge }}</p>
          </div>
          
          <div class="project-solution">
            <h3>Our Solution</h3>
            <p>{{ selectedProject.solution }}</p>
          </div>

          <div class="key-features">
            <h3>Key Features Implemented</h3>
            <ul>
              <li v-for="(feature, index) in selectedProject.features" :key="index">
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="project-results">
            <h3>Results</h3>
            <div class="detailed-results">
              <div class="result-box">
                <div class="result-box-number">{{ selectedProject.results.sales }}</div>
                <div class="result-box-label">Sales Increase</div>
              </div>
              <div class="result-box">
                <div class="result-box-number">{{ selectedProject.results.conversion }}</div>
                <div class="result-box-label">Conversion Rate</div>
              </div>
              <div class="result-box">
                <div class="result-box-number">{{ selectedProject.results.orders }}</div>
                <div class="result-box-label">Monthly Orders</div>
              </div>
              <div class="result-box">
                <div class="result-box-number">{{ selectedProject.results.speed }}</div>
                <div class="result-box-label">Speed Improvement</div>
              </div>
            </div>
            <p class="client-quote">"{{ selectedProject.testimonial.quote }}"</p>
            <div class="testimonial-author">
              <strong>{{ selectedProject.testimonial.authorName }}</strong>, {{ selectedProject.testimonial.position }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact CTA -->
    <section class="portfolio-cta">
      <h2>Ready to Get Similar Results for Your Business?</h2>
      <p>Let's create a high-converting website that drives real growth.</p>
      <router-link to="/contact" class="cta-button primary large">Start Your Project</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Portfolio',
  metaInfo: {
    title: 'Portfolio - Trilogoweb High-Converting Website Design'
  },
  data() {
    return {
      activeFilter: 'all',
      selectedProject: null,
      filters: [
        { id: 'all', name: 'All Projects' },
        { id: 'ecommerce', name: 'E-commerce' },
        { id: 'business', name: 'Business' },
        { id: 'service', name: 'Service' }
      ],
      projects: [
        {
          id: 1,
          name: 'FreshBite Kitchen',
          category: 'E-commerce',
          description: 'A meal delivery service that needed to streamline their order process and improve mobile conversions.',
          results: {
            sales: '+47%',
            conversion: '8.3%',
            orders: '1,200+',
            speed: '2.8x'
          },
          challenge: 'FreshBite Kitchen was struggling with a complicated checkout process that led to high cart abandonment rates. Their website was slow to load on mobile devices, which was problematic as 70% of their traffic came from smartphones.',
          solution: 'We redesigned their entire ordering flow with a focus on mobile-first experience. We implemented the Telegram order integration system to notify the kitchen staff immediately of new orders, reducing fulfillment time by 35%.',
          features: [
            'Streamlined 2-step checkout process',
            'Real-time order notifications via Telegram',
            'Mobile-optimized menu display',
            'Automated COD confirmation system',
            'Customer order history and quick reorder functionality'
          ],
          testimonial: {
            quote: 'Our online sales increased by 47% in the first month after Trilogoweb redesigned our website. The Telegram integration has made order management incredibly efficient – we now process orders within minutes of receiving them.',
            name: 'Sarah Johnson',
            position: 'Owner, FreshBite Kitchen'
          }
        },
        {
          id: 2,
          name: 'TechGear',
          category: 'E-commerce',
          description: 'An electronics retailer looking to improve product page conversion rates and increase average order value.',
          results: {
            sales: '+52%',
            conversion: '8.7%',
            orders: '3,500+',
            speed: '3.2x'
          },
          challenge: 'TechGear had a vast product catalog but poor navigation and product presentation. Their conversion rate was stuck at 2.3%, and the site suffered from slow load times due to unoptimized images and scripts.',
          solution: 'We restructured their product catalog with a faceted search system, redesigned product pages with a focus on key selling points, and implemented a cross-sell recommendation engine that increased average order value by 28%.',
          features: [
            'High-performance faceted search and filtering',
            'Optimized product images with 360° views',
            'Product comparison tool',
            'AI-driven cross-sell recommendations',
            'Telegram notifications for high-value orders'
          ],
          testimonial: {
            quote: 'The conversion rate on our product pages jumped from 2.3% to 8.7% after implementing Trilogoweb\'s design recommendations. The ROI was immediate and substantial – we recouped our investment within the first month.',
            name: 'Michael Chen',
            position: 'CEO, TechGear'
          }
        },
        {
          id: 3,
          name: 'Bloom Boutique',
          category: 'E-commerce',
          description: 'A fashion boutique that needed to increase trust in their COD payment model and streamline order handling.',
          results: {
            sales: '+95%',
            conversion: '6.8%',
            orders: '850+',
            speed: '2.5x'
          },
          challenge: 'As a small fashion boutique, Bloom struggled with building customer trust for their cash-on-delivery model. Their manual order processing system was time-consuming and error-prone.',
          solution: 'We designed a website that emphasized trust elements and clearly explained the COD process. The implementation of the Telegram order system allowed the small team to manage orders efficiently without additional staff.',
          features: [
            'Trust badges and customer testimonials prominently displayed',
            'Transparent COD process explanation',
            'Size guide with visual references',
            'Instant Telegram notifications with order details',
            'Automated inventory management integration'
          ],
          // testimonial: {
          //   quote: 'As a small business relying on cash-on-delivery, having a website that's optimized for this model has been game-changing. Our order volume doubled in just weeks, and we've maintained a 98% fulfillment rate thanks to the efficient notification system.',
          //   name: 'Aisha Rahman',
          //   position: 'Founder, Bloom Boutique'
          // }
        },
        {
          id: 4,
          name: 'Legal Solutions',
          category: 'Service',
          description: 'A law firm seeking to increase qualified consultation bookings and improve client intake efficiency.',
          results: {
            sales: '+68%',
            conversion: '12.5%',
            orders: '95+',
            speed: '1.9x'
          },
          challenge: 'Legal Solutions had an outdated website that wasn\'t generating quality leads. Their consultation booking process required multiple phone calls, leading to scheduling inefficiencies and lost opportunities.',
          solution: 'We created a professional yet approachable design with clear practice area sections. An integrated booking system with qualification questions helped filter leads, and the Telegram notification system alerted attorneys immediately when high-value consultations were booked.',
          features: [
            'Interactive practice area exploration',
            'Pre-qualification questionnaire for consultations',
            'Secure document upload portal',
            'Priority notification system via Telegram',
            'Client testimonial video integration'
          ],
          testimonial: {
            quote: 'The new website has transformed our client acquisition process. We\'re now getting more qualified consultation requests, and the instant notifications allow us to respond within minutes, which has significantly improved our conversion from inquiry to retained client.',
            name: 'David Park',
            position: 'Managing Partner, Legal Solutions'
          }
        },
        {
          id: 5,
          name: 'Fitness Revolution',
          category: 'Service',
          description: 'A fitness studio looking to increase membership sign-ups and class bookings through their website.',
          results: {
            sales: '+73%',
            conversion: '9.2%',
            orders: '210+',
            speed: '3.0x'
          },
          challenge: 'Fitness Revolution\'s website wasn\'t effectively showcasing their unique approach and class offerings. The class booking system was cumbersome, and they had no way to capture leads from visitors who weren\'t ready to commit.',
          solution: 'We designed an engaging, high-energy website that communicated their brand value. We implemented a streamlined class booking system and created a lead capture strategy offering a free class in exchange for contact information.',
          features: [
            'Interactive class schedule with one-click booking',
            'Instructor profiles with expertise highlights',
            'Before/after transformation gallery',
            'Membership comparison tool',
            'Instant class booking confirmations via Telegram'
          ],
          testimonial: {
            quote: 'Since launching our new website, our class bookings have increased by 73%. The Telegram integration has been a game-changer for our team - we get instant notifications for new bookings, allowing us to personally welcome first-time visitors.',
            name: 'Elena Diaz',
            position: 'Owner, Fitness Revolution'
          }
        },
        {
          id: 6,
          name: 'BuildRight Construction',
          category: 'Business',
          description: 'A construction company that needed to generate more qualified leads and showcase their portfolio effectively.',
          results: {
            sales: '+125%',
            conversion: '7.8%',
            orders: '45+',
            speed: '2.7x'
          },
          challenge: 'BuildRight\'s website failed to showcase the quality of their work effectively. Their contact form was generating unqualified leads, wasting time on projects that weren\'t a good fit for their services.',
          solution: 'We created a visually-focused website with high-quality project galleries and detailed case studies. We implemented a multi-step qualification form that helped filter leads based on project type, budget, and timeline.',
          features: [
            'Interactive project gallery with filtering options',
            'Before/after sliders for renovations',
            'Project estimator tool',
            'Qualification-based contact form',
            'Priority lead notifications via Telegram'
          ],
          // testimonial: {
          //   quote: 'The quality of leads coming through our website has dramatically improved. We're now spending time on qualified prospects only, and our project pipeline has increased by 125%. The instant Telegram notifications ensure we respond to potential clients quickly.',
          //   authorName: 'Robert Wilson',
          //   position: 'CEO, BuildRight Construction'
          // }
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'all') {
        return this.projects;
      }
      return this.projects.filter(project => project.category.toLowerCase() === this.activeFilter);
    }
  },
  methods: {
    showProjectDetails(project) {
      this.selectedProject = project;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedProject = null;
      document.body.style.overflow = 'auto';
    }
  }
}
</script>

<style scoped>
.portfolio-container {
  width: 100%;
}

/* Hero Section */
.portfolio-hero {
  background-color: #f7fafc;
  padding: 5rem 5%;
  text-align: center;
}

.portfolio-hero-content h1 {
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

/* Filter Section */
.filter-section {
  padding: 2rem 5%;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
}

.filter-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-button {
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  border: 2px solid #e2e8f0;
  border-radius: 0.375rem;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button:hover {
  border-color: #cbd5e0;
  color: #2d3748;
}

.filter-button.active {
  border-color: #3182ce;
  color: #3182ce;
  font-weight: 600;
}

/* Case Studies Section */
.case-studies {
  padding: 4rem 5%;
}

.case-studies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.case-study-card {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
}

.case-study-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.case-study-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.case-study-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.case-study-card:hover .case-study-image img {
  transform: scale(1.05);
}

.project-category {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background-color: rgba(49, 130, 206, 0.8);
  color: white;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.case-study-content {
  padding: 1.5rem;
}

.case-study-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.project-description {
  color: #4a5568;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.results-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.result-item {
  text-align: center;
  flex: 1;
}

.result-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3182ce;
  margin-bottom: 0.25rem;
}

.result-label {
  font-size: 0.75rem;
  color: #718096;
}

.view-case-study {
  width: 100%;
  padding: 0.75rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-case-study:hover {
  background-color: #2c5282;
}

/* Modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  z-index: 1000;
  overflow-y: auto;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  margin-top: 2rem;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #2d3748;
  cursor: pointer;
  z-index: 10;
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
}

.modal-category {
  top: 1.5rem;
  right: 4rem;
}

.modal-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  padding: 2rem;
}

.modal-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

.project-challenge,
.project-solution {
  margin-bottom: 2rem;
}

.project-challenge p,
.project-solution p {
  color: #4a5568;
  line-height: 1.6;
}

.key-features {
  margin-bottom: 2rem;
}

.key-features ul {
  list-style-type: none;
  padding: 0;
}

.key-features li {
  padding: 0.75rem 0;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  padding-left: 1.5rem;
}

.key-features li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #3182ce;
  font-weight: bold;
}

.detailed-results {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.result-box {
  flex: 1 1 180px;
  background-color: #f7fafc;
  border-radius: 0.375rem;
  padding: 1.5rem;
  text-align: center;
}

.result-box-number {
  font-size: 2rem;
  font-weight: 700;
  color: #3182ce;
  margin-bottom: 0.5rem;
}

.result-box-label {
  color: #718096;
  font-size: 0.875rem;
}

.client-quote {
  font-style: italic;
  color: #4a5568;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: #f7fafc;
  border-left: 4px solid #3182ce;
  border-radius: 0.25rem;
}

.testimonial-author {
  text-align: right;
  color: #718096;
  margin-top: 1rem;
}

/* CTA Section */
.portfolio-cta {
  background-color: #3182ce;
  padding: 5rem 5%;
  text-align: center;
  color: white;
  margin-top: 4rem;
}

.portfolio-cta h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.portfolio-cta p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background-color: white;
  color: #3182ce;
}

.cta-button.primary:hover {
  background-color: #f7fafc;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
}

.cta-button.large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .case-studies-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .detailed-results {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .portfolio-hero-content h1 {
    font-size: 2.5rem;
  }
  
  .tagline {
    font-size: 1.25rem;
  }
  
  .case-studies-grid {
    grid-template-columns: 1fr;
  }
  
  .portfolio-cta h2 {
    font-size: 2rem;
  }
  
  .modal-image {
    height: 300px;
  }
  
  .result-box {
    flex: 1 1 140px;
  }
}

@media (max-width: 480px) {
  .results-container {
    flex-wrap: wrap;
  }
  
  .result-item {
    flex: 1 1 50%;
    margin-bottom: 1rem;
  }
  
  .modal-content {
    margin-top: 1rem;
  }
  
  .modal-image {
    height: 200px;
  }
}
</style>