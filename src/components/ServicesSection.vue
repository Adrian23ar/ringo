<template>
  <section id="servicios" class="py-16 bg-background-alt transition-all scroll-mt-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 md:mb-16">
        <h3 class="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
          Nuestros Servicios Especializados
        </h3>
        <p class="text-lg text-text max-w-3xl mx-auto">
          Reparación avanzada de electrónica y mantenimiento integral para tus equipos de refrigeración y electrodomésticos.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="(service) in services" :key="service.title"
          :class="[
            'rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.01] hover:shadow-xl col-span-1']">
          <div class="relative p-3 text-white min-h-[180px] md:min-h-[200px] flex flex-col justify-end">
            <img :src="service.imageUrl" :alt="service.title" class="absolute inset-0 w-full h-full object-cover"
              loading="lazy" />
            <div :class="['absolute inset-0', service.headerGradientClass]"></div>
            <div class="relative z-10 text-center h-full content-center">
              <h3 class="text-2xl md:text-3xl lg:text-xl xl:text-2xl font-bold mb-1 drop-shadow-lg">{{ service.title }}</h3>
              <p class="text-sm md:text-base xl:text-base opacity-90 drop-shadow-md">{{ service.description }}</p>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow bg-zinc-100 dark:bg-zinc-800">
            <ul v-if="service.serviceItems && service.serviceItems.length"
              class="space-y-2 mb-6 text-sm text-text flex-grow">
              <li v-for="item in service.serviceItems" :key="item" class="flex items-start">
                <CheckIcon class="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
            <div class="mt-auto">
              <a :href="whatsappServiceLink(service.title)" target="_blank" :class="[
                'inline-flex items-center justify-center w-full text-sm text-white font-semibold py-3 px-4 rounded-md shadow-md transition-colors duration-300',
                service.buttonColor
              ]">
                Consultar Servicio
                <ArrowRightIcon class="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { shallowRef } from 'vue';
import { ArrowRightIcon, CheckIcon } from '@heroicons/vue/24/solid';

// Importa tus imágenes
import imgElectronica from '../assets/images/tarjeta.webp';
import imgRefrigerador from '../assets/images/nevera.webp';
import imgAire from '../assets/images/aires.webp';

const services = shallowRef([
  {
    imageUrl: imgElectronica,
    title: 'Electrónica',
    description: 'Soluciones expertas en electrónica para tus electrodomésticos.',
    headerGradientClass: 'bg-emerald-950/55',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
    serviceItems: [
      'Reparación de todo tipo de tarjetas electrónicas.',
      'Servicio técnico para Microondas.',
      'Diagnóstico y reparación de Airfryers.',
      'Mantenimiento de Campanas de extracción.',
      'Instalación de protector General para el hogar.',
      'Reparación de protectores de voltaje.',
      'Servicio técnico para Lavadoras.',
      'Reparación de Secadoras.',
    ],
  },
  {
    imageUrl: imgRefrigerador,
    title: 'Refrigeradores y Neveras',
    description: 'Diagnóstico y reparación de neveras y cavas de enfriamiento.',
    headerGradientClass: 'bg-slate-700/55',
    buttonColor: 'bg-slate-600 hover:bg-slate-800',
    serviceItems: [
      'Diagnóstico y reparación de sistemas de enfriamiento.',
      'Mantenimiento integral de neveras, enfriadores y cavas.',
      'Reparación de tarjetas electrónicas de todos sus equipos.',
    ],
  },
  {
    imageUrl: imgAire,
    title: 'Aires Acondicionados Domesticos E Industriales',
    description: 'Servicio completo para aires acondicionados, asegurando su óptimo funcionamiento.',
    headerGradientClass: 'bg-sky-950/55',
    buttonColor: 'bg-sky-600 hover:bg-sky-700',
    serviceItems: [
      'Diagnóstico de sistemas de aire acondicionados.',
      'Mantenimiento integral de su equipo de aire acondicionado, ventana, split, gabinetes e integral.',
      'Reparación de tarjetas electrónicas Inverter.',
      'Instalacion de equipos de aire acondicionado de todo tipo y capacidad.',
      'Recarga de Gas Refrigerante.',
      'Corrección de fugas.',
      'Instalación de Compresores.',
    ],
  },
]);

const rawPhoneNumber = '584146591611';
const whatsappServiceLink = (serviceTitle) => {
  const message = `Hola, estoy interesado en el servicio de "${serviceTitle}". ¿Podría darme más información?`;
  return `https://wa.me/${rawPhoneNumber}?text=${encodeURIComponent(message)}`;
};

</script>

<style scoped>
/* Puedes añadir drop-shadows más específicos si es necesario,
   pero Tailwind ya los incluye (drop-shadow-lg, drop-shadow-md)
   que puedes aplicar directamente en el template si lo deseas.
*/
.drop-shadow-lg {
  filter: drop-shadow(0 4px 5px rgba(0, 0, 0, 0.5));
}

.drop-shadow-md {
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4));
}
</style>