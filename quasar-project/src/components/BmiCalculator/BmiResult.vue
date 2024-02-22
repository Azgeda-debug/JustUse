<template>
  <div>
    <div class="flex justify-center q-my-xl">
      <q-knob
        v-model="bmiStore.calculatedBmi"
        show-value
        size="200px"
        :thickness="0.25"
        :color="knobBmiColor"
        track-color="grey-3"
        class="no-pointer-events"
      />
    </div>
    <div class="text-center">
      <span class="text-h6"> Your BMI: {{ bmiStore.calculatedBmi }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useBmiStore } from "stores/bmiStore";

const knobBmiColor = computed(() => {
  const bmi = bmiStore.calculatedBmi;

  if (bmi < 18.5) {
    return "primary";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "green";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "orange";
  } else if (bmi >= 30 && bmi < 34.9) {
    return "red-4";
  } else if (bmi >= 35 && bmi < 39.9) {
    return "red-8";
  } else {
    return "red-10";
  }
});

const bmiStore = useBmiStore();
</script>