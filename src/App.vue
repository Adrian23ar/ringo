<template>
  <div id="app-container" class="flex flex-col min-h-screen bg-background transition-all">
    <Navbar />
    <main class="flex-grow">
      <HeroSection />
      <ServicesSection />
      <BrandsSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import ServicesSection from './components/ServicesSection.vue';
import BrandsSection from './components/BrandsSection.vue';
import ContactSection from './components/ContactSection.vue';
import Footer from './components/Footer.vue'; // Importar
</script>

<style>
html {
  scroll-behavior: smooth;
}

/* Asegurarse de que el contenedor principal también tenga el fondo para transiciones suaves */
/* Esto ya debería estar cubierto por el body en main.css, pero por si acaso */
/* #app-container {
  @apply bg-background text-text;
} */
</style>