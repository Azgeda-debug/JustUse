<template>
  <div class="q-gutter-md q-mt-md flex justify-center">
    <q-btn
      @click.prevent="addToHistory"
      no-caps
      label="Add to Account History"
      type="submit"
      color="primary"
    />

    <q-btn
      @click.prevent="checkHistory"
      no-caps
      label="Check History"
      type="submit"
      color="primary"
    />
  </div>
</template>

<script setup>
import { useBmiStore } from "stores/bmiStore";

const bmiStore = useBmiStore();

const addToHistory = () => {
  if (bmiStore.calculatedBmi) {
    bmiStore.firebaseAddToHistory(bmiStore.calculatedBmi);
  }
};

const checkHistory = () => {
  bmiStore.showBmiHistory = true;
  bmiStore.firebaseCheckHistory();
};
</script>