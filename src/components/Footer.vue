<template>
    <footer
        class="bg-background border-t border-secondary border-opacity-20 dark:border-opacity-30 py-4 transition-all">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="mb-2">
                <p class="text-text text-sm">
                    <span class="text-xs opacity-80">Inversiones Ringo C.A.</span>
                </p>
                <p class="text-text text-xs opacity-75 mt-1">
                    Servicio técnico especializado en Ciudad Ojeda
                </p>
            </div>
            <p class="text-text text-xs opacity-75">
                &copy; {{ currentYear }} Rincón Electrónico. Todos los derechos reservados.
            </p>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';
const currentYear = computed(() => new Date().getFullYear());
</script>