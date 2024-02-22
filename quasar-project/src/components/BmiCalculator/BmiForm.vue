<template>
  <q-form class="q-gutter-md">
    <q-input
      outlined
      rounded
      dense
      v-model="bmiForm.height"
      min="1"
      type="number"
      placeholder="Your height *"
      suffix="cm"
    />

    <q-input
      outlined
      rounded
      dense
      v-model="bmiForm.weight"
      min="1"
      type="number"
      placeholder="Your weight *"
      suffix="kg"
    />

    <div class="flex justify-end">
      <q-btn
        @click.prevent="CalculateBmi"
        no-caps
        label="Calculate"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import { useBmiStore } from "stores/bmiStore";

const bmiStore = useBmiStore();

const bmiForm = ref({
  height: "",
  weight: "",
});

const CalculateBmi = () => {
  if (bmiForm.value.height && bmiForm.value.weight) {
    bmiStore.calculatedBmi = (
      bmiForm.value.weight / Math.pow(bmiForm.value.height / 100, 2)
    ).toFixed(2);
  }
};
</script>