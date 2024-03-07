<template>
  <q-page class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-select
        outlined
        rounded
        dense
        :options="currencyCalculatorStore.options"
        v-model="currencyCalculatorStore.formData.baseCurrency"
        label="Select Currency"
      />
      <q-select
        outlined
        rounded
        dense
        :options="currencyCalculatorStore.options"
        v-model="currencyCalculatorStore.formData.targetCurrency"
        label="Select Currency"
      />

      <q-input
        outlined
        rounded
        dense
        v-model="currencyCalculatorStore.formData.amount"
        placeholder="Amount"
        type="number"
        min="0.1"
        step="0.1"
      />
      <div class="flex justify-between items-center">
        <div v-show="currencyCalculatorStore.conversion">
          <div class="text-h6">
            {{ currencyCalculatorStore.formData.amount }}
            {{ currencyCalculatorStore.formData.baseCurrency[0] }} is
            {{ currencyCalculatorStore.conversion }}
            {{ currencyCalculatorStore.formData.targetCurrency[0] }}
          </div>
          <div class="caption text-grey">
            1 {{ currencyCalculatorStore.formData.baseCurrency[0] }} is
            {{ currencyCalculatorStore.conversionRate }}
            {{ currencyCalculatorStore.formData.targetCurrency[0] }}
          </div>
        </div>

        <q-btn
          @click.prevent="handleForm"
          no-caps
          label="Calculate"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useCurrencyCalculatorStore } from "stores/CurrencyCalculator";

const currencyCalculatorStore = useCurrencyCalculatorStore();

const handleForm = () => {
  currencyCalculatorStore.getExchange();
};

onMounted(() => {
  currencyCalculatorStore.getSupportedCodes();
});
</script>
