<template>
    <section id="contacto"
        class="py-20 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl lg:text-5xl font-bold mb-6">
                        ¿Urgencia? Contáctanos <br> <span class="text-primary">Ahora Mismo</span>
                    </h2>
                    <p class="text-xl text-slate-600 dark:text-slate-300">No esperes más. Contáctanos y recibe atención prioritaria para resolver tu problema.</p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12">
                    <!-- Contact Info -->
                    <div class="space-y-8 flex flex-col justify-center place-self-center md:place-self-auto">
                        <div class="flex items-center space-x-4">
                            <div class="bg-gradient-to-r from-primary-500 to-primary-700 p-3 rounded-xl">
                                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <div class="text-sm text-text-muted font-semibold">WhatsApp / Teléfono</div>
                                <div class="text-2xl font-bold text-primary-500">+58 (414) 659-1611</div>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4">
                            <div class="bg-gradient-to-r from-primary-500 to-primary-700 p-3 rounded-xl">
                                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <div class="text-sm text-text-muted font-semibold">Ubicación</div>
                                <div class="text-xl font-semibold text-text">Ciudad Ojeda,
                                    Venezuela</div>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4">
                            <div class="bg-gradient-to-r from-primary-500 to-primary-700 p-3 rounded-xl">
                                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <div class="text-sm text-text-muted font-semibold">Horario de Atención</div>
                                <div class="text-xl font-semibold text-text">24/7 Disponible</div>
                            </div>
                        </div>
                    </div>

                    <!-- CTA -->
                    <div
                        class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-300 dark:border-slate-700 transition-colors duration-300">
                        <h5 class="text-2xl font-bold mb-4 text-text">Diagnóstico Gratuito</h5>
                        <p class="text-slate-600 dark:text-slate-300 mb-6">
                            Describe tu problema y te daremos una evaluación inicial sin costo
                        </p>
                        <a :href="whatsappLink"
                            class="w-full bg-gradient-to-r from-primary-500 to-primary-700 hover:from-accent-500 hover:to-accent-700 text-white text-sm md:text-lg py-3 md:py-4 flex items-center justify-center space-x-2 rounded-lg transition-all duration-300">
                            Enviar Mensaje por WhatsApp
                        </a>
                        <p class="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">Atención Rápida Garantizada</p>
                    </div>
                </div>
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

<style scoped></style>