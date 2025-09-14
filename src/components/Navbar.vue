<template>
    <nav class="bg-background shadow-md sticky top-0 z-50 transition-all">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex items-center">
                    <a href="#hero" @click="closeMobileMenu" class="flex items-center">
                        <img class="h-14 md:h-16 w-auto block dark:hidden" src="../assets/images/Logo-dark-320w.webp"
                            srcset="../assets/images/Logo-dark-320w.webp 320w,
             ../assets/images/Logo-dark-480w.webp 480w,
             ../assets/images/Logo-dark-640w.webp 640w,
             ../assets/images/Logo-dark-768w.webp 768w,
             ../assets/images/Logo-dark-912w.webp 912w" sizes="(max-width: 600px) 320px,
            (max-width: 900px) 480px,
            912px" alt="Rincón Electrónico Logo">

                        <img class="h-14 md:h-16 w-auto hidden dark:block" src="../assets/images/Logo-White-320w.webp"
                            srcset="../assets/images/Logo-White-320w.webp 320w,
             ../assets/images/Logo-White-480w.webp 480w,
             ../assets/images/Logo-White-640w.webp 640w,
             ../assets/images/Logo-White-768w.webp 768w,
             ../assets/images/Logo-White-912w.webp 912w" sizes="(max-width: 600px) 320px,
            (max-width: 900px) 480px,
            912px" alt="Rincón Electrónico Logo en modo oscuro">
                    </a>
                </div>

                <div class="hidden md:flex items-center space-x-4">
                    <a href="#hero" @click="closeMobileMenu"
                        class="text-text hover:text-primary px-3 py-2 rounded-md font-semibold transition-all">Inicio</a>
                    <a href="#servicios" @click="closeMobileMenu"
                        class="text-text hover:text-primary px-3 py-2 rounded-md font-semibold transition-all">Servicios</a>
                    <a href="#contacto" @click="closeMobileMenu"
                        class="text-text hover:text-primary px-3 py-2 rounded-md font-semibold transition-all">Contacto</a>
                    <DarkModeSwitcher />

                    <a :href="whatsappLink" target="_blank"
                        class="bg-primary hover:bg-primary-700 text-white text-sm px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-bold">
                        <span>Whatsapp</span>
                        <PhoneIcon class="h-4 w-4 text-white" aria-hidden="true" />
                    </a>
                </div>

                <div class="flex md:hidden items-center">
                    <DarkModeSwitcher />
                    <button @click="mobileMenuOpen = !mobileMenuOpen" type="button"
                        class="ml-2 bg-primary inline-flex items-center justify-center p-2 rounded-md text-background hover:text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
                        aria-controls="mobile-menu" :aria-expanded="mobileMenuOpen.toString()">
                        <span class="sr-only">Abrir menú principal</span>
                        <svg v-if="!mobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div v-show="mobileMenuOpen" class="md:hidden border-t border-secondary" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#hero" @click="closeMobileMenu"
                    class="text-text hover:bg-secondary hover:text-text block px-3 py-2 rounded-md text-base font-semibold transition-all">Inicio</a>
                <a href="#servicios" @click="closeMobileMenu"
                    class="text-text hover:bg-secondary hover:text-text block px-3 py-2 rounded-md text-base font-semibold transition-all">Servicios</a>
                <a href="#contacto" @click="closeMobileMenu"
                    class="text-text hover:bg-secondary hover:text-text block px-3 py-2 rounded-md text-base font-semibold transition-all">Contacto</a>
            </div>
        </div>
    </nav>
</template>



<script setup>
import { ref, computed } from 'vue';
import DarkModeSwitcher from './DarkModeSwitcher.vue';
import { PhoneIcon } from '@heroicons/vue/24/solid';

const Tl = "584146591611" // Tu número de teléfono sin el +
const Ol = "Hola, estoy interesado en sus servicios técnicos. Necesito ayuda con..." // Mensaje predeterminado

const whatsappLink = computed(() => {
    return `https://wa.me/${Tl}?text=${encodeURIComponent(Ol)}`
})
const mobileMenuOpen = ref(false);

const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
};
</script>