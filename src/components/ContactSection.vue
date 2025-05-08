<template>
    <section id="contacto"
        class="py-16 md:py-24 bg-secondary bg-opacity-10 dark:bg-opacity-20 transition-all scroll-mt-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="max-w-2xl mx-auto">
                <h2 class="text-3xl sm:text-4xl font-extrabold text-primary mb-6">
                    ¿Listo para Solucionar tus Problemas?
                </h2>
                <p class="text-lg text-text mb-10">
                    No esperes más. Contáctame directamente por WhatsApp para una atención rápida y eficiente.
                    Estoy aquí para ayudarte con tus equipos de electrónica y refrigeración.
                </p>

                <div class="mb-8">
                    <p class="text-text text-xl font-semibold">Teléfono / WhatsApp:</p>
                    <a :href="whatsappLink" target="_blank"
                        class="phone text-accent text-2xl md:text-3xl font-bold">
                        {{ formattedPhoneNumber }}
                    </a>
                </div>

                <a :href="whatsappLink" target="_blank"
                    class="inline-flex items-center justify-center bg-accent transition-all hover:bg-opacity-80 text-white font-bold py-4 px-10 rounded-lg text-xl shadow-lg transform hover:scale-105">
                    <ChatBubbleLeftEllipsisIcon class="h-6 w-6 mr-3" aria-hidden="true" />
                    Enviar Mensaje por WhatsApp
                </a>
                <p class="text-text text-sm mt-6">
                    Atención en <span class="font-semibold">Ciudad Ojeda.</span> ¡Consulta sin compromiso!
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/solid';

const rawPhoneNumber = '584146591611'; // Sin el '+' para el enlace wa.me
const defaultMessage = 'Hola, estoy interesado en sus servicios técnicos. Necesito ayuda con...';

const formattedPhoneNumber = computed(() => {
    // El número base es 4146591611 (después del código de país)
    const countryCode = rawPhoneNumber.substring(0, 2); // "58"
    const localNumber = rawPhoneNumber.substring(2); // "4146591611"

    if (localNumber.length === 10) {
        // Asumimos un formato como (414) 659-1611
        const areaCode = localNumber.substring(0, 3); // "414"
        const firstPart = localNumber.substring(3, 6); // "659"
        const secondPart = localNumber.substring(6);   // "1611"
        return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
    }
    // Fallback si el número no tiene el largo esperado después del código de país
    return `+${rawPhoneNumber}`;
});

const whatsappLink = computed(() => {
    return `https://wa.me/${rawPhoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
});
</script>

<style scoped>

</style>