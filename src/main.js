// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css'; // Importa tu archivo CSS aquí

// 1. Importa el plugin de partículas y el cargador del motor
import ParticlesPlugin from '@tsparticles/vue3';
import { loadSlim } from '@tsparticles/slim'; // O loadFull si prefieres el motor completo

const app = createApp(App);

// 2. Registra el plugin Particles con Vue, pasándole la función de inicialización del motor
app.use(ParticlesPlugin, {
  init: async engine => {
    // console.log('Inicializando motor de partículas globalmente vía plugin');
    await loadSlim(engine);
    // Si quisieras usar el motor completo (requiere instalar "tsparticles" o "@tsparticles/engine"):
    // import { loadFull } from "tsparticles";
    // await loadFull(engine);
  },
});

app.mount('#app');