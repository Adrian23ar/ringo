<template>

    <footer
        class="bg-background border-t border-secondary border-opacity-20 dark:border-opacity-30 py-4 transition-all">
        <div class="container mx-auto px-4 py-10 md:py-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div class="">
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

                    <p class="text-slate-800 dark:text-slate-400 mt-2">
                        Tu Solución <span class="font-semibold">Experta</span> en Electrodomésticos.
                    </p>
                </div>

                <div>
                    <p class="font-bold text-slate-800 dark:text-slate-200 mb-4">Servicios</p>
                    <ul class="space-y-2">
                        <li>
                            <span
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100 cursor-default">
                                Reparación de Tarjetas Electrónicas
                            </span>
                        </li>
                        <li>
                            <span
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100 cursor-default">
                                Refrigeración y Neveras
                            </span>
                        </li>
                        <li>
                            <span
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100 cursor-default">
                                Aires Acondicionados
                            </span>
                        </li>
                        <li>
                            <span
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100 cursor-default">
                                Lavadoras y Secadoras
                            </span>
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="font-bold text-slate-800 dark:text-slate-200 mb-4">Enlaces Rápidos</p>
                    <ul class="space-y-2">
                        <li>
                            <a href="#hero"
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100">
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="#DiagnosticTool"
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100">
                                Diagnóstico Interactivo
                            </a>
                        </li>
                        <li>
                            <a href="#servicios"
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100">
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a href="#marcas"
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100">
                                Marcas
                            </a>
                        </li>
                        <li>
                            <a href="#contacto"
                                class="text-text text-left hover:text-primary-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-100">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="lg:col-span-3 xl:col-span-1">
                    <p class="font-bold text-slate-800 dark:text-slate-200 mb-4">Contacto</p>
                    <ul
                        class="space-y-3 lg:space-y-0 xl:space-y-3 lg:flex xl:flex-col lg:items-center lg:justify-between xl:items-start">
                        <li class="flex items-start gap-3">
                            <MapPinIcon class="h-5 w-5 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span class="text-slate-800 dark:text-slate-200">Ciudad Ojeda, Zulia, Venezuela</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <PhoneIcon class="h-5 w-5 text-cyan-500 dark:text-cyan-400 shrink-0" />
                            <span class="text-slate-800 dark:text-slate-200">+58 (414) 659-1611</span>
                        </li>
                        <!-- <li class="flex items-center gap-3">
                            <EnvelopeIcon class="h-5 w-5 text-cyan-500 dark:text-cyan-400 shrink-0" />
                            <span class="text-slate-800 dark:text-slate-200">contacto@rinconelectronico.com</span>
                        </li> -->
                    </ul>
                </div>
            </div>

            <div class="border-t border-secondary mt-12 pt-6 text-center text-text">
                <p>&copy; {{ currentYear }} Rincón Electrónico. Todos los derechos reservados. Inversiones Ringo C.A.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
const currentYear = computed(() => new Date().getFullYear());
</script>