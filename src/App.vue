<template>
  <div class="app-container">
    <!-- Header with Logo and Navigation -->
    <header class="header">
      <div class="logo-container">
        <router-link to="/" class="logo">
          <span class="logo-text">Trilogoweb</span>
        </router-link>
      </div>
      
      <nav class="nav">
        <div class="nav-links">
          <router-link to="/" class="nav-link" exact>Home</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </div>
        
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
        </div>
      </nav>
      
      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
        <router-link to="/" class="mobile-link" @click="closeMobileMenu">Home</router-link>
        <router-link to="/about" class="mobile-link" @click="closeMobileMenu">About</router-link>
        <router-link to="/portfolio" class="mobile-link" @click="closeMobileMenu">Portfolio</router-link>
        <router-link to="/contact" class="mobile-link" @click="closeMobileMenu">Contact</router-link>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer
  },
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    }
  },
  watch: {
    '$route'() {
      this.isMobileMenuOpen = false;
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  background: #fff;
}

a {
  text-decoration: none;
  color: inherit;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-weight: 700;
  font-size: 1.5rem;
  color: #1a202c;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  position: relative;
  font-weight: 500;
  color: #4a5568;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link:hover, .nav-link.router-link-exact-active {
  color: #2d3748;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  background-color: #3182ce;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.hamburger-line {
  height: 3px;
  width: 100%;
  background-color: #2d3748;
  border-radius: 3px;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 90;
}

.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
}

.mobile-link {
  padding: 1rem;
  font-weight: 500;
  color: #2d3748;
  border-bottom: 1px solid #edf2f7;
}

.mobile-link:last-child {
  border-bottom: none;
}

/* Main Content */
.main-content {
  flex: 1;
}

/* Page Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Footer styles are now in the Footer component */

/* Responsive Styles */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .mobile-menu {
    display: flex;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>