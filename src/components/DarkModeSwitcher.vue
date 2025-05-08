<template>
    <button @click="toggleDarkMode"
        class="p-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        :aria-label="isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'">
        <SunIcon v-if="isDarkMode" class="h-6 w-6 text-accent" aria-hidden="true" />
        <MoonIcon v-else class="h-6 w-6 text-accent" aria-hidden="true" />
    </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'; // O /24/solid

const isDarkMode = ref(false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    updateTheme();
};

const updateTheme = () => {
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode.value = true;
    } else if (savedTheme === 'light') {
        isDarkMode.value = false;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkMode.value = true;
    }

    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
</script>