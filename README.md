# Inversiones Ringo C.A. - Landing Page

Esta es una aplicación web de una sola página (landing page) para "Inversiones Ringo C.A.", un servicio técnico especializado en electrónica y refrigeración ubicado en Ciudad Ojeda. La página está diseñada para presentar los servicios ofrecidos y facilitar el contacto a través de WhatsApp.

## Características Principales

* **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla (móviles, tabletas y computadoras de escritorio).
* **Tema Oscuro/Claro:** Permite a los usuarios cambiar entre un tema visual claro y uno oscuro para una mejor experiencia de visualización.
* **Navegación Intuitiva:**
    * Barra de navegación fija con enlaces a las secciones principales: Inicio, Servicios y Contacto.
    * Menú móvil desplegable para facilitar la navegación en dispositivos pequeños.
* **Secciones Informativas:**
    * **Inicio (Hero Section):** Presentación impactante con imagen de fondo, título descriptivo, breve introducción a los servicios y un botón de contacto directo a WhatsApp.
    * **Servicios:** Detalla las áreas de especialización (Electrónica, Refrigeradores y Neveras, Aires Acondicionados) con:
        * Imágenes representativas para cada categoría de servicio.
        * Descripciones claras de los servicios ofrecidos.
        * Listas específicas de trabajos realizados dentro de cada categoría.
        * Botones de "Consultar Servicio" que redirigen a WhatsApp con un mensaje predefinido según el servicio de interés.
    * **Marcas:** Muestra los logotipos de diversas marcas con las que trabaja la empresa, generando confianza y demostrando experiencia.
    * **Contacto:** Facilita el contacto directo a través de un número de WhatsApp visible y un botón para iniciar una conversación. Incluye información sobre la ubicación del servicio (Ciudad Ojeda).
* **Pie de Página:** Muestra información de copyright y detalles de la empresa.

## Tecnologías Utilizadas

* **Framework Frontend:** Vue 3
* **Herramienta de Compilación (Build Tool):** Vite
* **Estilos CSS:** Tailwind CSS
* **Iconos:** Heroicons

## Estructura del Proyecto (Simplificada)

```
ringo-ca/
├── dist/                     # Archivos compilados para producción
├── public/                   # Recursos estáticos (ej. icono)
├── src/
│   ├── assets/               # Imágenes, fuentes, etc.
│   │   └── images/
│   │       ├── brands/       # Logos de marcas
│   │       └── hero.webp     # Imagen principal
│   ├── components/           # Componentes de Vue (Navbar, HeroSection, ServicesSection, etc.)
│   ├── App.vue               # Componente raíz de la aplicación
│   ├── main.js               # Punto de entrada de la aplicación Vue
│   └── main.css              # Estilos CSS principales (incluyendo Tailwind)
├── index.html                # Plantilla HTML principal
├── package.json              # Dependencias y scripts del proyecto
├── tailwind.config.js        # Configuración de Tailwind CSS
├── vite.config.js            # Configuración de Vite
└── README.md                 # Este archivo
```

## Configuración y Uso

### Prerrequisitos

* Node.js y npm (o yarn) instalados.

### Instalación

1.  Clona el repositorio (si aplica).
2.  Navega al directorio del proyecto: `cd ringo-ca`
3.  Instala las dependencias: `npm install` (o `yarn install`)

### Ejecutar la Aplicación

* **Modo Desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará un servidor de desarrollo local (generalmente en `http://localhost:5173`).

* **Construir para Producción:**
    ```bash
    npm run build
    ```
    Esto generará los archivos estáticos optimizados en la carpeta `dist/`.

* **Previsualizar la Construcción de Producción:**
    ```bash
    npm run preview
    ```
    Esto permite probar la versión de producción localmente antes de desplegarla.