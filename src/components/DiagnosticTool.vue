<template>
  <section id="DiagnosticTool" class="py-16 md:py-24 bg-background scroll-mt-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-2xl mx-auto">
        <p class="text-xs inline-block font-bold bg-accent text-white py-1 px-4 rounded-full mb-2">
          Nuevo
        </p>
        <h2 class="text-3xl sm:text-4xl font-bold text-text mb-5">
          Diagnóstico Interactivo
        </h2>
        <p class="text-base md:text-lg text-text mb-10">
          Identifique rápidamente qué problema tiene su electrodoméstico con nuestra herramienta interactiva.
        </p>

        <div class="max-w-2xl mx-auto bg-background-alt shadow-xl rounded-lg border border-secondary-700/30 text-left">
          <div class="p-6 border-b border-secondary-700 dark:border-secondary-300">
            <h2 class="text-xl font-semibold text-text">Diagnóstico Interactivo</h2>
            <p class="text-sm text-text-muted mt-1">
              Conteste unas pocas preguntas para conocer qué podría estar fallando en su equipo.
            </p>
          </div>

          <div class="p-6">
            <div v-if="step === 1" class="space-y-4">
              <div>
                <label for="device-type-trigger" class="block text-sm font-medium text-text mb-1">
                  ¿Qué tipo de electrodoméstico tiene problemas?
                </label>
                <div class="relative" v-click-outside="closeDeviceSelect">
                  <button type="button" id="device-type-trigger" @click="toggleDeviceSelect"
                    class="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    :class="[
                      isDark ? 'dark:bg-background-alt dark:border-secondary-500 dark:text-text' : 'border-secondary-700 text-text',
                      { 'ring-2 ring-primary ring-offset-2': isDeviceSelectOpen }
                    ]" aria-haspopup="listbox" :aria-expanded="isDeviceSelectOpen">
                    <span :class="{ 'text-text-muted': !deviceType }">
                      {{ selectedDeviceLabel }}
                    </span>
                    <ChevronDownIcon class="h-4 w-4 opacity-50"
                      :class="{ 'transform rotate-180': isDeviceSelectOpen }" />
                  </button>
                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <div v-if="isDeviceSelectOpen"
                      class="absolute z-50 mt-1 min-w-[calc(100%)] max-h-60 w-full overflow-auto rounded-md border shadow-md"
                      :class="isDark ? 'dark:bg-background-alt dark:border-secondary-500 text-text' : 'bg-background border-secondary-700 text-text'"
                      role="listbox">
                      <div v-for="option in deviceOptions.filter(opt => !opt.disabled)" :key="option.value"
                        @click="selectDevice(option.value)"
                        class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-blue-100 dark:hover:bg-blue-950 data-[highlighted]:bg-accent data-[highlighted]:text-accent-300 transition-all duration-100"
                        :class="[
                          deviceType === option.value ? (isDark ? 'bg-accent-700 text-accent-300' : 'bg-blue-200 text-primary-700') : '',
                          isDark ? 'hover:text-accent-300' : 'hover:text-accent-700'
                        ]" role="option" :aria-selected="deviceType === option.value" tabindex="-1">
                        <span v-if="deviceType === option.value"
                          class="absolute left-2 flex h-5 w-5 items-center justify-center">
                          <CheckIcon class="h-4 w-4" :class="isDark ? 'text-accent-300' : 'text-accent-700'" />
                        </span>
                        {{ option.label }}
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>

            <div v-if="step === 2" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text mb-2">¿Cuál es el principal síntoma?</label>
                <div class="space-y-2">
                  <template v-if="deviceType === 'refrigerator'">
                    <div v-for="symptomOption in refrigeratorSymptoms" :key="symptomOption.value"
                      class="flex items-center">
                      <input :id="symptomOption.value" v-model="symptom" :value="symptomOption.value" type="radio"
                        name="symptom"
                        class="w-4 h-4 text-primary border-secondary-700 dark:border-[var(--secondary-300)] focus:ring-primary dark:bg-background-alt accent-primary">
                      <label :for="symptomOption.value" class="ml-2 text-sm text-text">{{ symptomOption.label }}</label>
                    </div>
                  </template>
                  <template v-if="deviceType === 'washing-machine'">
                    <div v-for="symptomOption in washingMachineSymptoms" :key="symptomOption.value"
                      class="flex items-center">
                      <input :id="symptomOption.value" v-model="symptom" :value="symptomOption.value" type="radio"
                        name="symptom"
                        class="h-4 w-4 text-primary border-secondary-700 dark:border-[var(--secondary-300)] focus:ring-primary dark:bg-background-alt accent-primary">
                      <label :for="symptomOption.value" class="ml-2 text-sm text-text">{{ symptomOption.label }}</label>
                    </div>
                  </template>
                  <template v-if="deviceType === 'ac'">
                    <div v-for="symptomOption in acSymptoms" :key="symptomOption.value" class="flex items-center">
                      <input :id="symptomOption.value" v-model="symptom" :value="symptomOption.value" type="radio"
                        name="symptom"
                        class="h-4 w-4 text-primary border-secondary-700 dark:border-[var(--secondary-300)] focus:ring-primary dark:bg-background-alt accent-primary">
                      <label :for="symptomOption.value" class="ml-2 text-sm text-text">{{ symptomOption.label }}</label>
                    </div>
                  </template>
                  <template v-if="deviceType === 'dryer'">
                    <div v-for="symptomOption in dryerSymptoms" :key="symptomOption.value" class="flex items-center">
                      <input :id="symptomOption.value" v-model="symptom" :value="symptomOption.value" type="radio"
                        name="symptom"
                        class="h-4 w-4 text-primary border-secondary-700 dark:border-[var(--secondary-300)] focus:ring-primary dark:bg-background-alt accent-primary">
                      <label :for="symptomOption.value" class="ml-2 text-sm text-text">{{ symptomOption.label }}</label>
                    </div>
                  </template>
                  <template v-if="deviceType === 'microwave'">
                    <div v-for="symptomOption in microwaveSymptoms" :key="symptomOption.value"
                      class="flex items-center">
                      <input :id="symptomOption.value" v-model="symptom" :value="symptomOption.value" type="radio"
                        name="symptom"
                        class="h-4 w-4 text-primary border-secondary-700 dark:border-[var(--secondary-300)] focus:ring-primary dark:bg-background-alt accent-primary">
                      <label :for="symptomOption.value" class="ml-2 text-sm text-text">{{ symptomOption.label }}</label>
                    </div>
                  </template>
                  <template v-if="deviceType === 'airfryer'">
                    <div v-for="symptomOption in airfryerSymptoms" :key="symptomOption.value" class="flex items-center">
                      <input :id="symptomOption.value" v-model="symptom" :value="symptomOption.value" type="radio"
                        name="symptom"
                        class="h-4 w-4 text-primary border-secondary-700 dark:border-[var(--secondary-300)] focus:ring-primary dark:bg-background-alt accent-primary">
                      <label :for="symptomOption.value" class="ml-2 text-sm text-text">{{ symptomOption.label }}</label>
                    </div>
                  </template>
                  <template
                    v-if="!['refrigerator', 'washing-machine', 'ac', 'dryer', 'microwave', 'airfryer'].includes(deviceType) && deviceType !== ''">
                    <p class="text-sm text-text-muted">No hay síntomas predefinidos para este electrodoméstico. Por
                      favor, proceda al siguiente paso.</p>
                  </template>
                </div>
              </div>
            </div>

            <div v-if="step === 3" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text mb-2">¿Cuándo comenzó el problema?</label>
                <div class="space-y-2">
                  <div v-for="timeOption in problemTimelineOptions" :key="timeOption.value" class="flex items-center">
                    <input :id="timeOption.value" v-model="additionalInfo" :value="timeOption.value" type="radio"
                      name="additional-info"
                      class="h-4 w-4 text-primary border-secondary-700 dark:border-[var(--secondary-300)] focus:ring-primary dark:bg-background-alt accent-primary">
                    <label :for="timeOption.value" class="ml-2 text-sm text-text">{{ timeOption.label }}</label>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="step === 4 && result" class="space-y-6">
              <div :class="getSeverityAlertClasses(result.severity)" class="p-4 rounded-md border">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <ExclamationCircleIcon class="h-6 w-6" :class="getSeverityIconClasses(result.severity)"
                      aria-hidden="true" />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium" :class="getSeverityTextClasses(result.severity)">Diagnóstico
                      Preliminar</p>
                    <div class="mt-1 text-sm" :class="getSeverityTextClasses(result.severity)">
                      <p>{{ result.title }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <p class="font-medium text-lg text-text">Descripción del Problema</p>
                  <p class="text-text-muted mt-1">{{ result.description }}</p>
                </div>
                <div>
                  <p class="font-medium text-lg text-text">Recomendación</p>
                  <p class="text-text-muted mt-1">{{ result.recommendation }}</p>
                </div>
                <div
                  class="p-4 rounded-lg border bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-accent-700 text-accent-700 dark:text-accent-500">
                  <div class="flex items-start gap-3 flex-shrink-0">
                    <div class="flex-shrink-0">
                      <CheckCircleIcon class="h-6 w-6" />
                    </div>
                    <div>
                      <p class="font-medium">Siguiente Paso</p>
                      <p class="mt-1 text-sm">
                        Contáctenos por WhatsApp para agendar una visita técnica. Mencione este diagnóstico para una
                        atención más
                        rápida.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex justify-between items-center p-6 border-t border-secondary-700 dark:border-secondary-300 bg-background-alt rounded-b-lg">
            <div v-if="step > 1 && step < 4">
              <button type="button" @click="handleBack"
                class="px-4 py-2 text-sm font-medium text-text bg-transparent border border-secondary-700 dark:border-secondary-300 rounded-md hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
                Atrás
              </button>
            </div>
            <div v-else></div>
            <div v-if="step < 4">
              <button type="button" @click="handleNext" :disabled="isNextDisabled"
                class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-all">
                {{ step === 1 ? 'Comenzar diagnóstico' : (step === 2 ? 'Siguiente' : 'Ver Diagnóstico') }}
                <ArrowRightIcon class="h-4 w-4" />
              </button>
            </div>
            <div v-else class="flex flex-wrap gap-3 justify-end">
              <button type="button" @click="resetDiagnostic"
                class="px-4 py-2 text-sm font-medium text-text bg-transparent border border-secondary-700 dark:border-secondary-300 rounded-md hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
                Nuevo Diagnóstico
              </button>
              <button type="button" @click="contactViaWhatsApp"
                class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
                <span>Contactar por WhatsApp</span>
                <svg class="w-4 h-4" fill="#ffffff" viewBox="-1.66 0 740.824 740.824"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M630.056 107.658C560.727 38.271 468.525.039 370.294 0 167.891 0 3.16 164.668 3.079 367.072c-.027 64.699 16.883 127.855 49.016 183.523L0 740.824l194.666-51.047c53.634 29.244 114.022 44.656 175.481 44.682h.151c202.382 0 367.128-164.689 367.21-367.094.039-98.088-38.121-190.32-107.452-259.707m-259.758 564.8h-.125c-54.766-.021-108.483-14.729-155.343-42.529l-11.146-6.613-115.516 30.293 30.834-112.592-7.258-11.543c-30.552-48.58-46.689-104.729-46.665-162.379C65.146 198.865 202.065 62 370.419 62c81.521.031 158.154 31.81 215.779 89.482s89.342 134.332 89.311 215.859c-.07 168.242-136.987 305.117-305.211 305.117m167.415-228.514c-9.176-4.591-54.286-26.782-62.697-29.843-8.41-3.061-14.526-4.591-20.644 4.592-6.116 9.182-23.7 29.843-29.054 35.964-5.351 6.122-10.703 6.888-19.879 2.296-9.175-4.591-38.739-14.276-73.786-45.526-27.275-24.32-45.691-54.36-51.043-63.542-5.352-9.183-.569-14.148 4.024-18.72 4.127-4.11 9.175-10.713 13.763-16.07 4.587-5.356 6.116-9.182 9.174-15.303 3.059-6.122 1.53-11.479-.764-16.07-2.294-4.591-20.643-49.739-28.29-68.104-7.447-17.886-15.012-15.466-20.644-15.746-5.346-.266-11.469-.323-17.585-.323-6.117 0-16.057 2.296-24.468 11.478-8.41 9.183-32.112 31.374-32.112 76.521s32.877 88.763 37.465 94.885c4.587 6.122 64.699 98.771 156.741 138.502 21.891 9.45 38.982 15.093 52.307 19.323 21.981 6.979 41.983 5.994 57.793 3.633 17.628-2.633 54.285-22.19 61.932-43.616 7.646-21.426 7.646-39.791 5.352-43.617-2.293-3.826-8.41-6.122-17.585-10.714" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ArrowRightIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'; // Asegúrate de importar ChevronDownIcon y CheckIcon

// Dark mode detection
const isDark = ref(false);
onMounted(() => {
  const updateDarkModeStatus = () => {
    isDark.value = document.documentElement.classList.contains('dark');
  };
  updateDarkModeStatus();
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

const step = ref(1);
const deviceType = ref(''); // Este v-model será usado por el custom select
const symptom = ref('');
const additionalInfo = ref('');
const result = ref(null);

// Opciones para el selector de electrodomésticos personalizado
const deviceOptions = [
  { value: "refrigerator", label: "Refrigerador / Nevera" },
  { value: "washing-machine", label: "Lavadora" },
  { value: "ac", label: "Aire Acondicionado" },
  { value: "dryer", label: "Secadora" },
  { value: "microwave", label: "Microondas" },
  { value: "airfryer", label: "AirFryer" },
];

const isDeviceSelectOpen = ref(false);

const selectedDeviceLabel = computed(() => {
  const selected = deviceOptions.find(opt => opt.value === deviceType.value);
  return selected ? selected.label : "Seleccione un electrodoméstico";
});

const toggleDeviceSelect = () => {
  isDeviceSelectOpen.value = !isDeviceSelectOpen.value;
};

const closeDeviceSelect = () => {
  isDeviceSelectOpen.value = false;
}

const selectDevice = (value) => {
  if (deviceType.value !== value) {
    deviceType.value = value;
    symptom.value = ''; // Resetear síntoma al cambiar tipo de dispositivo
    additionalInfo.value = ''; // Resetear info adicional
  }
  closeDeviceSelect();
};

// Directiva simple para click outside. Para casos complejos, considera @vueuse/core.
const vClickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = event => {
      // aquí verificamos que el clic no sea en el propio elemento o en sus hijos
      if (!(el === event.target || el.contains(event.target))) {
        // y entonces llamamos al método proporcionado por la directiva
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted: el => {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};


// Symptom options
const refrigeratorSymptoms = [
  { value: "not-cooling", label: "No enfría correctamente" },
  { value: "making-noise", label: "Hace ruidos extraños" },
  { value: "water-leaking", label: "Tiene fugas de agua" },
  { value: "not-turning-on", label: "No enciende" },
];

const washingMachineSymptoms = [
  { value: "not-spinning", label: "No centrifuga" },
  { value: "leaking", label: "Tiene fugas de agua" },
  { value: "making-noise", label: "Hace ruidos extraños" },
  { value: "not-turning-on", label: "No enciende" },
];

const acSymptoms = [
  { value: "not-cooling", label: "No enfría correctamente" },
  { value: "making-noise", label: "Hace ruidos extraños" },
  { value: "leaking", label: "Gotea agua" },
  { value: "not-turning-on", label: "No enciende" },
];

const dryerSymptoms = [
  { value: "not-heating", label: "No calienta" },
  { value: "not-spinning", label: "No gira el tambor" },
  { value: "making-noise", label: "Hace ruidos extraños" },
  { value: "not-turning-on", label: "No enciende" },
];

const microwaveSymptoms = [
  { value: "not-heating", label: "No calienta" },
  { value: "turntable-not-spinning", label: "El plato no gira" },
  { value: "sparks-inside", label: "Produce chispas adentro" },
  { value: "not-turning-on", label: "No enciende" },
];

const airfryerSymptoms = [
  { value: "not-heating", label: "No calienta o cocina mal" },
  { value: "not-turning-on", label: "No enciende" },
  { value: "smoking", label: "Emite humo excesivo" },
  { value: "controls-not-working", label: "Botones o panel no responden" },
];


const problemTimelineOptions = [
  { value: "today", label: "Hoy" },
  { value: "few-days", label: "Hace unos días" },
  { value: "week", label: "Hace una semana" },
  { value: "month", label: "Hace un mes o más" },
];


const isNextDisabled = computed(() => {
  // Si el electrodoméstico seleccionado no tiene síntomas predefinidos (paso 2), no deshabilitar "Siguiente".
  if (step.value === 2 && deviceType.value && !symptom.value) {
    const currentDeviceSymptoms = getSymptomsForDevice(deviceType.value);
    if (currentDeviceSymptoms.length === 0) {
      return false; // Permite avanzar si no hay síntomas para el dispositivo
    }
  }
  return (step.value === 1 && !deviceType.value) ||
    (step.value === 2 && !symptom.value && getSymptomsForDevice(deviceType.value).length > 0) || // Solo deshabilita si hay síntomas y no se ha seleccionado uno
    (step.value === 3 && !additionalInfo.value);
});

const getSymptomsForDevice = (type) => {
  switch (type) {
    case 'refrigerator': return refrigeratorSymptoms;
    case 'washing-machine': return washingMachineSymptoms;
    case 'ac': return acSymptoms;
    case 'dryer': return dryerSymptoms;
    case 'microwave': return microwaveSymptoms;
    case 'airfryer': return airfryerSymptoms;
    // Añade otros casos si tienes síntomas específicos
    default: return []; // Devuelve array vacío si no hay síntomas específicos
  }
}

const handleNext = () => {
  if (step.value === 3) {
    generateDiagnostic();
  } else if (step.value === 1 && deviceType.value) {
    // Si pasamos del paso 1 y ya tenemos un deviceType, reseteamos symptom y additionalInfo
    symptom.value = '';
    additionalInfo.value = '';
    step.value++;
  } else if (step.value === 2) {
    // Si estamos en el paso 2 (síntomas) y avanzamos
    additionalInfo.value = ''; // Reseteamos la info adicional para el paso 3
    step.value++;
  }
  else {
    step.value++;
  }
};

const handleBack = () => {
  step.value--;
};

const generateDiagnostic = () => {
  // Logic remains the same, ensure all deviceType have some diagnostic path
  // Example for a device without specific symptom logic but needs a diagnostic:
  if (!['refrigerator', 'washing-machine', 'ac', 'dryer', 'microwave', 'airfryer'].includes(deviceType.value)) {
    result.value = {
      title: `Diagnóstico general para ${deviceOptions.find(d => d.value === deviceType.value)?.label || 'electrodoméstico'}`,
      description: `Se ha registrado un problema con su ${deviceOptions.find(d => d.value === deviceType.value)?.label || 'electrodoméstico'}. Detalles adicionales: ${additionalInfo.value}.`, // Asumiendo que additionalInfo existe y tiene un .value
      severity: "medium", // O ajusta según sea necesario
      recommendation: "Recomendamos una revisión técnica para identificar la causa exacta y ofrecer una solución.",
    };
  }
  // Tu lógica de diagnóstico existente para refrigerator, washing-machine, ac...
  else if (deviceType.value === "refrigerator") {
    if (symptom.value === "not-cooling") {
      result.value = {
        title: "Posible problema con el compresor o refrigerante",
        description: "Su refrigerador no está enfriando correctamente, lo que podría indicar un problema con el compresor, una fuga de refrigerante o un problema con el termostato.",
        severity: "high",
        recommendation: "Recomendamos una revisión técnica urgente para evitar la pérdida de alimentos y daños mayores al equipo.",
      };
    } else if (symptom.value === "making-noise") {
      result.value = {
        title: "Vibración o componente suelto",
        description: "Los ruidos inusuales suelen ser causados por vibraciones, componentes sueltos o problemas con el ventilador del compresor.",
        severity: "medium",
        recommendation: "Un técnico puede identificar y asegurar los componentes afectados para resolver el problema.",
      };
    } else if (symptom.value === "water-leaking") {
      result.value = {
        title: "Drenaje obstruido o bandeja de goteo en mal estado",
        description: "Esto generalmente indica que el agua de descongelación no está drenando correctamente o la bandeja que la recoge presenta algún defecto.",
        severity: "medium",
        recommendation: "Un técnico podrá identificar la causa exacta de la fuga y realizar la reparación correspondiente en el sistema de drenaje o la bandeja.",
      };
    } else if (symptom.value === "not-turning-on") {
      result.value = {
        title: "El refrigerador/nevera no enciende",
        description: "Si su equipo no enciende, podría indicar un problema con el suministro eléctrico, el termostato, el relé de arranque o la tarjeta de control principal.",
        severity: "high",
        recommendation: "Es necesaria una revisión técnica para diagnosticar la falla, ya sea eléctrica o de algún componente, y restaurar el funcionamiento.",
      };
    }
    else { // Fallback para otros síntomas de refrigerador
      result.value = {
        title: "Diagnóstico general para Refrigerador",
        description: `Su refrigerador presenta el síntoma: '${refrigeratorSymptoms.find(s => s.value === symptom.value)?.label || symptom.value}'. Información adicional: ${problemTimelineOptions.find(p => p.value === additionalInfo.value)?.label || additionalInfo.value}.`,
        severity: "medium",
        recommendation: "Recomendamos una revisión técnica para identificar la causa exacta."
      }
    }
  } else if (deviceType.value === "washing-machine") {
    if (symptom.value === "not-spinning") {
      result.value = {
        title: "Problema con el motor o la correa",
        description: "Su lavadora no está centrifugando, lo que podría indicar un problema con el motor, la correa de transmisión o el módulo de control.",
        severity: "medium",
        recommendation: "Se recomienda una revisión técnica para determinar el componente exacto que está fallando.",
      };
    } else if (symptom.value === "leaking") {
      result.value = {
        title: "Fuga de agua - Posible problema de sellos",
        description: "Las fugas de agua suelen ser causadas por sellos desgastados, mangueras dañadas o problemas con la bomba de drenaje.",
        severity: "high",
        recommendation: "Recomendamos una revisión técnica urgente para evitar daños por agua en su hogar.",
      };
    } else if (symptom.value === "making-noise") {
      result.value = {
        title: "Ruidos inusuales durante el ciclo",
        description: "Los ruidos fuertes o extraños pueden indicar objetos atrapados, componentes sueltos, rodamientos desgastados o problemas con el sistema de suspensión.",
        severity: "medium",
        recommendation: "Una inspección técnica puede identificar la fuente del ruido y prevenir daños mayores.",
      };
    } else if (symptom.value === "not-turning-on") {
      result.value = {
        title: "La lavadora no enciende",
        description: "Esto podría deberse a un problema con el suministro eléctrico (enchufe, cable, interruptor), un fallo en el seguro de la puerta, el panel de control o la placa electrónica.",
        severity: "high",
        recommendation: "Se requiere una revisión técnica para diagnosticar la causa, ya sea eléctrica o de un componente interno, y solucionar el problema.",
      };
    }
    else { // Fallback para otros síntomas de lavadora
      result.value = {
        title: "Diagnóstico general para Lavadora",
        description: `Su lavadora presenta el síntoma: '${washingMachineSymptoms.find(s => s.value === symptom.value)?.label || symptom.value}'. Información adicional: ${problemTimelineOptions.find(p => p.value === additionalInfo.value)?.label || additionalInfo.value}.`,
        severity: "medium",
        recommendation: "Considere una revisión técnica para un diagnóstico preciso."
      }
    }
  } else if (deviceType.value === "ac") {
    if (symptom.value === "not-cooling") {
      result.value = {
        title: "Bajo nivel de refrigerante o filtros sucios",
        description: "Su aire acondicionado no está enfriando correctamente, lo que podría indicar un bajo nivel de refrigerante, filtros sucios o un problema con el compresor.",
        severity: "medium",
        recommendation: "Un técnico puede realizar una recarga de refrigerante y limpieza del sistema para mejorar el rendimiento.",
      };
    } else if (symptom.value === "making-noise") {
      result.value = {
        title: "Componente suelto o dañado",
        description: "Los ruidos inusuales en un aire acondicionado suelen ser causados por componentes sueltos, un ventilador desbalanceado o problemas con el compresor.",
        severity: "medium",
        recommendation: "Se recomienda una revisión técnica para identificar y reparar el componente afectado.",
      };
    } else if (symptom.value === "leaking") {
      result.value = {
        title: "Drenaje obstruido o fuga de refrigerante",
        description: "Las fugas pueden ser de agua, indicando un drenaje de condensado obstruido o una instalación incorrecta.", // Ajustado para ser más general que solo agua
        severity: "medium",
        recommendation: "Es importante que un técnico revise la unidad para determinar el origen de la fuga y solucionarla.",
      };
    } else if (symptom.value === "not-turning-on") {
      result.value = {
        title: "Falla eléctrica o problema con el termostato",
        description: "Si el aire acondicionado no enciende, podría ser un problema con el suministro eléctrico, el disyuntor (breaker), el termostato, capacitor o una falla en la tarjeta de control.",
        severity: "high",
        recommendation: "Se requiere una revisión técnica para un diagnóstico preciso y la reparación segura de los componentes eléctricos o electrónicos.",
      };
    } else { // Fallback para otros síntomas de AC
      result.value = {
        title: "Diagnóstico general para Aire Acondicionado",
        description: `Su aire acondicionado presenta el síntoma: '${acSymptoms.find(s => s.value === symptom.value)?.label || symptom.value}'. Información adicional: ${problemTimelineOptions.find(p => p.value === additionalInfo.value)?.label || additionalInfo.value}.`,
        severity: "medium",
        recommendation: "Le sugerimos contactar a un técnico especializado."
      }
    }
  }
  // --- Nuevos Diagnósticos ---
  else if (deviceType.value === "dryer") { // Secadora
    if (symptom.value === "not-heating") {
      result.value = {
        title: "Problema de calentamiento en secadora",
        description: "Si su secadora no calienta, podría deberse a una resistencia defectuosa, un termostato dañado o un fusible térmico quemado.",
        severity: "high",
        recommendation: "Se recomienda una revisión técnica para diagnosticar y reemplazar el componente defectuoso y asegurar un funcionamiento seguro."
      };
    } else if (symptom.value === "not-spinning") {
      result.value = {
        title: "Tambor de secadora no gira",
        description: "Esto puede ser causado por una correa de transmisión rota o deslizada, un motor defectuoso, un problema con el interruptor de la puerta o rodillos/poleas dañados.",
        severity: "high",
        recommendation: "Un técnico deberá inspeccionar estos componentes para identificar la falla y realizar la reparación necesaria."
      };
    } else if (symptom.value === "making-noise") {
      result.value = {
        title: "Ruidos inusuales en la secadora",
        description: "Los ruidos extraños suelen originarse por objetos sueltos en el tambor, rodamientos desgastados, poleas dañadas o un motor con problemas.",
        severity: "medium",
        recommendation: "Se aconseja una revisión para localizar la fuente del ruido y evitar daños mayores a los componentes internos."
      };
    } else if (symptom.value === "not-turning-on") {
      result.value = {
        title: "La secadora no enciende",
        description: "La falla de encendido puede deberse a problemas con el suministro eléctrico, un fusible térmico quemado, el interruptor de la puerta defectuoso o una falla en la tarjeta de control.",
        severity: "high",
        recommendation: "Es crucial una revisión técnica para un diagnóstico seguro y la reparación del componente eléctrico o electrónico afectado."
      };
    } else { // Fallback para otros síntomas de secadora
      result.value = {
        title: "Diagnóstico general para Secadora",
        description: `Su secadora presenta el síntoma: '${dryerSymptoms.find(s => s.value === symptom.value)?.label || symptom.value}'. Información adicional: ${problemTimelineOptions.find(p => p.value === additionalInfo.value)?.label || additionalInfo.value}.`,
        severity: "medium",
        recommendation: "Recomendamos una revisión técnica para identificar la causa exacta."
      }
    }
  } else if (deviceType.value === "microwave") { // Microondas
    if (symptom.value === "not-heating") {
      result.value = {
        title: "Microondas no calienta los alimentos",
        description: "La causa más común es un magnetrón defectuoso. También podría ser un problema con el diodo de alto voltaje, el condensador o el transformador.",
        severity: "high",
        recommendation: "Debido a los componentes de alto voltaje, es indispensable una revisión por un técnico calificado para una reparación segura."
      };
    } else if (symptom.value === "turntable-not-spinning") {
      result.value = {
        title: "Plato giratorio del microondas no funciona",
        description: "Esto puede ser por un motor del plato giratorio defectuoso, un acoplador dañado o un problema con la guía de rodillos debajo del plato.",
        severity: "low",
        recommendation: "Un técnico puede revisar y reemplazar el motor o las partes dañadas del mecanismo giratorio."
      };
    } else if (symptom.value === "sparks-inside") {
      result.value = {
        title: "Chispas o arqueo dentro del microondas",
        description: "Las chispas suelen ser causadas por restos de comida, pintura dañada en el interior, uso de metales o una guía de ondas sucia o dañada.",
        severity: "high",
        recommendation: "Deje de usar el microondas inmediatamente. Se requiere una inspección técnica para limpiar, reparar o reemplazar la parte afectada y asegurar su uso seguro."
      };
    } else if (symptom.value === "not-turning-on") {
      result.value = {
        title: "El microondas no enciende",
        description: "Podría ser un fusible interno quemado, un problema con el interruptor de la puerta, el cable de alimentación o una falla en la placa de control.",
        severity: "high",
        recommendation: "Se necesita una revisión técnica para diagnosticar la falla eléctrica o de componentes y realizar una reparación segura."
      };
    } else { // Fallback para otros síntomas de microondas
      result.value = {
        title: "Diagnóstico general para Microondas",
        description: `Su microondas presenta el síntoma: '${microwaveSymptoms.find(s => s.value === symptom.value)?.label || symptom.value}'. Información adicional: ${problemTimelineOptions.find(p => p.value === additionalInfo.value)?.label || additionalInfo.value}.`,
        severity: "medium",
        recommendation: "Recomendamos una revisión técnica para identificar la causa exacta."
      }
    }
  } else if (deviceType.value === "airfryer") { // Freidora de Aire
    if (symptom.value === "not-heating") {
      result.value = {
        title: "Airfryer no calienta o cocina irregularmente",
        description: "Esto puede deberse a una resistencia defectuosa, un termostato que no funciona correctamente o problemas con el ventilador de convección.",
        severity: "high",
        recommendation: "Una revisión técnica es necesaria para identificar el componente defectuoso y restaurar la capacidad de cocción."
      };
    } else if (symptom.value === "not-turning-on") {
      result.value = {
        title: "La freidora de aire no enciende",
        description: "Puede ser un problema con el suministro eléctrico, un fusible interno, el interruptor de encendido o una falla en la placa de control o el ensamblaje del cajón (si tiene sensor).",
        severity: "high",
        recommendation: "Se recomienda una inspección técnica para un diagnóstico seguro y la reparación de la falla eléctrica o de componentes."
      };
    } else if (symptom.value === "smoking") {
      result.value = {
        title: "Freidora de aire emite humo excesivo",
        description: "El humo suele ser por acumulación de grasa o restos de comida en la resistencia o en la cesta. En raras ocasiones, puede ser un problema eléctrico.",
        severity: "medium",
        recommendation: "Limpie a fondo la freidora según las instrucciones del fabricante. Si el humo persiste o huele a quemado eléctrico, solicite una revisión técnica."
      };
    } else if (symptom.value === "controls-not-working") {
      result.value = {
        title: "Controles de la freidora de aire no funcionan",
        description: "Esto puede indicar un problema con el panel de control táctil o los botones físicos, una conexión suelta o una falla en la placa electrónica principal.",
        severity: "medium",
        recommendation: "Un técnico especializado puede diagnosticar si el problema es del panel o de la electrónica interna y realizar la reparación."
      };
    } else { // Fallback para otros síntomas de airfryer
      result.value = {
        title: "Diagnóstico general para Freidora de Aire",
        description: `Su freidora de aire presenta el síntoma: '${airfryerSymptoms.find(s => s.value === symptom.value)?.label || symptom.value}'. Información adicional: ${problemTimelineOptions.find(p => p.value === additionalInfo.value)?.label || additionalInfo.value}.`,
        severity: "medium",
        recommendation: "Recomendamos una revisión técnica para identificar la causa exacta."
      }
    }
  }

  // Fallback si no hay lógica específica pero se completaron los pasos
  else if (!result.value && deviceType.value && additionalInfo.value && symptom.value) { // Asegurarse que symptom.value también exista
    const symptomsArray = getSymptomsForDevice(deviceType.value); // Necesitarás una función getSymptomsForDevice o manejarlo de otra forma
    const deviceLabel = deviceOptions.find(d => d.value === deviceType.value)?.label || 'electrodoméstico';
    const symptomLabel = symptomsArray.find(s => s.value === symptom.value)?.label || symptom.value || 'No especificado';
    const additionalInfoLabel = problemTimelineOptions.find(p => p.value === additionalInfo.value)?.label || additionalInfo.value;

    result.value = {
      title: `Diagnóstico general para ${deviceLabel}`,
      description: `Se ha registrado un problema con su ${deviceLabel}. El síntoma principal es '${symptomLabel}' y comenzó '${additionalInfoLabel}'.`,
      severity: "medium",
      recommendation: "Recomendamos una revisión técnica para identificar la causa exacta y ofrecer una solución.",
    };
  }
  // Fallback final
  if (!result.value) {
    result.value = {
      title: "Información Limitada",
      description: `Para el electrodoméstico '${deviceOptions.find(d => d.value === deviceType.value)?.label || deviceType.value || 'Desconocido'}' con síntoma '${symptom.value || 'No especificado'}', la información es limitada.`,
      severity: "low",
      recommendation: "Sugerimos contactar a un técnico para una evaluación detallada.",
    };
  }

  step.value = 4;
};

const resetDiagnostic = () => {
  step.value = 1;
  deviceType.value = '';
  symptom.value = '';
  additionalInfo.value = '';
  result.value = null;
  isDeviceSelectOpen.value = false;
};

const contactViaWhatsApp = () => {
  const deviceInfo = deviceOptions.find(d => d.value === deviceType.value)?.label || 'electrodoméstico no especificado';
  const symptomInfo = symptom.value ? (getSymptomsForDevice(deviceType.value).find(s => s.value === symptom.value)?.label || symptom.value) : 'No especificado';

  const message = result.value
    ? `Hola, he usado el diagnóstico interactivo y este es el resultado para mi ${deviceInfo}:\n- Problema: ${result.value.title}\n- Síntoma: ${symptomInfo}\n- Descripción: ${result.value.description}\n- Recomendación: ${result.value.recommendation}\nQuisiera agendar una visita técnica.`
    : `Hola, quisiera solicitar asistencia técnica para mi ${deviceInfo}. El principal síntoma es ${symptomInfo}.`;
  const whatsappUrl = `https://wa.me/+584146591611?text=${encodeURIComponent(message)}`; // Reemplaza YOURPHONENUMBER
  window.open(whatsappUrl, '_blank');
};

const getSeverityAlertClasses = (severity) => {
  switch (severity) {
    case "low":
      return isDark.value ? "bg-green-900/50 border-green-700 text-green-300" : "bg-green-50 border-green-300 text-green-800";
    case "medium":
      return isDark.value ? "bg-amber-900/50 border-amber-700 text-amber-300" : "bg-amber-50 border-amber-300 text-amber-800";
    case "high":
      return isDark.value ? "bg-red-900/50 border-red-600 text-red-300" : "bg-red-100 border-red-300 text-red-800";
    default:
      return isDark.value ? "bg-secondary-700/50 border-secondary-500 text-text-muted" : "bg-slate-100 border-slate-300 text-slate-700";
  }
};

const getSeverityTextClasses = (severity) => {
  switch (severity) {
    case "low":
      return isDark.value ? "text-green-300" : "text-green-800";
    case "medium":
      return isDark.value ? "text-amber-300" : "text-amber-800";
    case "high":
      return isDark.value ? "text-red-300" : "text-red-800";
    default:
      return isDark.value ? "text-slate-300" : "text-slate-700";
  }
};

const getSeverityIconClasses = (severity) => {
  switch (severity) {
    case "low":
      return isDark.value ? "text-green-400" : "text-green-500";
    case "medium":
      return isDark.value ? "text-amber-400" : "text-amber-500"; // Ajustado para mejor contraste
    case "high":
      return isDark.value ? "text-red-400" : "text-red-500";
    default:
      return isDark.value ? "text-slate-400" : "text-slate-500";
  }
};

</script>

<style scoped>
/* El icono de WhatsApp */
.svg-inline--fa.fa-whatsapp {
  color: white;
}
</style>