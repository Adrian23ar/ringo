<template>
    <section id="marcas" class="py-16 bg-secondary/5 dark:bg-secondary/10 transition-all">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 md:mb-16">
                <h4 class="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
                    Trabajamos con Diversas Marcas
                </h4>
                <p class="text-lg text-text max-w-2xl mx-auto">
                    Nuestra experiencia abarca una amplia gama de marcas líderes, asegurando un servicio de calidad para tu equipo.
                </p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8 items-center">
                <div v-for="brand in brands" :key="brand.name"
                    class="p-4 bg-white dark:bg-slate-200 rounded-lg shadow-md hover:shadow-xl dark:hover:bg-slate-100 transition-all duration-300 flex justify-center items-center aspect-video transform hover:scale-105"
                    :title="brand.name">
                    <img :src="brand.logoUrl" :alt="brand.name"
                        class="max-h-16 min-h-16 md:min-h-20 md:max-h-20 object-contain" loading="lazy" />
                </div>
            </div>

            <p class="text-center font-semibold text-text-muted mt-12 text-md">
                ¿No ves tu marca aquí? ¡No te preocupes! Podemos ayudarte con prácticamente cualquier marca.
            </p>
        </div>
    </section>
</template>

<script setup>
import { shallowRef } from 'vue';

const brandsData = [
    // Reemplaza con los nombres y archivos reales de tus logos
    // El 'name' es para el 'alt' text y el 'title' del div.
    // El 'fileName' es el nombre del archivo en 'src/assets/images/brands/'.
    { name: 'Samsung', fileName: 'samsung.webp' },
    { name: 'LG', fileName: 'lg.webp' },
    { name: 'Whirlpool', fileName: 'whirlpool.webp' },
    { name: 'Mabe', fileName: 'mabe.webp' },
    { name: 'Frigidaire', fileName: 'Frigidaire.webp' },
    { name: 'Frigilux', fileName: 'Frigilux.webp' },
    { name: 'Electrolux', fileName: 'electrolux.webp' },
    { name: 'Daewoo', fileName: 'daewoo.webp' },
    { name: 'General Electric', fileName: 'generalelectric.webp' },
    { name: 'Carrier', fileName: 'carrier.webp' },
    { name: 'TCL', fileName: 'tcl.webp' },
    { name: 'kenmore', fileName: 'kenmore.webp' },
    // Añade más marcas aquí según sea necesario
];

const brands = shallowRef(
    brandsData.map(brand => {
        // Para que Vite procese correctamente las imágenes en `src/assets` y las incluya en el build,
        // necesitamos usar `new URL` con `import.meta.url`.
        try {
            return {
                ...brand,
                logoUrl: new URL(`../assets/images/brands/${brand.fileName}`, import.meta.url).href
            };
        } catch (e) {
            console.warn(`Logo no encontrado para ${brand.fileName}, usando placeholder o ruta directa.`);
            // Fallback si la imagen no se encuentra o hay error, puedes poner una ruta a un logo genérico
            // o dejar la ruta tal cual si están en `public` (pero para `src/assets` es mejor `new URL`)
            return {
                ...brand,
                logoUrl: `/assets/images/brands/${brand.fileName}` // Ruta como si estuviera en public
            };
        }
    })
);

</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>