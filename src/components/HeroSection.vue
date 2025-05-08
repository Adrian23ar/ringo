<template>
    <section id="hero"
        class="relative scroll-mt-20 flex flex-col justify-center items-center min-h-[85vh] md:min-h-[calc(100vh-5rem)] py-0 text-center text-white overflow-hidden">
        <img src="../assets/images/hero.webp" alt="Servicio técnico especializado en electrónica y refrigeración"
            fecthpriority="high" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/50"></div>
        <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg stroke-gray-700" data-v-2821275b>
                Tecnico en Electrónica y Soluciones de Refrigeración
            </h1>
            <p class="text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-95 drop-shadow-lg" data-v-2821275b>
                Especialista en diagnóstico y reparación de tarjetas electrónicas para
                todo tipo de electrodomésticos. También ofrecemos servicio técnico
                integral para equipos de refrigeración, <span class="font-bold">lavadoras, secadoras y todos sus
                    electrodomésticos</span></p>
            <a :href="whatsappLink" target="_blank"
                class="inline-block bg-accent hover:bg-opacity-80 text-white font-bold py-4 px-10 rounded-lg text-xl transition-all shadow-lg transform hover:scale-105 drop-shadow-lg">
                ¡Contáctame por WhatsApp!
            </a>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'

const Tl = "584146591611" // Tu número de teléfono sin el +
const Ol = "Hola, estoy interesado en sus servicios técnicos. Necesito ayuda con..." // Mensaje predeterminado

const whatsappLink = computed(() => {
    return `https://wa.me/${Tl}?text=${encodeURIComponent(Ol)}`
})
</script>

<style scoped data-v-2821275b>
.drop-shadow-lg[data-v-2821275b] {
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4));
    text-shadow: rgb(12, 12, 12) 1px 0px 0px, rgb(12, 12, 12) 0.540302px 0.841471px 0px, rgb(12, 12, 12) -0.416147px 0.909297px 0px, rgb(12, 12, 12) -0.989992px 0.14112px 0px, rgb(12, 12, 12) -0.653644px -0.756802px 0px, rgb(12, 12, 12) 0.283662px -0.958924px 0px, rgb(12, 12, 12) 0.96017px -0.279415px 0px;
}

/* Considera mover estos estilos a tu CSS principal si se repiten o
     si Tailwind puede manejarlos directamente con sus clases de drop-shadow.
     Tailwind ya tiene clases como `drop-shadow-lg` y `drop-shadow-md`.
     He añadido `data-v-2821275b` para mantener la especificidad si Vue lo generó así.
     Si no es necesario, puedes quitar `data-v-2821275b` de las clases y del style tag.
  */
</style>