<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { loadSlim } from '@tsparticles/slim';
import { PhoneIcon } from '@heroicons/vue/24/solid';

// Tu lógica existente de WhatsApp
const Tl = "584146591611";
const Ol = "Hola, estoy interesado en sus servicios técnicos. Necesito ayuda con...";
const whatsappLink = computed(() => {
    return `https://wa.me/${Tl}?text=${encodeURIComponent(Ol)}`;
});

// --- Lógica para detectar el modo oscuro ---
const isDarkMode = ref(false);

onMounted(() => {
    const updateDarkModeStatus = () => {
        isDarkMode.value = document.documentElement.classList.contains('dark');
        // console.log('Dark mode status updated:', isDarkMode.value); // Para depuración
    };

    // Establecer estado inicial
    updateDarkModeStatus();

    // Observar cambios en la clase del elemento <html>
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                updateDarkModeStatus();
            }
        }
    });
    observer.observe(document.documentElement, { attributes: true });

    onUnmounted(() => {
        observer.disconnect();
    });
});
// --- Fin de la lógica para detectar el modo oscuro ---

// Funciones de partículas que ya tienes
const particlesInit = async engine => {
    // console.log('Inicializando motor de partículas con @tsparticles/slim');
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    // console.log("Contenedor de partículas cargado", container);
};

// --- Opciones de partículas reactivas y dinámicas ---
const particlesOptions = computed(() => {
    // Opciones base/comunes que no cambian significativamente entre modos
    const commonInteractivity = {
        events: {
            onHover: { enable: false, mode: 'grab' },
            onClick: { enable: false, mode: 'push' },
            resize: true
        },
        modes: {
            grab: { distance: 150, line_linked: { opacity: 0.7 } },
            push: { quantity: 2 },
            repulse: { distance: 100 }
        }
    };

    const commonParticlesBase = {
        collisions: { enable: false },
        move: {
            direction: 'none',
            enable: true,
            outModes: { default: 'out' },
            random: true,
            speed: 0.5,
            straight: false
        },
        number: {
            density: { enable: true, area: 1200 },
            value: 100 // Tu valor actual
        },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } }
    };

    if (isDarkMode.value) {
        // --- Opciones para MODO OSCURO ---
        // console.log('Generando opciones para MODO OSCURO');
        return {
            background: {
                color: { value: '#061428' } // Tu --background-alt en dark mode
            },
            fpsLimit: 60,
            fullScreen: { enable: false },
            interactivity: commonInteractivity,
            particles: {
                ...commonParticlesBase,
                color: { value: '#4da6ff' },
                links: {
                    color: '#4da6ff', // Color de enlaces basado en el color de las partículas
                    distance: 150,
                    enable: true,
                    opacity: 0.15, // Opacidad más baja para que no sean tan brillantes
                    width: 1       // Ancho de línea más delgado si se prefiere
                },
                opacity: { value: { min: 0.2, max: 0.6 } } // Opacidad de partículas ajustada
            },
            detectRetina: true
        };
    } else {
        // --- Opciones para MODO CLARO (basadas en tu configuración actual) ---
        // console.log('Generando opciones para MODO CLARO');
        return {
            background: {
                color: { value: '#e9ecef' } // Tu fondo actual
            },
            fpsLimit: 60,
            fullScreen: { enable: false },
            interactivity: commonInteractivity,
            particles: {
                ...commonParticlesBase,
                color: { value: '#061428' }, // Tu color de partícula actual
                links: {
                    // Tu config: color: 'rgba(173, 216, 230, 0.4)', opacity: 0.3, width: 2
                    // La opacidad en rgba (0.4) se multiplica por links.opacity (0.3) = 0.12 efectivo.
                    // Para claridad, definimos el color base y la opacidad por separado:
                    color: 'rgb(173, 216, 230)', // Color base celeste
                    distance: 150,
                    enable: true,
                    opacity: 0.3, // Opacidad final deseada para los enlaces
                    width: 2
                },
                opacity: { value: { min: 0.4, max: 0.9 } } // Tu opacidad de partícula actual
            },
            detectRetina: true
        };
    }
});
// --- Fin de opciones de partículas ---

</script>

<template>
    <section id="hero" class="min-h-[85vh] md:min-h-[calc(100vh-5rem)] flex relative overflow-hidden">
        <vue-particles :key="isDarkMode ? 'particles-dark' : 'particles-light'" id="tsparticles"
            class="absolute top-0 left-0 w-full h-full z-0" :options="particlesOptions" :particlesInit="particlesInit"
            :particlesLoaded="particlesLoaded" />

        <div class="mx-auto pr-12 pl-10 py-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div class="space-y-8">
                <div class="space-y-4">
                    <h1 class="text-5xl lg:text-7xl font-bold leading-tight">
                        <span class="text-text">Reparamos</span>
                        <br />
                        <span class="bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
                            Todo Tipo
                        </span>
                        <br />
                        <span class="text-text">de Equipos</span>
                    </h1>
                    <p class="text-xl text-text leading-relaxed max-w-lg">
                        Expertos en <span class="font-bold">electrónica</span> y refrigeración en Ciudad Ojeda. Soluciones rápidas y garantizadas para
                        tus electrodomésticos y aires acondicionados.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a :href="whatsappLink" target="_blank"
                        class="bg-primary hover:bg-primary-700 text-white text-lg px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                        <span>Solicitar Diagnóstico</span>
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </a>
                    <a href="#servicios"
                        class="border border-accent-700 dark:border-accent-500 text-text hover:bg-accent-700 hover:text-slate-100 text-lg px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                        Ver Servicios
                    </a>
                </div>
            </div>

            <div class="relative">
                <div
                    class="relative bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-2 border border-slate-300 dark:border-slate-600 transition-colors duration-300">
                    <img src="../assets/images/hero.webp" alt="Reparación de equipos electrónicos"
                        class="rounded-2xl w-full h-80 lg:h-[30rem] object-cover" />
                    <div
                        class="absolute -top-4 -right-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-4">
                        <svg class="h-5 w-5 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0" bis_skin_checked="1"><svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 120" class="w-full h-auto">
                <path fill="currentColor" fill-opacity="1" class="text-white dark:text-background"
                    d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                    style="
"></path>
            </svg></div>
    </section>
    <section class="bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-800 dark:to-blue-900 py-4 shadow-md">
        <div class="container mx-auto flex justify-center md:justify-between items-center flex-wrap gap-4"
            bis_skin_checked="1">
            <div class="flex items-center gap-2 text-white" bis_skin_checked="1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-clock h-5 w-5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span class="text-sm font-medium">Servicio disponible 24/7</span>
            </div>
            <a :href="whatsappLink" target="_blank"
                class="bg-primary hover:bg-primary-700 text-white text-sm px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold">
                <span>Contáctanos por Whatsapp!</span>
                <svg class="w-4 h-4" fill="#ffffff" viewBox="-1.66 0 740.824 740.824"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M630.056 107.658C560.727 38.271 468.525.039 370.294 0 167.891 0 3.16 164.668 3.079 367.072c-.027 64.699 16.883 127.855 49.016 183.523L0 740.824l194.666-51.047c53.634 29.244 114.022 44.656 175.481 44.682h.151c202.382 0 367.128-164.689 367.21-367.094.039-98.088-38.121-190.32-107.452-259.707m-259.758 564.8h-.125c-54.766-.021-108.483-14.729-155.343-42.529l-11.146-6.613-115.516 30.293 30.834-112.592-7.258-11.543c-30.552-48.58-46.689-104.729-46.665-162.379C65.146 198.865 202.065 62 370.419 62c81.521.031 158.154 31.81 215.779 89.482s89.342 134.332 89.311 215.859c-.07 168.242-136.987 305.117-305.211 305.117m167.415-228.514c-9.176-4.591-54.286-26.782-62.697-29.843-8.41-3.061-14.526-4.591-20.644 4.592-6.116 9.182-23.7 29.843-29.054 35.964-5.351 6.122-10.703 6.888-19.879 2.296-9.175-4.591-38.739-14.276-73.786-45.526-27.275-24.32-45.691-54.36-51.043-63.542-5.352-9.183-.569-14.148 4.024-18.72 4.127-4.11 9.175-10.713 13.763-16.07 4.587-5.356 6.116-9.182 9.174-15.303 3.059-6.122 1.53-11.479-.764-16.07-2.294-4.591-20.643-49.739-28.29-68.104-7.447-17.886-15.012-15.466-20.644-15.746-5.346-.266-11.469-.323-17.585-.323-6.117 0-16.057 2.296-24.468 11.478-8.41 9.183-32.112 31.374-32.112 76.521s32.877 88.763 37.465 94.885c4.587 6.122 64.699 98.771 156.741 138.502 21.891 9.45 38.982 15.093 52.307 19.323 21.981 6.979 41.983 5.994 57.793 3.633 17.628-2.633 54.285-22.19 61.932-43.616 7.646-21.426 7.646-39.791 5.352-43.617-2.293-3.826-8.41-6.122-17.585-10.714" />
                </svg>
            </a>
        </div>
    </section>

</template>

<style scoped>
/* Tus estilos scoped existentes */
.drop-shadow-lg {
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4));
    text-shadow: rgb(12, 12, 12) 1px 0px 0px, rgb(12, 12, 12) 0.540302px 0.841471px 0px, rgb(12, 12, 12) -0.416147px 0.909297px 0px, rgb(12, 12, 12) -0.989992px 0.14112px 0px, rgb(12, 12, 12) -0.653644px -0.756802px 0px, rgb(12, 12, 12) 0.283662px -0.958924px 0px, rgb(12, 12, 12) 0.96017px -0.279415px 0px;
}
</style>