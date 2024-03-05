<template>
  <q-dialog v-model="bmiStore.showBmiHistory">
    <q-card>
      <q-card-section v-if="!Object.keys(bmiStore.chartHistory).length">
        <div class="text-h6">Your BMI history is empty.</div>
      </q-card-section>

      <q-card-section
        v-if="Object.keys(bmiStore.chartHistory).length"
        class="q-pt-none"
      >
        <div class="text-center">
          <span class="text-h6">
            Add your BMI only once a day. If you add more than once, only the
            first one will be displayed.</span
          >
        </div>
        <line-chart :data="bmiStore.chartHistory"></line-chart>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useBmiStore } from "stores/bmiStore";

const bmiStore = useBmiStore();
</script>